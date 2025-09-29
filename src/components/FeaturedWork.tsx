// components/FeaturedWork.tsx
import Link from 'next/link'
import type { CaseStudy } from '@/lib/case-studies'

export default function FeaturedWork({ cs }: { cs: CaseStudy }) {
  return (
    <section aria-labelledby="featured-work" className="section">
      <div className="container">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 id="featured-work" className="text-2xl font-semibold">Featured work</h2>
            <p className="mt-2 max-w-2xl text-sm text-zinc-400">
              A flagship project with context, constraints, and the decisions in‑between.
            </p>
          </div>
          <Link href="/projects" className="text-sm text-brand-400 hover:text-brand-300">
            All projects →
          </Link>
        </div>

        <article className="mt-6 grid gap-6 rounded-2xl surface p-6 sm:grid-cols-5 sm:gap-8">
          <div className="sm:col-span-3">
            <div className="text-xs text-zinc-500">{cs.period} · {cs.role} · {cs.category}</div>
            <h3 className="mt-1 text-2xl font-bold tracking-tight">{cs.title}</h3>
            <p className="mt-2 text-sm text-brand-300">{cs.tagline}</p>
            <p className="mt-4 text-zinc-300">{cs.summary}</p>

            <ul className="mt-5 space-y-2 text-sm text-zinc-300">
              {cs.highlights.slice(0, 3).map(h => <li key={h}>— {h}</li>)}
            </ul>

            <div className="mt-6 flex flex-wrap gap-4 text-sm">
              {cs.links?.caseStudy && (
                <Link className="text-zinc-400 hover:text-white" href={cs.links.caseStudy}>
                  Case study →
                </Link>
              )}
              {cs.links?.live && (
                <a className="text-brand-400 hover:text-brand-300" href={cs.links.live} target="_blank" rel="noreferrer">
                  Live →
                </a>
              )}
              {cs.links?.code && (
                <a className="text-zinc-400 hover:text-white" href={cs.links.code} target="_blank" rel="noreferrer">
                  Code →
                </a>
              )}
            </div>
          </div>

          <div className="sm:col-span-2">
            <div className="aspect-[4/3] overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent">
              {cs.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={cs.image} alt={cs.title} className="h-full w-full object-cover" />
              ) : <div className="h-full w-full" />}
            </div>
            <div className="mt-4 flex flex-wrap gap-2 text-xs text-zinc-400">
              {cs.stack.map(s => (
                <span key={s} className="rounded border border-white/10 px-2 py-1">{s}</span>
              ))}
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}