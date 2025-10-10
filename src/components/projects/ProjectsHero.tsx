// components/projects/ProjectsHero.tsx
import Link from "next/link";

const FILTERS = [
  { label: "All", href: "/projects" },
  { label: "Case studies", href: "/projects?type=case-study" },
  { label: "Client work", href: "/projects?type=client" },
  { label: "Open source", href: "/projects?type=open-source" },
  { label: "Experiments", href: "/projects?type=experiment" },
];

export default function ProjectsHero() {
  return (
    <section aria-labelledby="projects-hero-heading" className="section">
      <div className="container">
        <div className="relative">
          {/* Overlay removed */}
          <p className="text-[11px] uppercase tracking-widest text-brand-300/80">
            Projects
          </p>

          <h1
            id="projects-hero-heading"
            className="relative mt-2 max-w-4xl text-4xl font-extrabold tracking-tight sm:text-6xl after:mt-4 after:block after:h-px after:w-16 after:bg-gradient-to-r after:from-brand-500/70 after:to-transparent"
          >
            Work that ships with pride
          </h1>

          <p className="mt-6 max-w-2xl text-base text-zinc-400 sm:text-lg">
            The heart of my practice: in‑depth projects with context, constraints,
            and the decisions in‑between. Elegantly executed, carefully measured.
          </p>

          {/* Filters (optional wiring) */}
          <nav aria-label="Project filters" className="mt-8">
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