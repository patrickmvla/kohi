// src/app/about/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import CoverImage from "@/components/ui/CoverImage";
import { topFilms, topShows } from "@/lib/faves";
import { readingItems } from "@/lib/reading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export const metadata: Metadata = {
  title: "About — kohi",
  description:
    "About Patrick Mvula — software engineer. Calm, reliable software; cinephile; music; reading technical books and docs; gaming; and building ambitious AI projects.",
};

function Shelf({
  title,
  items,
  caption,
}: {
  title: string;
  items: {
    slug: string;
    title: string;
    year?: string | number;
    cover?: string;
    href?: string;
  }[];
  caption?: string;
}) {
  return (
    <section className="mt-6">
      <div className="flex items-baseline justify-between">
        <h3 className="text-lg font-semibold">{title}</h3>
        {caption ? <div className="text-xs text-zinc-500">{caption}</div> : null}
      </div>

      {/* Mobile shelf (smooth scroll + scrollbar) */}
      <ScrollArea className="mt-4 sm:hidden">
        <ul role="list" className="-mx-1 flex snap-x snap-mandatory gap-3 px-1 pb-2">
          {items.map((i) => {
            const content = (
              <>
                <CoverImage src={i.cover} alt={`${i.title} cover`} widthClass="w-40" ratio="2 / 3" />
                <figcaption className="mt-2 text-xs text-zinc-300">
                  <div className="truncate">{i.title}</div>
                  {i.year ? <div className="text-zinc-500">{i.year}</div> : null}
                </figcaption>
              </>
            );
            return (
              <li key={i.slug} className="min-w-[10rem] shrink-0 snap-start">
                <figure>
                  {i.href ? (
                    <a
                      href={i.href}
                      target="_blank"
                      rel="noreferrer"
                      className="block rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
                      aria-label={`${i.title}${i.year ? ` (${i.year})` : ""}`}
                    >
                      {content}
                    </a>
                  ) : (
                    content
                  )}
                </figure>
              </li>
            );
          })}
        </ul>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      {/* Desktop grid */}
      <div className="mt-4 hidden gap-4 sm:grid sm:grid-cols-5">
        {items.map((i) => {
          const content = (
            <>
              <CoverImage src={i.cover} alt={`${i.title} cover`} widthClass="w-full" ratio="2 / 3" />
              <figcaption className="mt-2 text-xs text-zinc-300">
                <div className="truncate">{i.title}</div>
                {i.year ? <div className="text-zinc-500">{i.year}</div> : null}
              </figcaption>
            </>
          );
          return (
            <figure key={i.slug}>
              {i.href ? (
                <a
                  href={i.href}
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
                  aria-label={`${i.title}${i.year ? ` (${i.year})` : ""}`}
                >
                  {content}
                </a>
              ) : (
                content
              )}
            </figure>
          );
        })}
      </div>
    </section>
  );
}

function GenrePill({ children }: { children: React.ReactNode }) {
  return (
    <Badge
      variant="outline"
      className="rounded-full border-white/12 bg-transparent text-zinc-300 hover:bg-white/5"
    >
      {children}
    </Badge>
  );
}

function LinkChip({ href = "#", children }: { href?: string; children: React.ReactNode }) {
  const base =
    "inline-flex items-center rounded-full border border-white/10 px-2.5 py-1 text-xs text-zinc-300 transition-colors hover:bg-white/5 hover:text-white";
  const arrow = <span aria-hidden> →</span>;

  return href.startsWith("/") ? (
    <Link href={href} className={base}>
      {children}
      {arrow}
    </Link>
  ) : (
    <a href={href} target="_blank" rel="noreferrer" className={base}>
      {children}
      {arrow}
    </a>
  );
}

