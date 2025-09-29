// components/blog/BlogHero.tsx
import Link from 'next/link'

export default function BlogHero() {
  return (
    <section className="section">
      <div className="container">
        <div className="relative">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_40%_at_15%_0%,rgba(137,82,33,0.16),transparent_60%)]" />
          <p className="text-xs uppercase tracking-widest text-zinc-500">Writing</p>
          <h1 className="mt-2 max-w-4xl text-4xl font-extrabold tracking-tight sm:text-6xl">
            Notes on building calm, reliable systems
          </h1>
          <p className="mt-6 max-w-2xl text-base text-zinc-400 sm:text-lg">
            Essays and field notes on clarity, performance, and the seams that make software feel effortless.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/projects" className="rounded-md border border-white/10 px-5 py-2.5 text-sm text-white hover:border-white/30">
              Explore projects
            </Link>
            <a href="/rss.xml" className="rounded-md bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-500">
              Subscribe (RSS)
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}