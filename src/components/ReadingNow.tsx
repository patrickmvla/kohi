// src/components/ReadingNow.tsx
export type Book = {
  title: string
  author: string
  cover?: string
  progress?: number // 0-100
}

import CoverImage from '@/components/ui/CoverImage'

export default function ReadingNow({ books }: { books: Book[] }) {
  return (
    <section id="reading" className="section">
      <div className="container">
        <h2 className="text-2xl font-semibold">What I’m reading</h2>
        <p className="mt-2 max-w-2xl text-sm text-zinc-400">Papers and books shaping my current thinking.</p>

        {/* Mobile: horizontal shelf */}
        <div className="mt-6 -mx-1 flex gap-3 overflow-x-auto px-1 sm:hidden">
          {books.map((b) => (
            <div key={b.title} className="min-w-[14rem] shrink-0 rounded-xl surface p-4">
              <div className="flex items-start gap-4">
                <CoverImage src={b.cover} alt={`${b.title} cover`} widthClass="w-16" />
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold">{b.title}</div>
                  <div className="mt-0.5 text-xs text-zinc-400">{b.author}</div>
                </div>
              </div>
              {typeof b.progress === 'number' && (
                <div className="mt-3">
                  <div className="h-1.5 w-full rounded-full bg-white/10">
                    <div className="h-1.5 rounded-full bg-brand-600" style={{ width: `${b.progress}%` }} />
                  </div>
                  <div className="mt-1 text-xs text-zinc-500">{b.progress}%</div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Desktop grid */}
        <div className="mt-6 hidden gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-3">
          {books.map((b) => (
            <div key={b.title} className="rounded-xl surface p-4">
              <div className="flex items-start gap-4">
                <CoverImage src={b.cover} alt={`${b.title} cover`} widthClass="w-16" />
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold">{b.title}</div>
                  <div className="mt-0.5 text-xs text-zinc-400">{b.author}</div>
                  {typeof b.progress === 'number' && (
                    <div className="mt-3">
                      <div className="h-1.5 w-full rounded-full bg-white/10">
                        <div className="h-1.5 rounded-full bg-brand-600" style={{ width: `${b.progress}%` }} />
                      </div>
                      <div className="mt-1 text-xs text-zinc-500">{b.progress}%</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}