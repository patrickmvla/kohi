// src/components/reading/ReadingHero.tsx
import Link from "next/link";
import { Rss } from "lucide-react";

const FILTERS = [
  { label: "All", href: "/reading" },
  { label: "Books", href: "/reading?type=book" },
  { label: "Papers", href: "/reading?type=paper" },
  { label: "Articles", href: "/reading?type=article" },
  { label: "Notes", href: "/reading?type=note" },
];

export default function ReadingHero() {
  return (
    <section aria-labelledby="reading-hero-heading" className="section">
      <div className="container">
        <div className="relative">
          {/* Overlay removed for a cleaner, more professional look */}
          <p className="text-[11px] uppercase tracking-widest text-brand-300/80">
            Reading
          </p>

          <h1
            id="reading-hero-heading"
            className="relative mt-2 max-w-4xl text-4xl font-extrabold tracking-tight sm:text-6xl after:mt-4 after:block after:h-px after:w-16 after:bg-gradient-to-r after:from-brand-500/70 after:to-transparent"
          >
            What I’m reading
          </h1>

          <p className="mt-6 max-w-2xl text-base text-zinc-400 sm:text-lg">
            Books, papers, and articles shaping my current thinking. Calm,
            deliberate, and curious.
          </p>

          {/* Actions */}
          <div className="mt-6 flex items-center gap-4 text-sm">
            <Link
              href="/rss.xml"
              className="inline-flex items-center gap-1 rounded text-zinc-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              aria-label="Subscribe via RSS"
            >
              <Rss className="size-4" aria-hidden="true" />
              RSS
            </Link>
            <span className="text-xs text-zinc-600" aria-hidden="true">•</span>
            <Link
              href="#library"
              className="rounded text-zinc-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            >
              Jump to library
            </Link>
          </div>

          {/* Filters */}
          <nav aria-label="Reading filters" className="mt-8">
            <ul className="-mx-1 flex flex-wrap items-center gap-2">
              {FILTERS.map((f) => (
                <li key={f.label}>
                  <Link
                    href={f.href}
                    className="inline-flex items-center rounded-full border border-white/10 px-3 py-1 text-xs text-zinc-300 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                  >
                    {f.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
}