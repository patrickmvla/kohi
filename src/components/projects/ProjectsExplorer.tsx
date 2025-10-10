"use client";

import {
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { CaseStudy } from "@/lib/case-studies";
import CaseStudyCard from "./CaseStudyCard";
import ProjectMedia from "./ProjectMedia";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import { LayoutGrid, List as ListIcon, Search, X } from "lucide-react";

type View = "grid" | "list";
type Sort = "recent" | "alpha";

// Robust, diacritic-insensitive normalizer
const norm = (s: string) =>
  (s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

export default function ProjectsExplorer({ studies }: { studies: CaseStudy[] }) {
  // State
  const [q, setQ] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [view, setView] = useState<View>("grid");
  const [sort, setSort] = useState<Sort>("recent");
  const [isMac, setIsMac] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const initRef = useRef(false);

  // Router/URL sync
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // OS hint for shortcut
  useEffect(() => {
    setIsMac(
      /Mac|iPhone|iPad|iPod/.test(navigator.platform) ||
        /Mac OS X/.test(navigator.userAgent)
    );
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();

      // Cmd/Ctrl + K
      if ((e.metaKey || e.ctrlKey) && key === "k") {
        e.preventDefault();
        document
          .getElementById("projects-filter")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
        inputRef.current?.focus();
        return;
      }

      // Slash to focus when not typing
      if (key === "/" && !e.metaKey && !e.ctrlKey && !e.altKey) {
        const el = document.activeElement as HTMLElement | null;
        const tag = el?.tagName?.toLowerCase();
        const isTyping =
          el?.isContentEditable ||
          tag === "input" ||
          tag === "textarea" ||
          tag === "select";
        if (!isTyping) {
          e.preventDefault();
          inputRef.current?.focus();
        }
        return;
      }

      // Escape clears when focused
      if (key === "escape" && document.activeElement === inputRef.current) {
        setQ("");
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Parse initial state from URL
  useEffect(() => {
    if (initRef.current) return;
    initRef.current = true;

    const initialQ = searchParams.get("q") ?? "";
    const initialSort = (searchParams.get("sort") as Sort) || "recent";
    const initialView = (searchParams.get("view") as View) || "grid";
    const initialCats = (searchParams.get("cat") ?? "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    setQ(initialQ);
    setSort(initialSort);
    setView(initialView);
    setCategories(initialCats);
  }, [searchParams]);

  // Sync state -> URL (q deferred)
  const dq = useDeferredValue(q);
  useEffect(() => {
    if (!initRef.current) return;

    const params = new URLSearchParams(searchParams.toString());

    if (dq.trim()) params.set("q", dq.trim());
    else params.delete("q");

    if (categories.length) params.set("cat", categories.join(","));
    else params.delete("cat");

    if (sort !== "recent") params.set("sort", sort);
    else params.delete("sort");

    if (view !== "grid") params.set("view", view);
    else params.delete("view");

    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dq, categories, sort, view]);

  // Categories from studies
  const allCategories = useMemo(
    () =>
      Array.from(
        new Set(studies.map((s) => s.category).filter(Boolean))
      ).sort(),
    [studies]
  );

  // Counts per category (respecting query, ignoring active category filters)
  const categoryCounts = useMemo(() => {
    const counts = Object.fromEntries(
      allCategories.map((c) => [c, 0])
    ) as Record<string, number>;
    const query = norm(dq);

    for (const s of studies) {
      const matchesQuery =
        !query ||
        norm(s.title).includes(query) ||
        norm(s.tagline ?? "").includes(query) ||
        norm(s.summary).includes(query) ||
        (Array.isArray(s.highlights) &&
          s.highlights.some((h) => norm(h).includes(query))) ||
        s.stack.some((t) => norm(t).includes(query));
      if (!matchesQuery) continue;
      if (s.category && counts[s.category] !== undefined)
        counts[s.category] += 1;
    }
    return counts;
  }, [studies, allCategories, dq]);

  // Helpers
  const parseYear = (p?: string) => {
    if (!p) return 0;
    const years = p.match(/\b(19|20)\d{2}\b/g);
    if (!years || years.length === 0) return 0;
    // Prefer the latest year in ranges like "2021–2023"
    return parseInt(years[years.length - 1]!, 10);
  };

  const categoriesSet = useMemo(() => new Set(categories), [categories]);

  // Filtered + sorted
  const filtered = useMemo(() => {
    const query = norm(dq);

    let arr = studies.filter((s) => {
      const matchesQuery =
        !query ||
        norm(s.title).includes(query) ||
        norm(s.tagline ?? "").includes(query) ||
        norm(s.summary).includes(query) ||
        (Array.isArray(s.highlights) &&
          s.highlights.some((h) => norm(h).includes(query))) ||
        s.stack.some((t) => norm(t).includes(query));
      const matchesCategory =
        categoriesSet.size === 0 || categoriesSet.has(s.category);
      return matchesQuery && matchesCategory;
    });

    if (sort === "alpha") {
      arr = arr.slice().sort((a, b) => a.title.localeCompare(b.title));
    } else {
      arr = arr.slice().sort((a, b) => parseYear(b.period) - parseYear(a.period));
    }
    return arr;
  }, [studies, dq, categoriesSet, sort]);

  const clearFilters = () => {
    setQ("");
    setCategories([]);
    setSort("recent");
  };

  const hasActiveFilters =
    q.trim().length > 0 || categories.length > 0 || sort !== "recent";

  return (
    <section aria-labelledby="all-projects" className="section">
      <div className="container">
        {/* Filter/search bar */}
        <div id="projects-filter" className="sticky top-14 z-10">
          <Card className="border-white/10 bg-black/60 backdrop-blur supports-[backdrop-filter]:bg-black/60">
            <CardContent className="p-3">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                {/* Search */}
                <div className="flex w-full items-center gap-2 sm:max-w-md" role="search">
                  <label htmlFor="search" className="sr-only">
                    Search projects
                  </label>

                  <div className="relative w-full group/input">
                    {/* Leading icon */}
                    <Search
                      className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 text-zinc-600 transition-colors group-focus-within/input:text-zinc-400"
                      aria-hidden="true"
                    />

                    <Input
                      id="search"
                      ref={inputRef}
                      value={q}
                      onChange={(e) => setQ(e.target.value)}
                      placeholder="Search by title, stack, or summary…"
                      className="h-9 pl-8 pr-24 border-white/10 bg-transparent placeholder:text-zinc-500 focus-visible:ring-brand-600"
                      aria-controls="projects-results"
                      autoComplete="off"
                      autoCapitalize="none"
                      autoCorrect="off"
                      spellCheck={false}
                    />

                    {/* Trailing actions: clear + shortcut hint */}
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                      {q && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => setQ("")}
                          className="h-6 w-6 text-zinc-600 hover:text-zinc-300 hover:bg-transparent focus-visible:ring-1 focus-visible:ring-brand-600"
                          aria-label="Clear search"
                          title="Clear"
                        >
                          <X className="size-4" aria-hidden="true" />
                        </Button>
                      )}
                      <span className="pointer-events-none text-zinc-500" aria-hidden="true">
                        <KbdGroup className="gap-1 text-[10px]">
                          {isMac ? (
                            <>
                              <Kbd>⌘</Kbd>
                              <Kbd>K</Kbd>
                            </>
                          ) : (
                            <>
                              <Kbd>Ctrl</Kbd>
                              <Kbd>K</Kbd>
                            </>
                          )}
                        </KbdGroup>
                      </span>
                    </div>
                  </div>
                </div>

                {/* View, Sort, Clear */}
                <div className="flex items-center gap-3">
                  {/* View toggle */}
                  <ToggleGroup
                    type="single"
                    value={view}
                    onValueChange={(v) => v && setView(v as View)}
                    aria-label="View"
                    className="hidden sm:flex"
                  >
                    <ToggleGroupItem
                      value="grid"
                      aria-label="Grid view"
                      className="h-8 gap-1 rounded-md border border-white/10 px-2 text-xs data-[state=on]:border-brand-600 data-[state=on]:bg-brand-600/10 data-[state=on]:text-white"
                    >
                      <LayoutGrid className="size-3.5" />
                      Grid
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      value="list"
                      aria-label="List view"
                      className="h-8 gap-1 rounded-md border border-white/10 px-2 text-xs data-[state=on]:border-brand-600 data-[state=on]:bg-brand-600/10 data-[state=on]:text-white"
                    >
                      <ListIcon className="size-3.5" />
                      List
                    </ToggleGroupItem>
                  </ToggleGroup>

                  {/* Sort */}
                  <div className="flex items-center gap-2">
                    <label htmlFor="sort" className="text-xs text-zinc-500">
                      Sort
                    </label>
                    <Select value={sort} onValueChange={(v) => setSort(v as Sort)}>
                      <SelectTrigger id="sort" className="h-8 w-[120px] rounded-md border-white/10 text-xs">
                        <SelectValue placeholder="Sort" />
                      </SelectTrigger>
                      <SelectContent className="text-sm">
                        <SelectItem value="recent">Recent</SelectItem>
                        <SelectItem value="alpha">A–Z</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {hasActiveFilters && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearFilters}
                      className="text-zinc-400 hover:text-white"
                    >
                      Clear
                    </Button>
                  )}
                </div>
              </div>

              {/* Categories */}
              {allCategories.length > 0 && (
                <ScrollArea className="mt-3">
                  <ToggleGroup
                    type="multiple"
                    value={categories}
                    onValueChange={(vals) => setCategories(vals)}
                    aria-label="Filter by category"
                    className="flex w-max items-center gap-2 pb-2"
                  >
                    {allCategories.map((c) => {
                      const count = categoryCounts[c] ?? 0;
                      return (
                        <ToggleGroupItem
                          key={c}
                          value={c}
                          aria-pressed={categoriesSet.has(c)}
                          className="h-7 whitespace-nowrap rounded-full border border-white/10 px-3 text-xs data-[state=on]:border-brand-600 data-[state=on]:bg-brand-600/10 data-[state=on]:text-white"
                          title={`Toggle category: ${c} (${count})`}
                        >
                          {c}
                          <span className="ml-1.5 inline-block rounded bg-white/5 px-1 text-[10px] text-zinc-500">
                            {count}
                          </span>
                        </ToggleGroupItem>
                      );
                    })}
                  </ToggleGroup>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              )}

              {/* Result count */}
              <div className="mt-2 text-right text-xs text-zinc-500" role="status" aria-live="polite">
                Showing {filtered.length} of {studies.length}
              </div>
            </CardContent>
          </Card>
        </div>

        <h2 id="all-projects" className="sr-only">
          All projects
        </h2>

        {/* Results */}
        <div id="projects-results">
          {filtered.length === 0 ? (
            <div className="mt-8 rounded-xl border border-white/10 bg-white/[0.03] p-6 text-sm text-zinc-400">
              <p>No projects match your filters{q ? ` for “${q}”` : ""}.</p>
              {hasActiveFilters && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearFilters}
                  className="mt-3 border-white/10 text-zinc-300 hover:border-white/20 hover:text-white"
                >
                  Reset filters
                </Button>
              )}
            </div>
          ) : view === "grid" ? (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((cs) => (
                <CaseStudyCard key={cs.slug} cs={cs} />
              ))}
            </div>
          ) : (
            <div className="mt-8 space-y-4">
              {filtered.map((cs) => {
                const href = `/projects/${cs.slug}`;
                return (
                  <article key={cs.slug} className="rounded-xl surface p-4">
                    <div className="flex flex-col gap-4 sm:flex-row">
                      <div className="sm:w-64">
                        <Link
                          href={href}
                          className="block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
                          aria-label={`Open case study: ${cs.title}`}
                        >
                          <ProjectMedia title={cs.title} image={cs.image} icon={cs.icon} />
                        </Link>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-xs text-zinc-500">
                          {cs.period} · {cs.role} · {cs.category}
                        </div>
                        <h3 className="mt-1 text-lg font-semibold tracking-tight">
                          <Link
                            href={href}
                            className="rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
                            aria-label={`Open case study: ${cs.title}`}
                          >
                            {cs.title}
                          </Link>
                        </h3>
                        {cs.tagline && <p className="text-sm text-brand-300">{cs.tagline}</p>}
                        <p className="mt-2 text-sm text-zinc-400">{cs.summary}</p>
                        <div className="mt-3 flex flex-wrap gap-2 text-xs text-zinc-400">
                          {cs.stack.slice(0, 10).map((s) => (
                            <span key={s} className="rounded border border-white/10 px-2 py-0.5">
                              {s}
                            </span>
                          ))}
                        </div>
                        <div className="mt-4 flex flex-wrap gap-4 text-sm">
                          {cs.links?.caseStudy && (
                            <a className="text-zinc-400 hover:text-white" href={cs.links.caseStudy}>
                              Case study →
                            </a>
                          )}
                          {cs.links?.live && (
                            <a
                              className="text-brand-400 hover:text-brand-300"
                              href={cs.links.live}
                              target="_blank"
                              rel="noreferrer"
                            >
                              Live →
                            </a>
                          )}
                          {cs.links?.code && (
                            <a
                              className="text-zinc-400 hover:text-white"
                              href={cs.links.code}
                              target="_blank"
                              rel="noreferrer"
                            >
                              Code →
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}