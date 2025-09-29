// components/BlogTeaser.tsx
export type Post = {
  title: string
  slug: string
  date: string
  excerpt: string
  tags?: string[]
}

export default function BlogTeaser({ posts, limit = 3 }: { posts: Post[]; limit?: number }) {
  const list = posts.slice(0, limit)
  return (
    <section id="blog" className="section">
      <div className="container">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold">Writing</h2>
            <p className="mt-2 max-w-2xl text-sm text-zinc-400">
              Notes on building, measuring, and keeping systems simple.
            </p>
          </div>
          <a href="/blog" className="text-sm text-brand-400 hover:text-brand-300">All posts →</a>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <a key={p.slug} href={`/blog/${p.slug}`} className="group rounded-xl surface p-4 transition">
              <div className="text-xs text-zinc-500">{p.date}</div>
              <h3 className="mt-2 text-lg font-semibold group-hover:text-white">{p.title}</h3>
              <p className="mt-2 text-sm text-zinc-400">{p.excerpt}</p>
              {p.tags?.length ? (
                <div className="mt-3 flex flex-wrap gap-2 text-xs text-zinc-400">
                  {p.tags.map((t) => (
                    <span key={t} className="rounded-md border border-white/10 px-2 py-0.5">{t}</span>
                  ))}
                </div>
              ) : null}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}