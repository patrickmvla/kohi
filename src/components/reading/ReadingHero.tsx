// src/components/reading/ReadingHero.tsx
export default function ReadingHero() {
  return (
    <section className="section">
      <div className="container">
        <div className="relative">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_40%_at_15%_0%,rgba(137,82,33,0.16),transparent_60%)]" />
          <p className="text-xs uppercase tracking-widest text-zinc-500">Reading</p>
          <h1 className="mt-2 max-w-4xl text-4xl font-extrabold tracking-tight sm:text-6xl">
            What I’m reading
          </h1>
          <p className="mt-6 max-w-2xl text-base text-zinc-400 sm:text-lg">
            Books, papers, and articles shaping my current thinking. Calm, deliberate, and curious.
          </p>
        </div>
      </div>
    </section>
  )
}