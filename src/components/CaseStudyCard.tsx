// src/components/projects/CaseStudyCard.tsx
import Link from "next/link";
import { useId } from "react";
import ProjectMedia from "../components/projects/ProjectMedia";
import { ArrowRight, ExternalLink, Code2, Check, TrendingUp } from "lucide-react";

export type CaseStudy = {
  title: string;
  summary: string;
  role: string;
  period?: string;
  stack: string[];
  highlights: string[];
  impact?: string[];
  image?: string;
  icon?: string; // optional placeholder icon when no image
  links?: { live?: string; code?: string; caseStudy?: string };
};

function isExternal(url: string) {
  return /^https?:\/\//.test(url);
}

export default function CaseStudyCard({ cs }: { cs: CaseStudy }) {
  const titleId = useId();

  // Primary CTA preference: case study → live → code
  const primaryType = cs.links?.caseStudy
    ? "caseStudy"
    : cs.links?.live
    ? "live"
    : cs.links?.code
    ? "code"
    : undefined;

  const primaryHref = (primaryType && cs.links?.[primaryType]) || undefined;

  return (
    <article
      className="group grid gap-6 rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-colors hover:border-white/20 focus-within:border-brand-600/40 sm:grid-cols-5 sm:gap-8 sm:p-6"
      aria-labelledby={titleId}
    >
      {/* Text column */}
      <div className="sm:col-span-3">
        {/* Title (primary CTA if available) */}
        <h3 id={titleId} className="text-xl font-semibold tracking-tight">
          {primaryHref ? (
            isExternal(primaryHref) ? (
              <a
                href={primaryHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              >
                {cs.title}
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none"
                  aria-hidden="true"
                />
              </a>
            ) : (
              <Link
                href={primaryHref}
                className="inline-flex items-center gap-1 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              >
                {cs.title}
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none"
                  aria-hidden="true"
                />
              </Link>
            )
          ) : (
            cs.title
          )}
        </h3>

        {/* Summary */}
        <p className="mt-2 text-sm text-zinc-400">{cs.summary}</p>

        {/* Meta chips */}
        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-zinc-400">
          <span className="rounded border border-white/10 px-2 py-1 text-zinc-300">
            {cs.role}
          </span>
          {cs.period && (
            <span className="rounded border border-white/10 px-2 py-1">
              {cs.period}
            </span>
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

        {/* Secondary CTAs (exclude the one used as primary) */}
        <div className="mt-5 flex flex-wrap items-center gap-4 text-sm">
          {cs.links?.live && primaryType !== "live" && (
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
          {cs.links?.code && primaryType !== "code" && (
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
          {cs.links?.caseStudy && primaryType !== "caseStudy" && (
            <Link
              className="inline-flex items-center gap-1 rounded text-zinc-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              href={cs.links.caseStudy}
              aria-label={`Read the ${cs.title} case study`}
            >
              Case study
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          )}
        </div>
      </div>

      {/* Media column */}
      <div className="sm:col-span-2">
        <figure>
          <div className="aspect-[4/3] overflow-hidden rounded-xl border border-white/10 bg-white/5">
            <ProjectMedia
              title={cs.title}
              image={cs.image}
              icon={cs.icon}
              ratioClass="aspect-[4/3]"
            />
          </div>
          <figcaption className="sr-only">{cs.title} preview</figcaption>
        </figure>
      </div>
    </article>
  );
}