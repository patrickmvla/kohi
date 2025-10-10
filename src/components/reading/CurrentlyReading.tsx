// src/components/reading/CurrentlyReading.tsx
import Link from "next/link";
import type { ReadingItem } from "@/lib/reading";
import ReadingCard from "./ReadingCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default function CurrentlyReading({ items }: { items: ReadingItem[] }) {
  const current = items.filter((i) => i.status === "reading");
  if (current.length === 0) return null;

  return (
    <section id="currently-reading" aria-labelledby="currently-reading-heading" className="section">
      <div className="container">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 id="currently-reading-heading" className="text-2xl font-semibold">
              Currently reading
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-zinc-400">
              A snapshot of what’s open on the desk right now.
            </p>
          </div>

          <Link
            href="/reading"
            className="hidden text-sm text-brand-400 hover:text-brand-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 sm:inline-block"
            aria-label="View all reading"
          >
            All reading →
          </Link>
        </div>

        {/* Mobile shelf */}
        <ScrollArea className="mt-6 sm:hidden">
          <ul
            role="list"
            aria-label="Currently reading"
            className="-mx-1 flex snap-x snap-mandatory gap-3 px-1 pb-2"
          >
            {current.map((item) => (
              <li key={item.slug} className="min-w-[18rem] shrink-0 snap-start">
                <ReadingCard item={item} />
              </li>
            ))}
          </ul>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        {/* Desktop grid */}
        <ul
          role="list"
          className="mt-6 hidden gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-3"
          aria-label="Currently reading"
        >
          {current.map((item) => (
            <li key={item.slug}>
              <ReadingCard item={item} />
            </li>
          ))}
        </ul>

        {/* Mobile: All reading link */}
        <div className="mt-4 sm:hidden">
          <Link
            href="/reading"
            className="text-sm text-brand-400 hover:text-brand-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            aria-label="View all reading"
          >
            All reading →
          </Link>
        </div>
      </div>
    </section>
  );
}