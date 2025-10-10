// src/lib/reading.ts

export type ReadingItem = {
  slug: string;
  title: string;
  author: string;
  type: "book" | "paper" | "article";
  status: "reading" | "finished" | "queue";
  progress?: number; // 0–100
  rating?: number; // 0–5 (when finished)
  dateStarted?: string; // ISO string recommended
  dateFinished?: string; // ISO string recommended
  tags?: string[];
  cover?: string;
  link?: string;
  notes?: string;
};

export type ReadingSort = "recent" | "alpha" | "progress" | "rating";

export const readingItems: ReadingItem[] = [
  {
    slug: "ai-engineering-chip-huyen",
    title: "AI Engineering: Building Applications with Foundation Models",
    author: "Chip Huyen",
    type: "book",
    status: "reading",
    progress: 20,
    tags: ["ai", "engineering", "foundation models"],
    cover:
      "https://s3proxy.cdn-zlib.sk/covers300/collections/userbooks/05f8dcfca1bdd2952022630adc3a7dd8d5c228d030a60761642bb1708585e8d6.jpg",
  },
  {
    slug: "building-ai-agents-rag-kg",
    title: "Building AI Agents with LLMs, RAG, and Knowledge Graphs",
    author: "Salvatore Raieli, Gabriele Iuculano",
    type: "book",
    status: "reading",
    progress: 45,
    tags: ["ai", "agents", "rag", "knowledge-graphs"],
    cover:
      "https://s3proxy.cdn-zlib.sk/covers300/collections/userbooks/b720da43a90b906c18288e51afdfaac52a374e15f61d0cb074ff04768b1162e7.jpg",
  },
  {
    slug: "learning-sql-alan-beaulieu",
    title: "Learning SQL",
    author: "Alan Beaulieu",
    type: "book",
    status: "reading",
    progress: 10,
    tags: ["sql", "databases"],
    cover:
      "https://s3proxy.cdn-zlib.sk/covers300/collections/genesis/bade985342ac923620e33123525bb2175c490e911719b8e3fbe71a5e539df604.jpg",
  },
  {
    slug: "linux-command-line-shotts",
    title: "The Linux Command Line: A Complete Introduction",
    author: "William E. Shotts",
    type: "book",
    status: "reading",
    progress: 5,
    tags: ["linux", "cli"],
    cover:
      "https://s3proxy.cdn-zlib.sk/covers300/collections/genesis/188d71a461d0615b361789c68b72051ae2ecb340703ade0f26a8185483dcbb9d.jpg",
  },
];

/* ----------------------------- helpers (shared) ---------------------------- */

// diacritic-insensitive normalizer
export const normalize = (s?: string) =>
  (s ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

// stable date parser (falls back to epoch)
const toDate = (iso?: string) => (iso ? new Date(iso) : new Date(0));

/** Filter + sort a list (defaults to the full dataset) */
export function listReadingItems(opts?: {
  q?: string;
  types?: ReadingItem["type"][];
  statuses?: ReadingItem["status"][];
  sort?: ReadingSort;
  source?: ReadingItem[]; // allow passing a custom list; defaults to readingItems
}) {
  const {
    q = "",
    types = [],
    statuses = [],
    sort = "recent",
    source = readingItems,
  } = opts ?? {};

  const query = normalize(q);
  const typeSet = new Set(types);
  const statusSet = new Set(statuses);

  const filtered = source.filter((i) => {
    const matchesQuery =
      !query ||
      normalize(i.title).includes(query) ||
      normalize(i.author).includes(query) ||
      (i.tags ?? []).some((t) => normalize(t).includes(query));

    const matchesType = typeSet.size === 0 || typeSet.has(i.type);
    const matchesStatus = statusSet.size === 0 || statusSet.has(i.status);

    return matchesQuery && matchesType && matchesStatus;
  });

  const sorted =
    sort === "alpha"
      ? filtered.slice().sort((a, b) => a.title.localeCompare(b.title))
      : sort === "progress"
      ? filtered.slice().sort((a, b) => (b.progress ?? 0) - (a.progress ?? 0))
      : sort === "rating"
      ? filtered.slice().sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
      : filtered
          .slice()
          .sort(
            (a, b) =>
              +toDate(b.dateFinished ?? b.dateStarted) -
              +toDate(a.dateFinished ?? a.dateStarted)
          );

  return sorted;
}

/** Get a single item by slug */
export function getReadingBySlug(slug: string, source: ReadingItem[] = readingItems) {
  return source.find((i) => i.slug === slug) ?? null;
}

/** Facets: counts per type/status (optionally constrained by a query) */
export function getReadingFacets(opts?: { q?: string; source?: ReadingItem[] }) {
  const { q = "", source = readingItems } = opts ?? {};
  const query = normalize(q);

  const types = new Map<ReadingItem["type"], number>();
  const statuses = new Map<ReadingItem["status"], number>();
  const tags = new Map<string, number>();

  for (const i of source) {
    const matchesQuery =
      !query ||
      normalize(i.title).includes(query) ||
      normalize(i.author).includes(query) ||
      (i.tags ?? []).some((t) => normalize(t).includes(query));
    if (!matchesQuery) continue;

    types.set(i.type, (types.get(i.type) ?? 0) + 1);
    statuses.set(i.status, (statuses.get(i.status) ?? 0) + 1);
    for (const t of i.tags ?? []) {
      tags.set(t, (tags.get(t) ?? 0) + 1);
    }
  }

  return {
    types: Array.from(types.entries()).map(([label, count]) => ({ label, count })),
    statuses: Array.from(statuses.entries()).map(([label, count]) => ({ label, count })),
    tags: Array.from(tags.entries())
      .map(([label, count]) => ({ label, count }))
      .sort((a, b) => a.label.localeCompare(b.label)),
  };
}

/** Convenience subsets */
export const getCurrentlyReading = (source: ReadingItem[] = readingItems) =>
  listReadingItems({ statuses: ["reading"], sort: "progress", source });

export const getFinished = (source: ReadingItem[] = readingItems) =>
  listReadingItems({ statuses: ["finished"], sort: "rating", source });

/** Lightweight search index for client palettes */
export const getReadingSearchIndex = (source: ReadingItem[] = readingItems) =>
  source.map((i) => ({
    slug: i.slug,
    title: i.title,
    author: i.author,
    type: i.type,
    status: i.status,
    tags: i.tags ?? [],
  }));