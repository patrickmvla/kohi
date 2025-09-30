// src/components/Hero.tsx
import Link from "next/link";

export default function Hero() {
  return (
    <section className="section">
      <div className="container">
        <div className="relative">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_40%_at_15%_0%,rgba(137,82,33,0.16),transparent_60%)]" />
          <p className="text-xs uppercase tracking-widest text-zinc-500">
            kohi a portfolio project by patrick mvula — software engineer
          </p>
          <h1 className="mt-2 max-w-4xl text-4xl font-extrabold tracking-tight sm:text-6xl">
            Calm, reliable software — built with intent
          </h1>
          <p className="mt-6 max-w-2xl text-base text-zinc-400 sm:text-lg">
            I design and ship systems that favor clarity, durability, and
            performance. Explore in‑depth projects, field notes, and what’s
            shaping my thinking.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/projects"
              className="rounded-md bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-500"
            >
              Explore projects
            </Link>
            {/* <Link
              href="/blog"
              className="rounded-md border border-white/10 px-5 py-2.5 text-sm text-white hover:border-white/30"
            >
              Read the blog
            </Link> */}
          </div>

          <div className="mt-10 grid gap-6 text-sm text-zinc-400 sm:grid-cols-3">
            <div className="rounded-lg surface p-4">
              <div className="text-xs text-zinc-500">Focus</div>
              <div className="mt-1 text-zinc-200">
                Web platforms, DX, performance
              </div>
            </div>
            <div className="rounded-lg surface p-4">
              <div className="text-xs text-zinc-500">Currently</div>
              <div className="mt-1 text-zinc-200">
                Next.js, TypeScript, React, AI/ML, Go
              </div>
            </div>
            <div className="rounded-lg surface p-4">
              <div className="text-xs text-zinc-500">Availability</div>
              <div className="mt-1 text-zinc-200">
                Open to select collaborations
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
