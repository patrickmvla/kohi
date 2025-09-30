// src/app/about/page.tsx
import type { Metadata } from 'next'
import CoverImage from '@/components/ui/CoverImage'
import { topFilms, topShows } from '@/lib/faves'
import { readingItems } from '@/lib/reading'

export const metadata: Metadata = {
  title: 'About — kohi',
  description:
    'About Patrick Mvula — software engineer. Calm, reliable software; cinephile; music; reading technical books and docs; gaming; and building ambitious AI projects.',
}

function Shelf({
  title,
  items,
  caption,
}: {
  title: string
  items: { slug: string; title: string; year?: string | number; cover?: string; href?: string }[]
  caption?: string
}) {
  return (
    <section className="mt-6">
      <div className="flex items-baseline justify-between">
        <h3 className="text-lg font-semibold">{title}</h3>
        {caption ? <div className="text-xs text-zinc-500">{caption}</div> : null}
      </div>

      {/* Mobile shelf */}
      <div className="mt-4 -mx-1 flex gap-3 overflow-x-auto px-1 sm:hidden">
        {items.map((i) => (
          <figure key={i.slug} className="min-w-[10rem] shrink-0">
            <CoverImage src={i.cover} alt={`${i.title} cover`} widthClass="w-40" ratio="2 / 3" />
            <figcaption className="mt-2 text-xs text-zinc-300">
              <div className="truncate">{i.title}</div>
              {i.year ? <div className="text-zinc-500">{i.year}</div> : null}
            </figcaption>
          </figure>
        ))}
      </div>

      {/* Desktop grid */}
      <div className="mt-4 hidden gap-4 sm:grid sm:grid-cols-5">
        {items.map((i) => (
          <figure key={i.slug}>
            <CoverImage src={i.cover} alt={`${i.title} cover`} widthClass="w-full" ratio="2 / 3" />
            <figcaption className="mt-2 text-xs text-zinc-300">
              <div className="truncate">{i.title}</div>
              {i.year ? <div className="text-zinc-500">{i.year}</div> : null}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}

function GenrePill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 px-2.5 py-1 text-xs text-zinc-300">
      {children}
    </span>
  )
}

function LinkChip({ href = '#', children }: { href?: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center rounded-full border border-white/10 px-2.5 py-1 text-xs text-zinc-300 hover:text-white"
    >
      {children} →
    </a>
  )
}

export default function AboutPage() {
  const readingPreview = readingItems.slice(0, 3)
  const docsBlogs = [
    { title: 'Postgres docs — window functions', href: '#' },
    { title: 'Vercel AI SDK — streaming + tools', href: '#' },
    { title: 'RAG evaluations — building honest benchmarks', href: '#' },
  ]

  const games = [
    {
      title: 'Resident Evil 4',
      note:
        'All‑timer. Relentless pacing, encounter design, and that delicious inventory Tetris — clarity under pressure.',
    },
    {
      title: 'Apex Legends',
      note:
        'Movement tech and squad comms. Micro‑decisions per second; clean cues and momentum reward mastery.',
    },
    {
      title: 'God of War',
      note:
        'Narrative scale with readable, layered combat. Systems that feel heavy but stay approachable.',
    },
    {
      title: 'Call of Duty',
      note:
        'Responsiveness you can feel — input latency, netcode, aim feel. Those milliseconds matter.',
    },
  ]

  return (
    <main className="section-compact">
      {/* Hero: your voice (not the landing page) */}
      <section className="section">
        <div className="container">
          <div className="relative">
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_40%_at_18%_0%,rgba(137,82,33,0.16),transparent_60%)]" />
            <p className="text-xs uppercase tracking-widest text-zinc-500">About</p>
            <h1 className="mt-2 max-w-4xl text-4xl font-extrabold tracking-tight sm:text-6xl">
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
      <section className="section">
        <div className="container">
          <div className="rounded-xl border border-white/10 bg-white/5 p-5">
            <h2 className="text-base font-semibold">What “kohi” means</h2>
            <p className="mt-2 text-sm text-zinc-400">
              “kohi” (コーヒー) is Japanese for coffee — a nod to calm focus, careful craft, and work that
              rewards patience. That’s the vibe: fewer moving parts, better taste, long‑term energy.
            </p>
          </div>
        </div>
      </section>

      {/* Ambition */}
      <section className="section">
        <div className="container">
          <h2 className="text-2xl font-semibold">Ambition</h2>
          <p className="mt-3 max-w-3xl text-sm text-zinc-300">
            I love the art of software — frontend or backend — and I want to be great at it. I’m happiest when
            I’m learning fast, building with intention, and reading docs that make me better. AI is a current
            playground: RAG systems, tool‑using agents, evals, retrieval that actually retrieves. I’m eager to
            connect with people who love to build (and who I can learn from). Bring me something tricky; if it
            presents a challenge, I’m in.
          </p>
          <ul className="mt-3 space-y-2 text-sm text-zinc-300">
            <li>— Frontend: crisp UX, honest APIs, strong type safety.</li>
            <li>— Backend: predictable costs, good observability, graceful failure.</li>
            <li>— AI: data quality first, measurable behavior, shipping over demos.</li>
            <li>— Always: read the docs, write the docs, keep the seams testable.</li>
          </ul>
        </div>
      </section>

      {/* Cinephile: voice + shelves */}
      <section className="section">
        <div className="container">
          <h2 className="text-2xl font-semibold">Cinephile energy</h2>
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
      <section className="section">
        <div className="container">
          <h2 className="text-2xl font-semibold">Music that keeps the cursor moving</h2>
          <p className="mt-2 max-w-3xl text-sm text-zinc-400">
            I’m not bound to one genre. I rotate indie artists, hip‑hop, R&amp;B, soft rock, alt, and pop —
            whatever fits the build. Texture and restraint over loudness wars. If it grooves, it ships.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {['Indie', 'Hip‑hop', 'R&B', 'Soft rock', 'Alt', 'Pop'].map((g) => (
              <GenrePill key={g}>{g}</GenrePill>
            ))}
          </div>
        </div>
      </section>

      {/* Reading — books + docs/blogs */}
      <section className="section">
        <div className="container">
          <h2 className="text-2xl font-semibold">Reading (books, docs, blogs)</h2>
          <p className="mt-2 max-w-3xl text-sm text-zinc-400">
            I read to change my mind on purpose. Books are the deep dives; docs and blogs are where I wrestle
            with details. If it presents a challenge, I’m on board.
          </p>

          {/* Current books */}
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {readingPreview.map((b) => (
              <div key={b.title} className="rounded-xl surface p-4">
                <div className="flex items-start gap-3">
                  <CoverImage src={b.cover} alt={`${b.title} cover`} widthClass="w-14" ratio="2 / 3" />
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold">{b.title}</div>
                    <div className="mt-0.5 text-xs text-zinc-400">{b.author}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Docs & blogs chips */}
          <div className="mt-3 flex flex-wrap gap-2">
            {docsBlogs.map((d) => (
              <LinkChip key={d.title} href={d.href}>
                {d.title}
              </LinkChip>
            ))}
          </div>

          <div className="mt-3 text-sm">
            <a href="/reading" className="text-brand-400 hover:text-brand-300">
              See more →
            </a>
          </div>
        </div>
      </section>

      {/* Games — voice + lessons */}
      <section className="section">
        <div className="container">
          <h2 className="text-2xl font-semibold">Games I keep coming back to</h2>
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
            <h3 className="text-sm font-semibold text-zinc-300">What this teaches me about software</h3>
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
      <section className="section">
        <div className="container">
          <h2 className="text-2xl font-semibold">How I ship</h2>
          <ul className="mt-3 space-y-2 text-sm text-zinc-300">
            <li>— Clarity over cleverness. Types as a design tool.</li>
            <li>— Budgets beat averages. Defend the tail latencies.</li>
            <li>— Fewer moving parts, stronger seams, better docs.</li>
            <li>— Accessibility and reliability by default.</li>
            <li>— Pragmatic AI when it adds real leverage.</li>
          </ul>

          <div className="mt-5 text-sm">
            <a href="/projects" className="text-brand-400 hover:text-brand-300">
              Explore projects →
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container">
          <div className="rounded-2xl surface p-6 text-center sm:p-10">
            <h2 className="text-2xl font-semibold">Let’s build something calm and reliable</h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-zinc-400">
              If this resonates, say hi — I’m always down to talk shop, swap notes, and ship something we’re proud of.
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              <a
                href="/projects"
                className="rounded-md bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-500"
              >
                View projects
              </a>
              <a
                href="/contact"
                className="rounded-md border border-white/10 px-5 py-2.5 text-sm text-white hover:border-white/30"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}