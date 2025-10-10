// src/components/projects/FeaturedCaseStudy.tsx
import Link from "next/link";
import type { CaseStudy } from "@/lib/case-studies";
import ProjectMedia from "./ProjectMedia";
import { ArrowRight, ExternalLink, Code2, Check } from "lucide-react";

export default function FeaturedCaseStudy({ cs }: { cs: CaseStudy }) {
  const href = `/projects/${cs.slug}`;

  return (
    <section aria-labelledby="featured-case-heading" className="section">
      <div className="container">
        <h2 id="featured-case-heading" className="text-2xl font-semibold">
          Featured
        </h2>

        <article
          className="mt-6 grid gap-6 rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-colors hover:border-white/20 focus-within:border-brand-600/40 sm:grid-cols-5 sm:gap-8"
          aria-labelledby="featured-case-title"
          aria-describedby="featured-case-tagline"
        >
          {/* Content */}
          <div className="sm:col-span-3">
            {/* Meta row with separators */}
            <div className="text-xs text-zinc-500">
              <span>{cs.period}</span>
              <span className="px-2 text-zinc-600" aria-hidden="true">•</span>
              <span>{cs.role}</span>
              <span className="px-2 text-zinc-600" aria-hidden="true">•</span>
              <span>{cs.category}</span>
            </div>

            {/* Title links to internal page */}
            <h3 id="featured-case-title" className="mt-1 text-2xl font-bold tracking-tight">
              <Link
                href={href}
                className="inline-flex items-center gap-1 rounded text-zinc-100 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                aria-label={`Open case study: ${cs.title}`}
                aria-describedby="featured-case-tagline"
              >
                {cs.title}
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none"
                  aria-hidden="true"
                />
              </Link>
            </h3>

            <p id="featured-case-tagline" className="mt-2 text-sm text-brand-300">
              {cs.tagline}
            </p>
            <p className="mt-4 text-zinc-300">{cs.summary}</p>

            {/* Highlights */}
            {cs.highlights?.length ? (
              <ul className="mt-5 space-y-2 text-sm text-zinc-300">
                {cs.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2">
                    <Check className="mt-0.5 size-4 text-brand-400" aria-hidden="true" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            ) : null}

            {/* Metrics (optional chips) */}
            {cs.metrics?.length ? (
              <ul className="mt-4 flex flex-wrap gap-3 text-sm text-brand-300">
                {cs.metrics.map((m) => (
                  <li key={m} className="rounded border border-white/10 px-2 py-1 transition-colors hover:border-white/20">
                    {m}
                  </li>
                ))}
              </ul>
            ) : null}

            {/* CTAs */}
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm">
              {/* Internal case page */}
              <Link
                href={href}
                className="inline-flex items-center gap-1 rounded text-zinc-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                aria-label={`Open ${cs.title} case study`}
              >
                Read case study
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>

              {/* Optional external write-up (if provided) */}
              {cs.links?.caseStudy && (
                <a
                  href={cs.links.caseStudy}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded text-zinc-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                  aria-label={`Open external write-up for ${cs.title} in a new tab`}
                >
                  Full write‑up
                  <ExternalLink className="size-4" aria-hidden="true" />
                </a>
              )}

              {cs.links?.live && (
                <a
                  href={cs.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${cs.title} live site in a new tab`}
                  className="inline-flex items-center gap-1 rounded text-brand-400 hover:text-brand-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
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
                  aria-label={`View ${cs.title} code repository in a new tab`}
                  className="inline-flex items-center gap-1 rounded text-zinc-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                >
                  Code
                  <Code2 className="size-4" aria-hidden="true" />
                </a>
              )}
            </div>
          </div>

          {/* Media + Stack */}
          <div className="sm:col-span-2">
            <figure>
              {/* Media links to internal page */}
              <Link
                href={href}
                className="block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
                aria-label={`Open case study: ${cs.title}`}
              >
                <div className="aspect-[4/3] overflow-hidden rounded-xl border border-white/10 bg-white/5">
                  <ProjectMedia title={cs.title} image={cs.image} icon={cs.icon} ratioClass="aspect-[4/3]" />
                </div>
              </Link>
              <figcaption className="sr-only">{cs.title} preview</figcaption>
            </figure>

            <div className="mt-4 flex flex-wrap gap-2 text-xs text-zinc-400">
              {cs.stack.map((s) => (
                <span
                  key={s}
                  className="rounded border border-white/10 px-2 py-1 transition-colors hover:border-white/20"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}