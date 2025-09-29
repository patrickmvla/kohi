// src/components/reading/CurrentlyReading.tsx
import type { ReadingItem } from '@/lib/reading'
import ReadingCard from './ReadingCard'

export default function CurrentlyReading({ items }: { items: ReadingItem[] }) {
  const current = items.filter((i) => i.status === 'reading')
  if (current.length === 0) return null

  return (
    <section className="section">
      <div className="container">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold">Currently reading</h2>
            <p className="mt-2 max-w-2xl text-sm text-zinc-400">A snapshot of what’s open on the desk right now.</p>
          </div>
        </div>

        {/* Mobile shelf */}
        <div className="mt-6 -mx-1 flex gap-3 overflow-x-auto px-1 sm:hidden">
          {current.map((item) => (
            <div key={item.slug} className="min-w-[20rem] shrink-0">
              <ReadingCard item={item} />
            </div>
          ))}
        </div>

        {/* Desktop grid */}
        <div className="mt-6 hidden gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-3">
          {current.map((item) => (
            <ReadingCard key={item.slug} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}