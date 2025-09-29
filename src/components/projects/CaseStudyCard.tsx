// components/projects/CaseStudyCard.tsx
import type { CaseStudy } from '@/lib/case-studies'

export default function CaseStudyCard({ cs }: { cs: CaseStudy }) {
  return (
    <article className="group rounded-xl surface p-4 transition hover:border-white/20">
      <div className="aspect-[16/9] overflow-hidden rounded-lg border border-white/10 bg-gradient-to-br from-white/10 to-transparent">
        {cs.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={cs.image} alt={cs.title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]" />
        ) : (
          <div className="h-full w-full" />
        )}
      </div>

      <div className="mt-3 text-xs text-zinc-500">{cs.period} · {cs.role} · {cs.category}</div>
      <h3 className="mt-1 text-lg font-semibold tracking-tight">{cs.title}</h3>
      <p className="mt-1 text-sm text-brand-300">{cs.tagline}</p>
      <p className="mt-2 text-sm text-zinc-400">{cs.summary}</p>

      <div className="mt-3 flex flex-wrap gap-2 text-xs text-zinc-400">
        {cs.stack.slice(0, 6).map(s => (
          <span key={s} className="rounded border border-white/10 px-2 py-0.5">{s}</span>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-4 text-sm">
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
        {cs.links?.caseStudy && (
          <a className="text-zinc-400 hover:text-white" href={cs.links.caseStudy}>
            Case study →
          </a>
        )}
      </div>
    </article>
  )
}