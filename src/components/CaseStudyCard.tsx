export type CaseStudy = {
  title: string
  summary: string
  role: string
  period?: string
  stack: string[]
  highlights: string[]
  impact?: string[]
  image?: string
  links?: { live?: string; code?: string; caseStudy?: string }
}

export default function CaseStudyCard({ cs }: { cs: CaseStudy }) {
  return (
    <article className="group grid gap-6 rounded-2xl surface p-5 sm:grid-cols-5 sm:gap-8 sm:p-6">
      <div className="sm:col-span-3">
        <h3 className="text-xl font-semibold tracking-tight">{cs.title}</h3>
        <p className="mt-2 text-sm text-zinc-400">{cs.summary}</p>

        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-zinc-400">
          <span className="rounded border border-white/10 px-2 py-1 text-zinc-300">{cs.role}</span>
          {cs.period && <span className="rounded border border-white/10 px-2 py-1">{cs.period}</span>}
          {cs.stack.map((t) => (
            <span key={t} className="rounded border border-white/10 px-2 py-1">{t}</span>
          ))}
        </div>

        <ul className="mt-5 space-y-2 text-sm text-zinc-300">
          {cs.highlights.map((h) => (
            <li key={h} className="leading-relaxed">— {h}</li>
          ))}
        </ul>

        {cs.impact && cs.impact.length > 0 && (
          <ul className="mt-4 space-y-1 text-sm text-brand-300">
            {cs.impact.map((m) => (
              <li key={m}>• {m}</li>
            ))}
          </ul>
        )}

        <div className="mt-5 flex flex-wrap gap-4 text-sm">
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
      </div>

      <div className="sm:col-span-2">
        <div className="aspect-[4/3] overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent">
          {/* Replace with <Image /> and a real screenshot */}
          {cs.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={cs.image} alt={cs.title} className="h-full w-full object-cover" />
          ) : (
            <div className="h-full w-full" />
          )}
        </div>
      </div>
    </article>
  )
}