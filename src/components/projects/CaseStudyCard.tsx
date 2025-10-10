// src/components/projects/CaseStudyCard.tsx
import Link from "next/link";
import { Check, ExternalLink, Code2, ArrowRight } from "lucide-react";
import ProjectMedia from "./ProjectMedia";
import type { CaseStudy } from "@/lib/case-studies";

export default function CaseStudyCard({ cs }: { cs: CaseStudy }) {
  const href = `/projects/${cs.slug}`;

  return (
    <article className="group relative rounded-xl border border-white/10 bg-white/[0.04] p-5 transition-colors hover:border-white/20 focus-within:border-brand-600/40">
      {/* Media links to detail */}
      <Link href={href} className="block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">
        <ProjectMedia title={cs.title} image={cs.image} icon={cs.icon} ratioClass="aspect-[16/9]" />
      </Link>

      {/* Meta */}
      <div className="mt-3 text-xs text-zinc-500">
        <span>{cs.period}</span>
        <span className="px-2 text-zinc-600" aria-hidden="true">•</span>
        <span>{cs.role}</span>
        <span className="px-2 text-zinc-600" aria-hidden="true">•</span>
        <span>{cs.category}</span>
      </div>

      {/* Title links to detail */}
      <h3 className="mt-1 text-lg font-semibold tracking-tight">
        <Link
          href={href}
          className="inline-flex items-center gap-1 rounded text-zinc-100 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          aria-label={`Open case study: ${cs.title}`}
        >
          {cs.title}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none" aria-hidden="true" />
        </Link>
      </h3>

      {/* Tagline + summary (optional if you show them in grid) */}
      {("tagline" in cs && cs.tagline) ? <p className="text-sm text-brand-300">{cs.tagline}</p> : null}
      <p className="mt-2 text-sm text-zinc-400">{cs.summary}</p>

      {/* Stack */}
      <div className="mt-3 flex flex-wrap gap-2 text-xs text-zinc-400">
        {cs.stack.slice(0, 6).map((s) => (
          <span key={s} className="rounded border border-white/10 px-2 py-0.5 transition-colors hover:border-white/20">
            {s}
          </span>
        ))}
      </div>

      {/* Highlights (short) */}
      {cs.highlights?.length ? (
        <ul className="mt-3 space-y-1 text-sm text-zinc-300">
          {cs.highlights.slice(0, 2).map((h) => (
            <li key={h} className="flex items-start gap-2">
              <Check className="mt-0.5 size-4 text-brand-400" aria-hidden="true" />
              <span>{h}</span>
            </li>
          ))}
        </ul>
      ) : null}

      {/* Secondary CTAs */}
      <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
        {cs.links?.live && (
          <a
            href={cs.links.live}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded text-brand-400 hover:text-brand-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            aria-label={`Open ${cs.title} live site in a new tab`}
          >
            Live
            <ExternalLink className="size-4" aria-hidden="true" />
          </a>
        )}
        {cs.links?.code && (
          <a
            href={cs.links.code}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded text-zinc-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            aria-label={`View ${cs.title} code`}
          >
            Code
            <Code2 className="size-4" aria-hidden="true" />
          </a>
        )}
      </div>
    </article>
  );
}