// src/components/reading/ReadingCard.tsx
import type { ReadingItem } from '@/lib/reading'

function Stars({ rating = 0 }: { rating?: number }) {
  const full = Math.round(rating)
  return (
    <div className="flex items-center gap-0.5" aria-label={`Rating: ${full} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < full ? 'text-amber-400' : 'text-zinc-600'}>★</span>
      ))}
    </div>
  )
}

export default function ReadingCard({ item }: { item: ReadingItem }) {
  return (
    <article className="group rounded-xl surface p-4 transition hover:border-white/20">
      <div className="flex gap-4">
        <div className="h-24 w-18 min-w-18 overflow-hidden rounded-md border border-white/10 bg-white/5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.cover || '/images/reading/placeholder.jpg'}
            alt={`${item.title} cover`}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500">
            <span className="rounded border border-white/10 px-2 py-0.5">{item.type}</span>
            <span className={`rounded border px-2 py-0.5 ${item.status === 'reading' ? 'border-brand-600 text-white' : 'border-white/10 text-zinc-400'}`}>
              {item.status}
            </span>
            {item.dateFinished && <span className="rounded border border-white/10 px-2 py-0.5">{new Date(item.dateFinished).toLocaleDateString()}</span>}
            {item.dateStarted && item.status === 'reading' && <span className="rounded border border-white/10 px-2 py-0.5">since {new Date(item.dateStarted).toLocaleDateString()}</span>}
          </div>

          <h3 className="mt-1 truncate text-base font-semibold tracking-tight">{item.title}</h3>
          <p className="truncate text-sm text-zinc-400">{item.author}</p>

          {/* Progress or rating */}
          {typeof item.progress === 'number' ? (
            <div className="mt-3">
              <div className="h-1.5 w-full rounded-full bg-white/10">
                <div className="h-1.5 rounded-full bg-brand-600" style={{ width: `${item.progress}%` }} />
              </div>
              <div className="mt-1 text-xs text-zinc-500">{item.progress}%</div>
            </div>
          ) : item.status === 'finished' && typeof item.rating === 'number' ? (
            <div className="mt-2"><Stars rating={item.rating} /></div>
          ) : null}

          {/* Tags + link */}
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-zinc-400">
            {item.tags?.map((t) => (
              <span key={t} className="rounded-md border border-white/10 px-2 py-0.5">{t}</span>
            ))}
            {item.link && (
              <a href={item.link} target="_blank" rel="noreferrer" className="ml-auto text-brand-400 hover:text-brand-300">
                Source →
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}