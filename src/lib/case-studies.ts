// lib/case-studies.ts
export type CaseStudy = {
  slug: string
  title: string
  tagline: string
  summary: string
  role: string
  period: string // e.g., '2025' or '2024–2025'
  category: 'Product' | 'Systems' | 'Tooling' | 'Open Source'
  stack: string[]
  featured?: boolean
  highlights: string[]
  metrics?: string[]
  image?: string
  links?: { live?: string; code?: string; caseStudy?: string }
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'realtime-analytics',
    title: 'Realtime Analytics Platform',
    tagline: 'Sub‑second analytics with a calm API.',
    summary:
      'Built a sub‑second analytics layer backed by columnar storage and edge caching. Tight focus on correctness, latency, and an ergonomic SDK users could trust.',
    role: 'Lead Engineer',
    period: '2024–2025',
    category: 'Product',
    stack: ['Next.js', 'Edge', 'ClickHouse', 'TypeScript'],
    featured: true,
    highlights: [
      'Query planner with p98 < 400ms',
      'Streaming exports with backpressure',
      'Type‑safe client SDK + OpenAPI',
    ],
    metrics: ['-42% infra cost vs prior gen', 'NPS +21'],
    image: '/images/case-analytics.jpg',
    links: { live: '#', code: '#', caseStudy: '#' },
  },
  {
    slug: 'kohi-ui',
    title: 'Kohi UI — Design System',
    tagline: 'Tokens, primitives, and accessible patterns.',
    summary:
      'A cohesive UI kit that aligned product surfaces and reduced UX friction. Shipped tokens, primitives, and guidance that stuck.',
    role: 'Systems',
    period: '2023–2024',
    category: 'Systems',
    stack: ['Tailwind', 'Radix', 'Storybook'],
    highlights: [
      'Tokenized themes (light/dark/high-contrast)',
      'Keyboard-first components',
      'Usage docs + pitfalls',
    ],
    metrics: ['30% faster feature delivery', 'Fewer UI regressions'],
    image: '/images/case-ds.jpg',
    links: { code: '#', caseStudy: '#' },
  },
  {
    slug: 'payments-orchestration',
    title: 'Payments Orchestration',
    tagline: 'Resilient flows, friendly APIs.',
    summary:
      'Unified multiple processors behind a stable API. Idempotency, retries, and observability made failure boring.',
    role: 'Senior Engineer',
    period: '2024',
    category: 'Product',
    stack: ['Node', 'Postgres', 'Temporal', 'OpenTelemetry'],
    highlights: ['Sagas for multi-step flows', 'Circuit breaking + backoff', 'Fine-grained audit logs'],
    metrics: ['-63% failed chargebacks', '99.98% success rate'],
    image: '/images/case-payments.jpg',
    links: { caseStudy: '#' },
  },
  {
    slug: 'oss-test-runner',
    title: 'OSS Test Runner',
    tagline: 'Fast, minimal, delightful to use.',
    summary:
      'Open-source test runner with crisp output and zero-config ergonomics. Focused on speed, DX, and portable primitives.',
    role: 'Maintainer',
    period: '2023–2025',
    category: 'Open Source',
    stack: ['TypeScript', 'ESBuild', 'Node'],
    highlights: ['Worker pool + snapshot isolation', 'Watch mode that respects git intent', 'Readable diffs'],
    metrics: ['~2.3x faster than baseline'],
    image: '/images/case-oss.jpg',
    links: { code: '#', caseStudy: '#' },
  },
  {
    slug: 'schema-inspector',
    title: 'Schema Inspector',
    tagline: 'Developer tools for confidence.',
    summary:
      'A schema diff and migration tool that keeps teams confident. Highlights breaking changes and suggests safe paths.',
    role: 'Engineer',
    period: '2024',
    category: 'Tooling',
    stack: ['Rust', 'SQLite', 'WASM'],
    highlights: ['AST-based diffs', 'Humanized output', 'CI annotations'],
    image: '/images/case-schema.jpg',
    links: { code: '#', caseStudy: '#' },
  },
  {
    slug: 'data-sync',
    title: 'Edge Data Sync',
    tagline: 'Eventually consistent, practically fast.',
    summary:
      'A sync layer for edge-cacheable data with CRDT-inspired merges. Clear conflict semantics and strong observability.',
    role: 'Engineer',
    period: '2023',
    category: 'Systems',
    stack: ['Edge', 'Redis', 'TypeScript'],
    highlights: ['Conflict handling with vector clocks', 'Observability-first design', 'Backpressure-aware queues'],
    image: '/images/case-sync.jpg',
    links: { caseStudy: '#' },
  },
]