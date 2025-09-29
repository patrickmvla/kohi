// src/components/reading/ReadingExplorer.tsx
'use client'

import { useMemo, useState } from 'react'
import type { ReadingItem } from '@/lib/reading'
import ReadingCard from './ReadingCard'

type Sort = 'recent' | 'alpha' | 'progress' | 'rating'

export default function ReadingExplorer({ items }: { items: ReadingItem[] }) {
  const [q, setQ] = useState('')
  const [types, setTypes] = useState<Set<ReadingItem['type']>>(new Set())
  const [statuses, setStatuses] = useState<Set<ReadingItem['status']>>(new Set())
  const [sort, setSort] = useState<Sort>('recent')

  const allTypes = useMemo(() => Array.from(new Set(items.map(i => i.type))).sort(), [items])
  const allStatuses = useMemo(() => Array.from(new Set(items.map(i => i.status))).sort(), [items])

  const filtered = useMemo(() => {
    const norm = (s: string) => s.toLowerCase().trim()
    const query = norm(q)
    let list = items.filter(i => {
      const matchesQuery =
        !query ||
        norm(i.title).includes(query) ||
        norm(i.author).includes(query) ||
        i.tags?.some(t => norm(t).includes(query))
      const matchesType = types.size === 0 || types.has(i.type)
      const matchesStatus = statuses.size === 0 || statuses.has(i.status)
      return matchesQuery && matchesType && matchesStatus
    })

    const toDate = (i: ReadingItem) =>
      i.dateFinished || i.dateStarted || '1970-01-01'

    if (sort === 'alpha') {
      list = list.slice().sort((a, b) => a.title.localeCompare(b.title))
    } else if (sort === 'progress') {
      list = list.slice().sort((a, b) => (b.progress ?? 0) - (a.progress ?? 0))
    } else if (sort === 'rating') {
      list = list.slice().sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
    } else {
      list = list.slice().sort((a, b) => +new Date(toDate(b)) - +new Date(toDate(a)))
    }
    return list
  }, [items, q, types, statuses, sort])

  const toggle = <T extends string>(set: (fn: (prev: Set<T>) => Set<T>) => void) =>
    (val: T) =>
      set(prev => {
        const next = new Set(prev)
        next.has(val) ? next.delete(val) : next.add(val)
        return next
      })

  const toggleType = toggle<ReadingItem['type']>(setTypes)
  const toggleStatus = toggle<ReadingItem['status']>(setStatuses)

  const clear = () => {
    setQ('')
    setTypes(new Set())
    setStatuses(new Set())
    setSort('recent')
  }

  return (
    <section className="section">
      <div className="container">
        <div className="sticky top-14 z-10 rounded-lg border border-white/10 bg-black/60 p-3 backdrop-blur">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex w-full items-center gap-2 sm:max-w-md">
              <label htmlFor="search" className="sr-only">Search reading</label>
              <input
                id="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search by title, author, or tag…"
                className="w-full rounded-md border border-white/10 bg-transparent px-3 py-2 text-sm outline-none ring-brand-600 focus:ring-2"
              />
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <label htmlFor="sort" className="text-xs text-zinc-500">Sort</label>
                <select
                  id="sort"
                  value={sort}
                  onChange={(e) => setSort(e.target.value as Sort)}
                  className="rounded-md border border-white/10 bg-transparent px-2 py-1 text-xs outline-none ring-brand-600 focus:ring-2"
                >
                  <option value="recent">Recent</option>
                  <option value="alpha">A–Z</option>
                  <option value="progress">Progress</option>
                  <option value="rating">Rating</option>
                </select>
              </div>

              {(q || types.size > 0 || statuses.size > 0 || sort !== 'recent') && (
                <button onClick={clear} className="text-xs text-zinc-400 hover:text-white">
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Type chips */}
          <div className="mt-3 flex items-center gap-2 overflow-x-auto">
            {allTypes.map(t => {
              const active = types.has(t)
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => toggleType(t)}
                  aria-pressed={active}
                  className={`whitespace-nowrap rounded-full border px-3 py-1 text-xs ${active ? 'border-brand-600 bg-brand-600/10 text-white' : 'border-white/10 text-zinc-400 hover:text-white'}`}
                >
                  {t}
                </button>
              )
            })}
          </div>

          {/* Status chips */}
          <div className="mt-2 flex items-center gap-2 overflow-x-auto">
            {allStatuses.map(s => {
              const active = statuses.has(s)
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => toggleStatus(s)}
                  aria-pressed={active}
                  className={`whitespace-nowrap rounded-full border px-3 py-1 text-xs ${active ? 'border-brand-600 bg-brand-600/10 text-white' : 'border-white/10 text-zinc-400 hover:text-white'}`}
                >
                  {s}
                </button>
              )
            })}
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="mt-8 text-sm text-zinc-400">No items match your filters.</p>
        ) : (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map(item => (
              <ReadingCard key={item.slug} item={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}