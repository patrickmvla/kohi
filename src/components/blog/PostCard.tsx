import Link from 'next/link'
import type { Post } from '@/lib/posts'

export default function PostCard({ post }: { post: Post }) {
  const date = new Date(post.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: '2-digit' })
  return (
    <article className="group rounded-xl surface p-4 transition hover:border-white/20">
      <div className="aspect-[16/9] overflow-hidden rounded-lg border border-white/10 bg-gradient-to-br from-white/10 to-transparent">
        {post.cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={post.cover} alt={post.title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]" />
        ) : <div className="h-full w-full" />}
      </div>
      <div className="mt-3 text-xs text-zinc-500">{date} · {post.readingTime ?? 6} min read</div>
      <h3 className="mt-1 text-lg font-semibold tracking-tight">
        <Link href={`/blog/${post.slug}`} className="hover:underline">{post.title}</Link>
      </h3>
      <p className="mt-2 text-sm text-zinc-400">{post.excerpt}</p>
      {post.tags?.length ? (
        <div className="mt-3 flex flex-wrap gap-2 text-xs text-zinc-400">
          {post.tags.map(t => (
            <span key={t} className="rounded-md border border-white/10 px-2 py-0.5">{t}</span>
          ))}
        </div>
      ) : null}
      <div className="mt-4">
        <Link href={`/blog/${post.slug}`} className="text-brand-400 hover:text-brand-300">Read →</Link>
      </div>
    </article>
  )
}