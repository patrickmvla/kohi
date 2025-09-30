// src/lib/case-studies.ts
export type CaseStudy = {
  slug: string
  title: string
  tagline: string
  summary: string
  role: string
  period: string
  category: 'Product' | 'Systems' | 'Tooling' | 'Open Source'
  stack: string[]
  featured?: boolean
  highlights: string[]
  metrics?: string[]
  image?: string
  icon?: string // Lucide icon name, e.g., 'Mail', 'Link', 'FileText', 'Wand2'
  links?: { live?: string; code?: string; caseStudy?: string }
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'prompt-studio',
    title: 'Prompt Studio',
    tagline: 'LLM prompt engineering with measurable rigor.',
    summary:
      'Specialized environment for building and testing high‑fidelity prompts with verifiable metrics, adversarial suites, and cost analysis.',
    role: 'Indie Project',
    period: '2025',
    category: 'Product',
    stack: ['Next.js', 'OpenAI', 'Embeddings (Jina)', 'Postgres'],
    featured: true,
    highlights: [
      'Adversarial testing with “Strictness Score” (99% constraint adherence)',
      'Semantic validation for intent alignment',
      'Real‑time collaboration + session persistence',
    ],
    metrics: ['Tracked prompt cost and coverage across suites'],
    icon: 'Wand2',
    links: { live: '#', code: '#' },
  },
  {
    slug: 'ai-gmail-sorter',
    title: 'AI Gmail Sorter',
    tagline: 'Intelligent email automation.',
    summary:
      'Headless AI agent learns email patterns and organizes inboxes with high accuracy. Event‑driven and resilient at scale.',
    role: 'Indie Project',
    period: '2025',
    category: 'Product',
    stack: ['TensorFlow.js', 'Node.js', 'Gmail API', 'GCP Pub/Sub'],
    highlights: [
      'Bi‑LSTM model for real‑time classification',
      'Event‑driven pipeline (<100ms)',
      '24/7 service handling 1,000+ emails/day',
    ],
    metrics: ['~95% classification accuracy'],
    icon: 'Mail',
    links: { live: '#', code: '#' },
  },
  {
    slug: 'linklift',
    title: 'LinkLift',
    tagline: 'Production‑grade URL shortener on the edge.',
    summary:
      'Sub‑millisecond redirects with real‑time analytics, custom domains, QR codes, and expiry support.',
    role: 'Indie Project',
    period: '2025',
    category: 'Product',
    stack: ['Vercel Edge', 'Next.js', 'Redis', 'Workers/Queues'],
    highlights: [
      'Sub‑ms redirects, per‑link analytics',
      'Custom domains + QR codes + expiration',
      'Queue‑backed analytics, 99.9% uptime',
    ],
    metrics: ['1M+ clicks tracked'],
    icon: 'Link',
    links: { live: '#', code: '#' },
  },
  {
    slug: 'pdf2md',
    title: 'pdf2md',
    tagline: 'Privacy‑first PDF → Markdown converter.',
    summary:
      'All processing in the browser. Drag‑and‑drop batch conversion with progress and offline PWA.',
    role: 'Indie Project',
    period: '2025',
    category: 'Tooling',
    stack: ['PWA', 'Web Workers', 'React', 'Next.js'],
    highlights: [
      'Client‑side only — 100% privacy (no uploads)',
      'Batch conversion with live progress',
      'Offline support via PWA',
    ],
    icon: 'FileText',
    links: { live: '#', code: '#' },
  },
]