// src/lib/posts.ts
export type Post = {
  slug: string
  title: string
  date: string // ISO date, e.g. '2025-06-10'
  excerpt: string
  tags: string[]
  readingTime?: number
  featured?: boolean
  cover?: string
}

export const posts: Post[] = [
  {
    slug: 'latency-budgets',
    title: 'Latency budgets and graceful degradation',
    date: '2025-06-10',
    excerpt: 'Why budgets beat averages, and how to defend the 99th percentile without overbuilding.',
    tags: ['performance', 'edge'],
    readingTime: 9,
    featured: true,
    cover: '/images/blog/latency-budgets.jpg',
  },
  {
    slug: 'apis-that-feel-inevitable',
    title: 'Designing APIs that feel inevitable',
    date: '2025-05-12',
    excerpt: 'The small constraints that make an API feel obvious and hard to misuse.',
    tags: ['api', 'dx', 'design'],
    readingTime: 7,
    featured: true,
    cover: '/images/blog/apis-inevitable.jpg',
  },
  {
    slug: 'ship-speed-without-debt',
    title: 'Ship speed without debt',
    date: '2025-03-28',
    excerpt: 'Pacing, risk windows, and using tests as a conversation.',
    tags: ['process'],
    readingTime: 6,
    cover: '/images/blog/ship-speed.jpg',
  },
]