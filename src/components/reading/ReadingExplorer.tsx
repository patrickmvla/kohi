// src/components/reading/ReadingExplorer.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { ReadingItem } from "@/lib/reading";
import ReadingCard from "./ReadingCard";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { Search, X } from "lucide-react";

type Sort = "recent" | "alpha" | "progress" | "rating";

const norm = (s: string) =>
  (s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

export default function ReadingExplorer({ items }: { items: ReadingItem[] }) {
  const [q, setQ] = useState("");
  const [types, setTypes] = useState<Set<ReadingItem["type"]>>(new Set());
  const [statuses, setStatuses] = useState<Set<ReadingItem["status"]>>(new Set());
  const [sort, setSort] = useState<Sort>("recent");
  const [isMac, setIsMac] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad|iPod/.test(navigator.platform) || /Mac OS X/.test(navigator.userAgent));
  }, []);

  // Keyboard shortcuts: Cmd/Ctrl+K focuses search; "/" focuses; Esc clears when focused
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();

      if ((e.metaKey || e.ctrlKey) && key === "k") {
        e.preventDefault();
        document.getElementById("reading-filter")?.scrollIntoView({ behavior: "smooth", block: "start" });
        inputRef.current?.focus();
        return;
      }

      if (key === "/" && !e.metaKey && !e.ctrlKey && !e.altKey) {
        const el = document.activeElement as HTMLElement | null;
        const tag = el?.tagName?.toLowerCase();
        const isTyping = el?.isContentEditable || tag === "input" || tag === "textarea" || tag === "select";
        if (!isTyping) {
          e.preventDefault();
          inputRef.current?.focus();
        }
        return;
      }

      if (key === "escape" && document.activeElement === inputRef.current) {
        setQ("");
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const allTypes = useMemo(() => Array.from(new Set(items.map((i) => i.type))).sort(), [items]);
  const allStatuses = useMemo(() => Array.from(new Set(items.map((i) => i.status))).sort(), [items]);

  const filtered = useMemo(() => {
    const query = norm(q);
    const list = items.filter((i) => {
      const matchesQuery =
        !query ||
        norm(i.title).includes(query) ||
        norm(i.author).includes(query) ||
        i.tags?.some((t) => norm(t).includes(query));
      const matchesType = types.size === 0 || types.has(i.type);
      const matchesStatus = statuses.size === 0 || statuses.has(i.status);
      return matchesQuery && matchesType && matchesStatus;
    });

    const toDate = (i: ReadingItem) => i.dateFinished || i.dateStarted || "1970-01-01";

    return sort === "alpha"
      ? list.slice().sort((a, b) => a.title.localeCompare(b.title))
      : sort === "progress"
      ? list.slice().sort((a, b) => (b.progress ?? 0) - (a.progress ?? 0))
      : sort === "rating"
      ? list.slice().sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
      : list.slice().sort((a, b) => +new Date(toDate(b)) - +new Date(toDate(a)));
  }, [items, q, types, statuses, sort]);

  const clear = () => {
    setQ("");
    setTypes(new Set());
    setStatuses(new Set());
    setSort("recent");
  };

  const hasActive = q.trim().length > 0 || types.size > 0 || statuses.size > 0 || sort !== "recent";

  return (
    <section className="section">
      <div className="container">
        {/* Filter/search bar */}
        <Card
          id="reading-filter"
          className="sticky top-14 z-10 border-white/10 bg-black/60 backdrop-blur supports-[backdrop-filter]:bg-black/60"
        >
          <CardContent className="p-3">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              {/* Search */}
              <div className="relative w-full sm:max-w-md" role="search">
                <label htmlFor="reading-search" className="sr-only">
                  Search reading
                </label>
                <Search
                  className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 text-zinc-600"
                  aria-hidden="true"
                />
                <Input
                  id="reading-search"
                  ref={inputRef}
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search by title, author, or tag…"
                  className="h-9 pl-8 pr-24 border-white/10 bg-transparent placeholder:text-zinc-500 focus-visible:ring-brand-600"
                  autoComplete="off"
                  autoCapitalize="none"
                  autoCorrect="off"
                  spellCheck={false}
                />

                {/* Trailing actions: clear + kbd hint */}
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  {q && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => setQ("")}
                      className="h-6 w-6 text-zinc-600 hover:bg-transparent hover:text-zinc-300"
                      aria-label="Clear search"
                      title="Clear"
                    >
                      <X className="size-4" aria-hidden="true" />
                    </Button>
                  )}
                  <span className="pointer-events-none text-zinc-500" aria-hidden="true" suppressHydrationWarning>
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

              {/* Sort + Clear */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <label htmlFor="reading-sort" className="text-xs text-zinc-500">
                    Sort
                  </label>
                  <Select value={sort} onValueChange={(v) => setSort(v as Sort)}>
                    <SelectTrigger id="reading-sort" className="h-8 w-[140px] rounded-md border-white/10 text-xs">
                      <SelectValue placeholder="Sort" />
                    </SelectTrigger>
                    <SelectContent className="text-sm">
                      <SelectItem value="recent">Recent</SelectItem>
                      <SelectItem value="alpha">A–Z</SelectItem>
                      <SelectItem value="progress">Progress</SelectItem>
                      <SelectItem value="rating">Rating</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {hasActive && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clear}
                    className="text-zinc-400 hover:text-white"
                  >
                    Clear
                  </Button>
                )}
              </div>
            </div>

            {/* Type chips */}
            {allTypes.length > 0 && (
              <ScrollArea className="mt-3">
                <ToggleGroup
                  type="multiple"
                  value={Array.from(types)}
                  onValueChange={(vals) => setTypes(new Set(vals as ReadingItem["type"][]))}
                  aria-label="Filter by type"
                  className="flex w-max items-center gap-2 pb-2"
                >
                  {allTypes.map((t) => (
                    <ToggleGroupItem
                      key={t}
                      value={t}
                      aria-pressed={types.has(t)}
                      className="h-7 whitespace-nowrap rounded-full border border-white/10 px-3 text-xs data-[state=on]:border-brand-600 data-[state=on]:bg-brand-600/10 data-[state=on]:text-white"
                    >
                      {t}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            )}

            {/* Status chips */}
            {allStatuses.length > 0 && (
              <ScrollArea className="mt-2">
                <ToggleGroup
                  type="multiple"
                  value={Array.from(statuses)}
                  onValueChange={(vals) => setStatuses(new Set(vals as ReadingItem["status"][]))}
                  aria-label="Filter by status"
                  className="flex w-max items-center gap-2 pb-2"
                >
                  {allStatuses.map((s) => (
                    <ToggleGroupItem
                      key={s}
                      value={s}
                      aria-pressed={statuses.has(s)}
                      className="h-7 whitespace-nowrap rounded-full border border-white/10 px-3 text-xs capitalize data-[state=on]:border-brand-600 data-[state=on]:bg-brand-600/10 data-[state=on]:text-white"
                    >
                      {s}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            )}
          </CardContent>
        </Card>

        {/* Results */}
        {filtered.length === 0 ? (
          <div className="mt-8 rounded-xl border border-white/10 bg-white/[0.03] p-6 text-sm text-zinc-400">
            <p>No items match your filters{q ? ` for “${q}”` : ""}.</p>
            {hasActive && (
              <Button
                variant="outline"
                size="sm"
                onClick={clear}
                className="mt-3 border-white/10 text-zinc-300 hover:border-white/20 hover:text-white"
              >
                Reset filters
              </Button>
            )}
          </div>
        ) : (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item) => (
              <ReadingCard key={item.slug} item={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}