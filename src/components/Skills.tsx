// src/components/Skills.tsx
import { type ReactNode } from "react";
import { Code2, Cpu, Database, Wrench, Cloud, Bot } from "lucide-react";

type Group = {
  title: string;
  icon: ReactNode;
  items: string[];
};

const featured = ["TypeScript", "Next.js", "Supabase", "Postgres/SQL"];

const groups: Group[] = [
  {
    title: "AI & LLMs",
    icon: <Bot className="h-4 w-4" aria-hidden />,
    items: ["AI SDK", "OpenAI", "Groq", "Hugging Face", "Google Gemini", "TensorFlow.js"],
  },
  {
    title: "Application",
    icon: <Code2 className="h-4 w-4" aria-hidden />,
    items: ["React", "Next.js", "Vue", "Nuxt", "shadcn/ui", "Tailwind CSS"],
  },
  {
    title: "Backend & APIs",
    icon: <Cpu className="h-4 w-4" aria-hidden />,
    items: ["Node.js", "Express.js", "Hono", "Gin", "REST APIs"],
  },
  {
    title: "Data & ORMs",
    icon: <Database className="h-4 w-4" aria-hidden />,
    items: ["PostgreSQL", "MySQL", "MongoDB", "Prisma", "Drizzle ORM", "Vector DB"],
  },
  {
    title: "Cloud & DevOps",
    icon: <Cloud className="h-4 w-4" aria-hidden />,
    items: ["Vercel", "Supabase", "Docker", "GitHub Actions", "Linux", "Render"],
  },
  {
    title: "Practices",
    icon: <Wrench className="h-4 w-4" aria-hidden />,
    items: ["API Design", "Database Architecture", "Full‑stack", "Performance", "SEO", "Observability", "CI/CD"],
  },
];

// Light fuzzy match so featured pills auto-accent inside groups (e.g., Postgres/SQL ↔ PostgreSQL)
function isCore(item: string) {
  const i = item.toLowerCase();
  return (
    i.includes("typescript") ||
    i.includes("next.js") ||
    i.includes("supabase") ||
    i.includes("postgres") ||
    i.includes("sql")
  );
}

function Pill({ children, accent = false }: { children: React.ReactNode; accent?: boolean }) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs transition-colors",
        accent
          ? "border border-brand-600 bg-brand-600/10 text-white"
          : "border border-white/10 text-zinc-300 hover:text-white hover:bg-white/5",
      ].join(" ")}
    >
      {children}
    </span>
  );
}

function IconBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-300">
      {children}
    </span>
  );
}

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="section">
      <div className="container">
        <div className="relative">
          {/* Overlay removed */}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 id="skills-heading" className="text-2xl font-semibold">
                Skills & Stack
              </h2>
              <p className="mt-1 max-w-2xl text-sm text-zinc-400">
                Calm, durable systems with strong TypeScript foundations, modern web platforms, and pragmatic AI.
              </p>
            </div>
          </div>

          {/* Core stack band */}
          <div className="mt-5 flex flex-wrap gap-2">
            {featured.map((s) => (
              <Pill key={s} accent>
                {s}
              </Pill>
            ))}
          </div>

          {/* Grouped list */}
          <ul role="list" className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {groups.map((g) => (
              <li key={g.title} className="rounded-xl border border-white/10 bg-white/[0.04] p-5 transition-colors hover:border-white/20">
                <div className="flex items-center gap-2">
                  <IconBadge>{g.icon}</IconBadge>
                  <h3 className="text-base font-semibold">{g.title}</h3>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {g.items.map((item) => (
                    <Pill key={item} accent={isCore(item)}>
                      {item}
                    </Pill>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}