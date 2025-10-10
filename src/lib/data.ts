/* eslint-disable @typescript-eslint/no-explicit-any */
// src/lib/data.ts
import "server-only";
import { cache } from "react";
import type { CaseStudy } from "@/lib/case-studies";
import { caseStudies } from "@/lib/case-studies";

export type Sort = "recent" | "alpha";

// Derive fields needed by UI (slug, optional fallbacks)
export type ResolvedCaseStudy = CaseStudy & {
  slug: string;
  category?: string;
  tagline?: string;
  icon?: string;
};

// Normalization (diacritic-insensitive)
const norm = (s?: string) =>
  (s ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

const slugify = (s: string) =>
  norm(s)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "case";

const parseYear = (p?: string) => {
  if (!p) return 0;
  const years = p.match(/\b(19|20)\d{2}\b/g);
  if (!years || years.length === 0) return 0;
  // Prefer latest year for ranges like "2021–2023"
  return parseInt(years[years.length - 1]!, 10);
};

function resolveOne(cs: CaseStudy): ResolvedCaseStudy {
  const baseSlug = (cs as any).slug || slugify(cs.title);
  // ensure fallbacks for fields some UIs reference
  const category = (cs as any).category as string | undefined;
  const tagline =
    (cs as any).tagline ||
    (Array.isArray(cs.highlights) && cs.highlights[0]) ||
    undefined;
  const icon = (cs as any).icon as string | undefined;

  return { ...(cs as any), slug: baseSlug, category, tagline, icon };
}

function ensureUniqueSlugs(items: ResolvedCaseStudy[]) {
  const seen = new Map<string, number>();
  return items.map((item) => {
    let s = item.slug;
    const count = seen.get(s) ?? 0;
    if (count > 0) s = `${s}-${count + 1}`;
    seen.set(item.slug, count + 1);
    return { ...item, slug: s };
  });
}

// Base: all studies resolved with unique slugs
export const getAllCaseStudies = cache(async (): Promise<ResolvedCaseStudy[]> => {
  const resolved = caseStudies.map(resolveOne);
  return ensureUniqueSlugs(resolved);
});

// One by slug
export const getCaseStudyBySlug = cache(async (slug: string) => {
  const all = await getAllCaseStudies();
  return all.find((s) => s.slug === slug) ?? null;
});

// Listing with filtering/sorting (matches ProjectsExplorer semantics)
export async function listCaseStudies(opts?: {
  q?: string;
  categories?: string[]; // match exact category strings
  sort?: Sort;
}) {
  const { q = "", categories = [], sort = "recent" } = opts ?? {};
  const query = norm(q);
  const cats = new Set(categories);

  let arr = (await getAllCaseStudies()).filter((s) => {
    const matchesQuery =
      !query ||
      norm(s.title).includes(query) ||
      norm((s as any).tagline).includes(query) ||
      norm(s.summary).includes(query) ||
      (Array.isArray(s.highlights) &&
        s.highlights.some((h) => norm(h).includes(query))) ||
      s.stack.some((t) => norm(t).includes(query));

    const matchesCategory = cats.size === 0 || (s.category && cats.has(s.category));
    return matchesQuery && matchesCategory;
  });

  if (sort === "alpha") {
    arr = arr.slice().sort((a, b) => a.title.localeCompare(b.title));
  } else {
    arr = arr.slice().sort((a, b) => parseYear(b.period) - parseYear(a.period));
  }

  return arr;
}

// Categories with counts (respects optional query filtering but ignores active category filters)
export async function getCategories(opts?: { q?: string }) {
  const query = norm(opts?.q ?? "");
  const all = await getAllCaseStudies();
  const counts = new Map<string, number>();

  for (const s of all) {
    const matchesQuery =
      !query ||
      norm(s.title).includes(query) ||
      norm((s as any).tagline).includes(query) ||
      norm(s.summary).includes(query) ||
      (Array.isArray(s.highlights) && s.highlights.some((h) => norm(h).includes(query))) ||
      s.stack.some((t) => norm(t).includes(query));
    if (!matchesQuery) continue;

    const c = s.category;
    if (!c) continue;
    counts.set(c, (counts.get(c) ?? 0) + 1);
  }

  const categories = Array.from(counts.entries())
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => a.label.localeCompare(b.label));

  return categories;
}

// Lightweight search index for client-side fuzz (optional)
export async function getProjectsSearchIndex() {
  const all = await getAllCaseStudies();
  return all.map((s) => ({
    slug: s.slug,
    title: s.title,
    summary: s.summary,
    tagline: (s as any).tagline as string | undefined,
    category: s.category,
    stack: s.stack,
    highlights: s.highlights,
    period: s.period,
  }));
}

// Next/Prev helpers for detail page footers (alpha or recent)
export async function getSiblings(slug: string, sort: Sort = "recent") {
  const all = await listCaseStudies({ sort });
  const i = all.findIndex((s) => s.slug === slug);
  if (i === -1) return { prev: null, next: null };
  const prev = i > 0 ? all[i - 1] : null;
  const next = i < all.length - 1 ? all[i + 1] : null;
  return { prev, next };
}