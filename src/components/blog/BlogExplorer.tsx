// src/components/blog/BlogExplorer.tsx
'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import PostCard from './PostCard'
import type { Post } from '@/lib/posts'

type Sort = 'recent' | 'alpha'

export default function BlogExplorer({ posts }: { posts: Post[] }) {
  const [q, setQ] = useState('')
  const [tags, setTags] = useState<Set<string>>(new Set())
  const [sort, setSort] = useState<Sort>('recent')
  const inputRef = useRef<HTMLInputElement>(null)

  // Focus search on ⌘K / Ctrl+K
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        document.getElementById('blog-filter')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        inputRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const allTags = useMemo(() => {
    const s = new Set<string>()
    posts.forEach((p) => p.tags?.forEach((t) => s.add(t)))
    return Array.from(s).sort((a, b) => a.localeCompare(b))
  }, [posts])

  const filtered = useMemo(() => {
    const norm = (s: string) => s.toLowerCase().trim()
    const query = norm(q)

    let list = posts.filter((p) => {
      const textMatch =
        !query ||
        norm(p.title).includes(query) ||
        norm(p.excerpt).includes(query) ||
        (p.tags?.some((t) => norm(t).includes(query)) ?? false)

      const tagMatch = tags.size === 0 || (p.tags?.some((t) => tags.has(t)) ?? false)
      return textMatch && tagMatch
    })

    if (sort === 'alpha') {
      list = list.slice().sort((a, b) => a.title.localeCompare(b.title))
    } else {
      list = list.slice().sort((a, b) => +new Date(b.date) - +new Date(a.date))
    }
    return list
  }, [posts, q, tags, sort])

  const toggleTag = (t: string) => {
    setTags((prev) => {
      const next: Set<string> = new Set(prev)
      if (next.has(t)) {
        next.delete(t)
      } else {
        next.add(t)
      }
      return next
    })
  }

  const clear = () => {
    setQ('')
    setTags(new Set())
    setSort('recent')
  }

  return (
    <section className="section">
      <div className="container">
        <div id="blog-filter" className="sticky top-14 z-10 rounded-lg border border-white/10 bg-black/60 p-3 backdrop-blur">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex w-full items-center gap-2 sm:max-w-md">
              <label htmlFor="search" className="sr-only">Search posts</label>
              <input
                id="search"
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search by title, tags, or excerpt…"
                className="w-full rounded-md border border-white/10 bg-transparent px-3 py-2 text-sm outline-none ring-brand-600 focus:ring-2"
              />
              <span className="hidden text-xs text-zinc-500 sm:inline">⌘K</span>
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
                </select>
              </div>

              {(q || tags.size > 0 || sort !== 'recent') && (
                <button onClick={clear} className="text-xs text-zinc-400 hover:text-white">
                  Clear
                </button>
              )}
            </div>
          </div>

          <div className="mt-3 flex items-center gap-2 overflow-x-auto">
            {allTags.map((t) => {
              const active = tags.has(t)
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => toggleTag(t)}
                  aria-pressed={active}
                  className={`whitespace-nowrap rounded-full border px-3 py-1 text-xs ${
                    active ? 'border-brand-600 bg-brand-600/10 text-white' : 'border-white/10 text-zinc-400 hover:text-white'
                  }`}
                >
                  {t}
                </button>
              )
            })}
          </div>

          <div className="mt-2 text-right text-xs text-zinc-500">
            Showing {filtered.length} of {posts.length}
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="mt-8 text-sm text-zinc-400">No posts match your filters.</p>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}