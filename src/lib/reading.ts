// src/lib/reading.ts
export type ReadingItem = {
  slug: string
  title: string
  author: string
  type: 'book' | 'paper' | 'article'
  status: 'reading' | 'finished' | 'queue'
  progress?: number // 0–100
  rating?: number   // 0–5 (when finished)
  dateStarted?: string
  dateFinished?: string
  tags?: string[]
  cover?: string
  link?: string
  notes?: string
}

export const readingItems: ReadingItem[] = [
  {
    slug: 'ai-engineering-chip-huyen',
    title: 'AI Engineering: Building Applications with Foundation Models',
    author: 'Chip Huyen',
    type: 'book',
    status: 'reading',
    // progress: 0, // set if you want a progress bar
    tags: ['ai', 'engineering', 'foundation models'],
    cover:
      'https://s3proxy.cdn-zlib.sk/covers300/collections/userbooks/05f8dcfca1bdd2952022630adc3a7dd8d5c228d030a60761642bb1708585e8d6.jpg',
  },
  {
    slug: 'building-ai-agents-rag-kg',
    title: 'Building AI Agents with LLMs, RAG, and Knowledge Graphs',
    author: 'Salvatore Raieli, Gabriele Iuculano',
    type: 'book',
    status: 'reading',
    // progress: 0,
    tags: ['ai', 'agents', 'rag', 'knowledge-graphs'],
    cover:
      'https://s3proxy.cdn-zlib.sk/covers300/collections/userbooks/b720da43a90b906c18288e51afdfaac52a374e15f61d0cb074ff04768b1162e7.jpg',
  },
  {
    slug: 'learning-sql-alan-beaulieu',
    title: 'Learning SQL',
    author: 'Alan Beaulieu',
    type: 'book',
    status: 'reading',
    // progress: 0,
    tags: ['sql', 'databases'],
    cover:
      'https://s3proxy.cdn-zlib.sk/covers300/collections/genesis/bade985342ac923620e33123525bb2175c490e911719b8e3fbe71a5e539df604.jpg',
  },
  {
    slug: 'linux-command-line-shotts',
    title: 'The Linux Command Line: A Complete Introduction',
    author: 'William E. Shotts',
    type: 'book',
    status: 'reading',
    // progress: 0,
    tags: ['linux', 'cli'],
    cover:
      'https://s3proxy.cdn-zlib.sk/covers300/collections/genesis/188d71a461d0615b361789c68b72051ae2ecb340703ade0f26a8185483dcbb9d.jpg',
  },
]