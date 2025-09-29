// components/projects/ProjectsExplorer.tsx
'use client'

import { useMemo, useState } from 'react'
import type { CaseStudy } from '@/lib/case-studies'
import CaseStudyCard from './CaseStudyCard'

type View = 'grid' | 'list'
type Sort = 'recent' | 'alpha'

export default function ProjectsExplorer({ studies }: { studies: CaseStudy[] }) {
  const [q, setQ] = useState('')
  const [categories, setCategories] = useState<Set<string>>(new Set())
  const [view, setView] = useState<View>('grid')
  const [sort, setSort] = useState<Sort>('recent')

  const allCategories = useMemo(
    () => Array.from(new Set(studies.map(s => s.category))),
    [studies]
  )

  const filtered = useMemo(() => {
    const norm = (s: string) => s.toLowerCase().trim()
    const query = norm(q)
    let arr = studies.filter(s => {
      const matchesQuery =
        !query ||
        norm(s.title).includes(query) ||
        norm(s.tagline).includes(query) ||
        norm(s.summary).includes(query) ||
        s.stack.some(t => norm(t).includes(query))
      const matchesCategory = categories.size === 0 || categories.has(s.category)
      return matchesQuery && matchesCategory
    })

    if (sort === 'alpha') {
      arr = arr.slice().sort((a, b) => a.title.localeCompare(b.title))
    } else {
      // naive: parse first 4 digits in period as year
      const year = (p: string) => {
        const m = p.match(/\d{4}/)
        return m ? parseInt(m[0], 10) : 0
      }
      arr = arr.slice().sort((a, b) => year(b.period) - year(a.period))
    }
    return arr
  }, [studies, q, categories, sort])

  const toggleCategory = (c: string) =>
    setCategories(prev => {
      const next = new Set(prev)
      next.has(c) ? next.delete(c) : next.add(c)
      return next
    })

  const clearFilters = () => {
    setQ('')
    setCategories(new Set())
    setSort('recent')
  }

  return (
    <section aria-labelledby="all-projects" className="section">
      <div className="container">
        <div className="sticky top-14 z-10 rounded-lg border border-white/10 bg-black/60 p-3 backdrop-blur">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex w-full items-center gap-2 sm:max-w-md">
              <label htmlFor="search" className="sr-only">Search projects</label>
              <div className="relative w-full">
                <input
                  id="search"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search by title, stack, or summary…"
                  className="w-full rounded-md border border-white/10 bg-transparent px-3 py-2 pr-9 text-sm outline-none ring-brand-600 focus:ring-2"
                />
                <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500">⌘K</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden items-center gap-2 sm:flex">
                <span className="text-xs text-zinc-500">View</span>
                <button
                  type="button"
                  onClick={() => setView('grid')}
                  aria-pressed={view === 'grid'}
                  className={`rounded-md border px-2 py-1 text-xs ${view === 'grid' ? 'border-brand-600 text-white' : 'border-white/10 text-zinc-400 hover:text-white'}`}
                >
                  Grid
                </button>
                <button
                  type="button"
                  onClick={() => setView('list')}
                  aria-pressed={view === 'list'}
                  className={`rounded-md border px-2 py-1 text-xs ${view === 'list' ? 'border-brand-600 text-white' : 'border-white/10 text-zinc-400 hover:text-white'}`}
                >
                  List
                </button>
              </div>

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
                </select>
              </div>

              {(q || categories.size > 0 || sort !== 'recent') && (
                <button onClick={clearFilters} className="text-xs text-zinc-400 hover:text-white">
                  Clear
                </button>
              )}
            </div>
          </div>

          <div className="mt-3 flex items-center gap-2 overflow-x-auto">
            {allCategories.map(c => {
              const active = categories.has(c)
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => toggleCategory(c)}
                  className={`whitespace-nowrap rounded-full border px-3 py-1 text-xs ${active ? 'border-brand-600 bg-brand-600/10 text-white' : 'border-white/10 text-zinc-400 hover:text-white'}`}
                  aria-pressed={active}
                >
                  {c}
                </button>
              )
            })}
          </div>
        </div>

        <h2 id="all-projects" className="sr-only">All projects</h2>

        {filtered.length === 0 ? (
          <p className="mt-8 text-sm text-zinc-400">No projects match your filters.</p>
        ) : view === 'grid' ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map(cs => (
              <CaseStudyCard key={cs.slug} cs={cs} />
            ))}
          </div>
        ) : (
          <div className="mt-8 space-y-4">
            {filtered.map(cs => (
              <div key={cs.slug} className="rounded-xl surface p-4">
                <div className="flex flex-col gap-4 sm:flex-row">
                  <div className="sm:w-64">
                    <div className="aspect-[16/9] overflow-hidden rounded-lg border border-white/10 bg-gradient-to-br from-white/10 to-transparent">
                      {cs.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={cs.image} alt={cs.title} className="h-full w-full object-cover" />
                      ) : <div className="h-full w-full" />}
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs text-zinc-500">{cs.period} · {cs.role} · {cs.category}</div>
                    <h3 className="mt-1 text-lg font-semibold tracking-tight">{cs.title}</h3>
                    <p className="text-sm text-brand-300">{cs.tagline}</p>
                    <p className="mt-2 text-sm text-zinc-400">{cs.summary}</p>
                    <div className="mt-3 flex flex-wrap gap-2 text-xs text-zinc-400">
                      {cs.stack.slice(0, 10).map(s => (
                        <span key={s} className="rounded border border-white/10 px-2 py-0.5">{s}</span>
                      ))}
                    </div>
                    <div className="mt-4 flex flex-wrap gap-4 text-sm">
                      {cs.links?.caseStudy && <a className="text-zinc-400 hover:text-white" href={cs.links.caseStudy}>Case study →</a>}
                      {cs.links?.live && <a className="text-brand-400 hover:text-brand-300" href={cs.links.live} target="_blank" rel="noreferrer">Live →</a>}
                      {cs.links?.code && <a className="text-zinc-400 hover:text-white" href={cs.links.code} target="_blank" rel="noreferrer">Code →</a>}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}