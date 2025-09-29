// src/app/blog/page.tsx
import type { Metadata } from 'next'
import BlogHero from '@/components/blog/BlogHero'
import FeaturedPost from '@/components/blog/FeaturedPost'
import BlogExplorer from '@/components/blog/BlogExplorer'
import { posts } from '@/lib/posts'

export const metadata: Metadata = {
  title: 'Blog — kohi',
  description: 'Essays and field notes on building calm, reliable software.',
}

export default async function BlogPage() {
  const featured = posts.filter(p => p.featured).slice(0, 2)
  const rest = posts.filter(p => !p.featured)

  return (
    <main>
      <BlogHero />
      {featured.length > 0 && (
        <section aria-labelledby="featured" className="section">
          <div className="container">
            <div className="flex items-end justify-between gap-4">
              <h2 id="featured" className="text-2xl font-semibold">Featured</h2>
              <a href="/rss.xml" className="text-sm text-brand-400 hover:text-brand-300">RSS →</a>
            </div>
            <div className="mt-6 grid gap-6">
              {featured.map(p => (
                <FeaturedPost key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}
      <BlogExplorer posts={rest} />
    </main>
  )
}