export default function AboutPage() {
  const readingPreview = readingItems.slice(0, 3);
  const docsBlogs = [
    { title: "Postgres docs — window functions", href: "#" },
    { title: "Vercel AI SDK — streaming + tools", href: "#" },
    { title: "RAG evaluations — building honest benchmarks", href: "#" },
  ];

  const games = [
    {
      title: "Resident Evil 4",
      note:
        "All‑timer. Relentless pacing, encounter design, and that delicious inventory Tetris — clarity under pressure.",
    },
    {
      title: "Apex Legends",
      note:
        "Movement tech and squad comms. Micro‑decisions per second; clean cues and momentum reward mastery.",
    },
    {
      title: "God of War",
      note:
        "Narrative scale with readable, layered combat. Systems that feel heavy but stay approachable.",
    },
    {
      title: "Call of Duty",
      note:
        "Responsiveness you can feel — input latency, netcode, aim feel. Those milliseconds matter.",
    },
  ];

  return (
    <main className="section-compact">
      {/* Hero */}
      <section className="section" aria-labelledby="about-heading">
        <div className="container">
          <div className="relative">
            <p className="text-[11px] uppercase tracking-widest text-brand-300/80">About</p>
            <h1
              id="about-heading"
              className="relative mt-2 max-w-4xl text-4xl font-extrabold tracking-tight sm:text-6xl after:mt-4 after:block after:h-px after:w-16 after:bg-gradient-to-r after:from-brand-500/70 after:to-transparent"
            >
              I try to make complicated things feel simple — without pretending they are
            </h1>
            <p className="mt-5 max-w-3xl text-sm text-zinc-400 sm:text-base">
              I’m Patrick. I build calm, reliable software with an unreasonable love for clarity, performance,
              and the quiet confidence of systems that just work. One durable solution beats three clever hacks
              I can’t sleep with.
            </p>
          </div>
        </div>
      </section>

      {/* What “kohi” means */}
      <section className="section" aria-labelledby="kohi-meaning">
        <div className="container">
          <div className="rounded-xl border border-white/10 bg-white/[0.04] p-5">
            <h2 id="kohi-meaning" className="text-base font-semibold">
              What “kohi” means
            </h2>
            <p className="mt-2 text-sm text-zinc-400">
              “kohi” (コーヒー) is Japanese for coffee — a nod to calm focus, careful craft, and work that
              rewards patience. That’s the vibe: fewer moving parts, better taste, long‑term energy.
            </p>
          </div>
        </div>
      </section>

      {/* Ambition (coffee-tint, blended) */}
      <section className="section" aria-labelledby="ambition-heading">
        <div className="container">
          <div className="rounded-2xl border border-brand-800/20 bg-brand-900/10 p-5 sm:p-6">
            <h2 id="ambition-heading" className="text-2xl font-semibold">
              Ambition
            </h2>

            <p className="mt-3 max-w-3xl text-sm text-zinc-200">
              I’m a software engineer aiming to be unfairly good at the craft. Fast, legible, and easy to change—
              systems that keep momentum without surprise costs.
            </p>
            <p className="mt-2 max-w-3xl text-sm text-zinc-300">
              The bias is simple: make it clear, make it quick, then make it boring (in the good way). Small parts,
              explicit seams, and feedback loops that teach.
            </p>

            <ul className="mt-4 grid gap-2 text-sm text-zinc-100 sm:grid-cols-2">
              <li>
                <span className="font-medium text-zinc-50">Interfaces:</span> quick paths, honest states, type‑safe by default.
              </li>
              <li>
                <span className="font-medium text-zinc-50">Services:</span> small pieces, clear contracts, graceful failure, cost‑aware choices.
              </li>
              <li>
                <span className="font-medium text-zinc-50">Data & AI:</span> retrieval quality first, rigorous evals, versioned prompts/tools.
              </li>
              <li>
                <span className="font-medium text-zinc-50">Practice:</span> read/write docs, test seams, defend tail latencies, trim noise.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Cinephile: shelves */}
      <section className="section" aria-labelledby="cinephile-heading">
        <div className="container">
          <h2 id="cinephile-heading" className="text-2xl font-semibold">
            Cinephile energy
          </h2>
          <p className="mt-2 max-w-3xl text-sm text-zinc-400">
            I hate a lot of things — complexity for sport, cargo‑cult trends, meetings that could be a paragraph.
            But man, do I love sinking into a great film or TV show. Pacing, framing, and score teach the same
            lessons I use in UX: tension, release, and the courage to cut.
          </p>

          <Shelf title="Top 5 films" caption="In no particular order" items={topFilms} />
          <Shelf title="Top 5 TV shows" caption="In no particular order" items={topShows} />
        </div>
      </section>

      {/* Music */}
      <section className="section" aria-labelledby="music-heading">
        <div className="container">
          <h2 id="music-heading" className="text-2xl font-semibold">
            Music that keeps the cursor moving
          </h2>
          <p className="mt-2 max-w-3xl text-sm text-zinc-400">
            I’m not bound to one genre. I rotate indie artists, hip‑hop, R&amp;B, soft rock, alt, and pop —
            whatever fits the build. Texture and restraint over loudness wars. If it grooves, it ships.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {["Indie", "Hip‑hop", "R&B", "Soft rock", "Alt", "Pop"].map((g) => (
              <GenrePill key={g}>{g}</GenrePill>
            ))}
          </div>
        </div>
      </section>

      {/* Reading — books + docs/blogs */}
      <section className="section" aria-labelledby="reading-heading">
        <div className="container">
          <h2 id="reading-heading" className="text-2xl font-semibold">
            Reading (books, docs, blogs)
          </h2>
          <p className="mt-2 max-w-3xl text-sm text-zinc-400">
            I read to change my mind on purpose. Books are the deep dives; docs and blogs are where I wrestle
            with details. If it presents a challenge, I’m on board.
          </p>

          {/* Current books */}
          <ul role="list" className="mt-4 grid gap-3 sm:grid-cols-3">
            {readingPreview.slice(0, 3).map((b) => (
              <li key={b.slug} className="rounded-xl surface p-4">
                <div className="flex items-start gap-3">
                  <CoverImage src={b.cover} alt={`${b.title} cover`} widthClass="w-14" ratio="2 / 3" />
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold">{b.title}</div>
                    <div className="mt-0.5 text-xs text-zinc-400">{b.author}</div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/* Docs & blogs chips */}
          <div className="mt-3 flex flex-wrap gap-2">
            {docsBlogs.map((d) => (
              <LinkChip key={d.title} href={d.href}>
                {d.title}
              </LinkChip>
            ))}
          </div>

          <div className="mt-3 text-sm">
            <Link href="/reading" className="text-brand-400 hover:text-brand-300">
              See more →
            </Link>
          </div>
        </div>
      </section>

      {/* Games */}
      <section className="section" aria-labelledby="games-heading">
        <div className="container">
          <h2 id="games-heading" className="text-2xl font-semibold">
            Games I keep coming back to
          </h2>
          <p className="mt-2 max-w-3xl text-sm text-zinc-400">
            I play for feedback loops. If the event loop is tight and the game teaches you in motion, I’m hooked.
            <span className="text-zinc-300"> Resident Evil 4</span> is my favorite game of all time. For speed and
            squad flow, it’s <span className="text-zinc-300">Apex Legends</span>. For story and systems,
            <span className="text-zinc-300"> God of War</span>. And when I want pure responsiveness,
            <span className="text-zinc-300"> Call of Duty</span> still slaps.
          </p>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {games.map((g) => (
              <article key={g.title} className="rounded-xl surface p-4">
                <div className="text-sm font-semibold">{g.title}</div>
                <p className="mt-1 text-sm text-zinc-400">{g.note}</p>
              </article>
            ))}
          </div>

          <div className="mt-4">
            <h3 className="text-sm font-semibold text-zinc-300">
              What this teaches me about software
            </h3>
            <ul className="mt-2 space-y-1 text-sm text-zinc-300">
              <li>— Instant, honest feedback beats heavy ceremony.</li>
              <li>— Low latency and readable signals make skill possible.</li>
              <li>— Layered systems should feel deep, not confusing.</li>
              <li>— Fair difficulty curves and recovery paths build trust.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Software philosophy */}
      <section className="section" aria-labelledby="ship-heading">
        <div className="container">
          <h2 id="ship-heading" className="text-2xl font-semibold">
            How I ship
          </h2>
        <ul className="mt-3 space-y-2 text-sm text-zinc-300">
            <li>— Clarity over cleverness. Types as a design tool.</li>
            <li>— Budgets beat averages. Defend the tail latencies.</li>
            <li>— Fewer moving parts, stronger seams, better docs.</li>
            <li>— Accessibility and reliability by default.</li>
            <li>— Pragmatic AI when it adds real leverage.</li>
          </ul>

          <div className="mt-5 flex gap-3">
            <Button asChild className="gap-2">
              <Link href="/projects">Explore projects</Link>
            </Button>
            <Button asChild variant="outline" className="gap-2">
              <Link href="/contact">Contact</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" aria-labelledby="cta-heading">
        <div className="container">
          <div className="rounded-2xl surface p-6 text-center sm:p-10">
            <h2 id="cta-heading" className="text-2xl font-semibold">
              Let’s build something calm and reliable
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-zinc-400">
              If this resonates, say hi — I’m always down to talk shop, swap notes, and ship something we’re proud of.
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              <Button asChild className="px-5">
                <Link href="/projects">View projects</Link>
              </Button>
              <Button asChild variant="outline" className="px-5">
                <Link href="/contact">Contact</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}