// src/components/projects/FeaturedCaseStudy.tsx
import type { CaseStudy } from '@/lib/case-studies'
import ProjectMedia from './ProjectMedia'

export default function FeaturedCaseStudy({ cs }: { cs: CaseStudy }) {
  return (
    <section aria-labelledby="featured" className="section">
      <div className="container">
        <h2 id="featured" className="text-2xl font-semibold">Featured</h2>

        <article className="mt-6 grid gap-6 rounded-2xl surface p-6 sm:grid-cols-5 sm:gap-8">
          <div className="sm:col-span-3">
            <div className="text-xs text-zinc-500">{cs.period} · {cs.role} · {cs.category}</div>
            <h3 className="mt-1 text-2xl font-bold tracking-tight">{cs.title}</h3>
            <p className="mt-2 text-sm text-brand-300">{cs.tagline}</p>
            <p className="mt-4 text-zinc-300">{cs.summary}</p>

            <ul className="mt-5 space-y-2 text-sm text-zinc-300">
              {cs.highlights.map(h => <li key={h}>— {h}</li>)}
            </ul>

            {cs.metrics?.length ? (
              <ul className="mt-4 flex flex-wrap gap-3 text-sm text-brand-300">
                {cs.metrics.map(m => <li key={m} className="rounded border border-white/10 px-2 py-1">{m}</li>)}
              </ul>
            ) : null}

            <div className="mt-6 flex flex-wrap gap-4 text-sm">
              {cs.links?.caseStudy && <a className="text-zinc-400 hover:text-white" href={cs.links.caseStudy}>Case study →</a>}
              {cs.links?.live && <a className="text-brand-400 hover:text-brand-300" href={cs.links.live} target="_blank" rel="noreferrer">Live →</a>}
              {cs.links?.code && <a className="text-zinc-400 hover:text-white" href={cs.links.code} target="_blank" rel="noreferrer">Code →</a>}
            </div>
          </div>

          <div className="sm:col-span-2">
            <ProjectMedia title={cs.title} image={cs.image} icon={cs.icon} ratioClass="aspect-[4/3]" />
            <div className="mt-4 flex flex-wrap gap-2 text-xs text-zinc-400">
              {cs.stack.map(s => <span key={s} className="rounded border border-white/10 px-2 py-1">{s}</span>)}
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}