/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { useId } from "react";
import ProjectMedia from "@/components/projects/ProjectMedia";
import { ArrowRight, ExternalLink, Code2, Check, TrendingUp } from "lucide-react";
import type { ResolvedCaseStudy } from "@/lib/data";

type Props = { cs: ResolvedCaseStudy };

function isExternal(url: string) {
  return /^https?:\/\//.test(url);
}

export default function CaseStudyCard({ cs }: Props) {
  const titleId = useId();
  const href = `/projects/${cs.slug}`;
  const stats = (cs as any).stats as { label: string; value: string }[] | undefined;

  return (
    <article
      className="group grid gap-6 rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-colors hover:border-white/20 focus-within:border-brand-600/40 sm:grid-cols-5 sm:gap-8 sm:p-6"
      aria-labelledby={titleId}
    >
      {/* Text column */}
      <div className="sm:col-span-3">
        <h3 id={titleId} className="text-xl font-semibold tracking-tight">
          <Link
            href={href}
            className="inline-flex items-center gap-1 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            aria-label={`Open case study: ${cs.title}`}
          >
            {cs.title}
            <ArrowRight
              className="size-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none"
              aria-hidden="true"
            />
          </Link>
        </h3>

        {cs.tagline && <p className="mt-1 text-sm text-brand-300">{cs.tagline}</p>}
        <p className="mt-2 text-sm text-zinc-400">{cs.summary}</p>

        {/* Meta chips */}
        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-zinc-400">
          <span className="rounded border border-white/10 px-2 py-1 text-zinc-300">{cs.role}</span>
          {cs.period && <span className="rounded border border-white/10 px-2 py-1">{cs.period}</span>}
          {"category" in cs && cs.category && (
            <span className="rounded border border-white/10 px-2 py-1">{cs.category}</span>
          )}
          {cs.stack.slice(0, 6).map((t) => (
            <span key={t} className="rounded border border-white/10 px-2 py-1">
              {t}
            </span>
          ))}
        </div>

        {/* Highlights */}
        {cs.highlights?.length ? (
          <ul className="mt-5 space-y-2 text-sm text-zinc-300">
            {cs.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2 leading-relaxed">
                <Check className="mt-0.5 size-4 text-brand-400" aria-hidden="true" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        ) : null}

        {/* Impact (optional) */}
        {cs.impact?.length ? (
          <ul className="mt-4 space-y-1 text-sm text-brand-300">
            {cs.impact.map((m) => (
              <li key={m} className="flex items-center gap-2">
                <TrendingUp className="size-4" aria-hidden="true" />
                <span>{m}</span>
              </li>
            ))}
          </ul>
        ) : null}

        {/* Stats or metrics (compact) */}
        {Array.isArray(stats) && stats.length > 0 ? (
          <ul className="mt-4 flex flex-wrap gap-2 text-[11px] text-brand-300">
            {stats.slice(0, 2).map((m, i) => (
              <li key={`${m.label}-${i}`} className="rounded border border-white/10 px-2 py-1">
                {m.label}: {m.value}
              </li>
            ))}
          </ul>
        ) : cs.metrics?.length ? (
          <ul className="mt-4 flex flex-wrap gap-2 text-[11px] text-brand-300">
            {cs.metrics.slice(0, 3).map((m, i) => (
              <li key={`${m}-${i}`} className="rounded border border-white/10 px-2 py-1">
                {m}
              </li>
            ))}
          </ul>
        ) : null}

        {/* Secondary CTAs */}
        <div className="mt-5 flex flex-wrap items-center gap-4 text-sm">
          {cs.links?.live && (
            <a
              className="inline-flex items-center gap-1 rounded text-brand-400 hover:text-brand-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              href={cs.links.live}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${cs.title} live site in a new tab`}
            >
              Live
              <ExternalLink className="size-4" aria-hidden="true" />
            </a>
          )}
          {cs.links?.code && (
            <a
              className="inline-flex items-center gap-1 rounded text-zinc-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              href={cs.links.code}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${cs.title} code repository in a new tab`}
            >
              Code
              <Code2 className="size-4" aria-hidden="true" />
            </a>
          )}
          {cs.links?.caseStudy &&
            (isExternal(cs.links.caseStudy) ? (
              <a
                className="inline-flex items-center gap-1 rounded text-zinc-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                href={cs.links.caseStudy}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Read external write‑up for ${cs.title}`}
              >
                Full write‑up
                <ExternalLink className="size-4" aria-hidden="true" />
              </a>
            ) : (
              <Link
                className="inline-flex items-center gap-1 rounded text-zinc-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                href={cs.links.caseStudy}
                aria-label={`Read the ${cs.title} case study`}
              >
                Case study
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            ))}
        </div>
      </div>

      {/* Media column (clickable) */}
      <div className="sm:col-span-2">
        <Link
          href={href}
          className="block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
          aria-label={`Open case study: ${cs.title}`}
        >
          <div className="aspect-[4/3] overflow-hidden rounded-xl border border-white/10 bg-white/5">
            <ProjectMedia title={cs.title} image={cs.image} icon={cs.icon} ratioClass="aspect-[4/3]" />
          </div>
          <span className="sr-only">{cs.title} preview</span>
        </Link>
      </div>
    </article>
  );
}