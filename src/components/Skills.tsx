// src/components/Skills.tsx
type Group = {
  title: string
  items: string[]
}

const featured = ['TypeScript', 'Next.js', 'Supabase', 'Postgres/SQL']

const groups: Group[] = [
  {
    title: 'AI & LLMs',
    items: ['AI SDK', 'OpenAI', 'Groq', 'Hugging Face'],
  },
  {
    title: 'Application',
    items: ['React', 'Node.js', 'Edge Functions', 'Server Components', 'SSR/ISR'],
  },
  {
    title: 'Data & Infra',
    items: ['Prisma', 'Redis', 'ClickHouse', 'Drizzle', 'RLS', 'Migrations'],
  },
  {
    title: 'APIs & Tooling',
    items: ['tRPC', 'Zod', 'OpenAPI', 'Playwright', 'Vitest/Jest', 'ESLint'],
  },
  {
    title: 'Practices',
    items: ['Performance budgets', 'Accessibility (a11y)', 'Observability (OTel)', 'CI/CD', 'Testing strategy'],
  },
]

function Pill({ children, featured = false }: { children: React.ReactNode; featured?: boolean }) {
  return (
    <span
      className={[
        'rounded-full border px-3 py-1 text-xs',
        featured
          ? 'border-brand-600 bg-brand-600/10 text-white'
          : 'border-white/10 text-zinc-400 hover:text-white',
      ].join(' ')}
    >
      {children}
    </span>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <div className="relative">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_40%_at_85%_0%,rgba(137,82,33,0.12),transparent_60%)]" />
          <h2 className="text-2xl font-semibold">Skills & Stack</h2>
          <p className="mt-2 max-w-2xl text-sm text-zinc-400">
            Calm, durable systems with a modern web stack — strong TypeScript foundations, Next.js on the edge,
            data you can trust, and pragmatic AI where it adds clarity.
          </p>

          {/* Featured row */}
          <div className="mt-5 flex flex-wrap gap-2">
            {featured.map((s) => (
              <Pill key={s} featured>
                {s}
              </Pill>
            ))}
          </div>

          {/* Grouped cards */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {groups.map((g) => (
              <article key={g.title} className="rounded-xl surface p-5">
                <h3 className="text-base font-semibold">{g.title}</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {g.items.map((item) => (
                    <Pill key={item}>{item}</Pill>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}