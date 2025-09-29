// components/projects/ProjectsHero.tsx
export default function ProjectsHero() {
  return (
    <section className="section">
      <div className="container">
        <div className="relative">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_40%_at_20%_10%,rgba(137,82,33,0.18),transparent_60%)]" />
          <h1 className="max-w-4xl text-4xl font-extrabold tracking-tight sm:text-6xl">
            Work that ships with pride
          </h1>
          <p className="mt-6 max-w-2xl text-base text-zinc-400 sm:text-lg">
            The heart of my practice: in‑depth projects with context, constraints,
            and the decisions in‑between. Elegantly executed, carefully measured.
          </p>
        </div>
      </div>
    </section>
  )
}