import Link from 'next/link'
import type { Post } from '@/lib/posts'

export default function FeaturedPost({ post }: { post: Post }) {
  const date = new Date(post.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: '2-digit' })
  return (
    <article className="grid gap-6 rounded-2xl surface p-6 sm:grid-cols-5 sm:gap-8">
      <div className="sm:col-span-3">
        <div className="text-xs text-zinc-500">{date} · {post.readingTime ?? 6} min read</div>
        <h2 className="mt-1 text-2xl font-bold tracking-tight">
          <Link href={`/blog/${post.slug}`} className="hover:underline">{post.title}</Link>
        </h2>
        <p className="mt-3 text-zinc-300">{post.excerpt}</p>
        {post.tags?.length ? (
          <div className="mt-4 flex flex-wrap gap-2 text-xs text-zinc-400">
            {post.tags.map(t => (
              <span key={t} className="rounded border border-white/10 px-2 py-1">{t}</span>
            ))}
          </div>
        ) : null}
        <div className="mt-6">
          <Link href={`/blog/${post.slug}`} className="text-brand-400 hover:text-brand-300">Read →</Link>
        </div>
      </div>
      <div className="sm:col-span-2">
        <div className="aspect-[4/3] overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent">
          {post.cover ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={post.cover} alt={post.title} className="h-full w-full object-cover" />
          ) : <div className="h-full w-full" />}
        </div>
      </div>
    </article>
  )
}