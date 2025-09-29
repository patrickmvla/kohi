// src/lib/resume.ts
export type Resume = {
  name: string
  title: string
  location?: string
  email?: string
  website?: string
  socials?: { label: string; href: string }[]
  summary?: string
  skills: { title: string; items: string[] }[]
  experience: {
    company: string
    role: string
    start: string
    end?: string
    location?: string
    bullets: string[]
    stack?: string[]
    link?: string
  }[]
  projects?: {
    title: string
    tagline?: string
    bullets?: string[]
    link?: string
    stack?: string[]
  }[]
  education?: {
    school: string
    degree: string
    period?: string
    details?: string[]
  }[]
}

export const resume: Resume = {
  name: 'kohi',
  title: 'Software Engineer',
  location: 'Remote-first',
  email: 'hello@kohi.dev',
  website: 'https://your-domain.com',
  socials: [
    { label: 'GitHub', href: 'https://github.com/you' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/you' },
    { label: 'X', href: 'https://x.com/you' },
  ],
  summary:
    'I build calm, reliable web software. Strong TypeScript, Next.js, data you can trust, and pragmatic AI when it adds clarity.',
  skills: [
    { title: 'Core', items: ['TypeScript', 'Next.js', 'React', 'Node.js'] },
    { title: 'Data & Infra', items: ['Postgres/SQL', 'Supabase', 'Redis', 'Prisma/Drizzle'] },
    { title: 'AI & LLMs', items: ['AI SDK', 'OpenAI', 'Groq', 'Hugging Face'] },
    { title: 'APIs & DX', items: ['REST/OpenAPI', 'tRPC', 'Zod', 'Playwright', 'Vitest/Jest'] },
    { title: 'Practices', items: ['Performance budgets', 'Accessibility', 'Observability (OTel)', 'CI/CD'] },
  ],
  experience: [
    {
      company: 'Independent / kohi',
      role: 'Lead Engineer (Contract)',
      start: '2024',
      end: 'Present',
      bullets: [
        'Shipped a realtime analytics platform with sub‑second queries and ergonomic SDKs.',
        'Built a tokenized design system and accessible components to speed product delivery.',
        'Led performance budgets, tracing, and incident playbooks for steady execution.',
      ],
      stack: ['Next.js', 'Edge', 'ClickHouse', 'TypeScript'],
      link: 'https://your-domain.com/projects',
    },
    {
      company: 'Product Team',
      role: 'Software Engineer',
      start: '2022',
      end: '2024',
      bullets: [
        'Designed APIs that were hard to misuse and easy to document.',
        'Improved core flows with tests as a conversation and CI gates.',
      ],
      stack: ['Node', 'Postgres', 'Prisma', 'Playwright'],
    },
  ],
  projects: [
    {
      title: 'Realtime Analytics Platform',
      tagline: 'Sub‑second analytics with a calm API.',
      bullets: ['p98 < 400ms', 'Streaming exports with backpressure', 'Type‑safe SDK + OpenAPI'],
      stack: ['Next.js', 'Edge', 'ClickHouse', 'TypeScript'],
      link: '/projects',
    },
    {
      title: 'Kohi UI — Design System',
      tagline: 'Tokens, primitives, and accessible patterns.',
      bullets: ['Light/dark/high-contrast', 'Keyboard-first', 'Docs with guidance'],
      stack: ['Tailwind', 'Radix', 'Storybook'],
      link: '/projects',
    },
  ],
  education: [
    {
      school: 'Your University',
      degree: 'B.Sc. Computer Science',
      period: '—',
      details: ['Focus: systems, databases, human-computer interaction'],
    },
  ],
}