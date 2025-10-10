// components/FeaturedWork.tsx
import Link from "next/link";
import type { CaseStudy } from "@/lib/case-studies";
import ProjectMedia from "./projects/ProjectMedia";
import { ArrowRight, ExternalLink, Code2, Check } from "lucide-react";

export default function FeaturedWork({ cs }: { cs: CaseStudy }) {
  return (
    <section aria-labelledby="featured-work-heading" className="section">
      <div className="container">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 id="featured-work-heading" className="text-2xl font-semibold">
              Featured work
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-zinc-400">
              A flagship project with context, constraints, and the decisions in‑between.
            </p>
          </div>

          <Link
            href="/projects"
            aria-label="View all projects"
            className="inline-flex items-center gap-1 rounded text-sm text-brand-400 hover:text-brand-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          >
            All projects
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        <article
          className="mt-6 grid gap-6 rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-colors hover:border-white/20 focus-within:border-brand-600/40 sm:grid-cols-5 sm:gap-8"
          aria-labelledby="featured-case-title"
          aria-describedby="featured-case-tagline"
        >
          <div className="sm:col-span-3">
            <div className="text-xs text-zinc-500">
              <span>{cs.period}</span>
              <span className="px-2 text-zinc-600">•</span>
              <span>{cs.role}</span>
              <span className="px-2 text-zinc-600">•</span>
              <span>{cs.category}</span>
            </div>

            <h3 id="featured-case-title" className="mt-1 text-2xl font-bold tracking-tight">
              {cs.title}
            </h3>
            <p id="featured-case-tagline" className="mt-2 text-sm text-brand-300">
              {cs.tagline}
            </p>
            <p className="mt-4 text-zinc-300">{cs.summary}</p>

            <ul className="mt-5 space-y-2 text-sm text-zinc-300">
              {cs.highlights.slice(0, 3).map((h) => (
                <li key={h} className="flex items-start gap-2">
                  <Check className="mt-0.5 size-4 text-brand-400" aria-hidden="true" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm">
              {cs.links?.caseStudy && (
                <Link
                  href={cs.links.caseStudy}
                  aria-label={`Read the ${cs.title} case study`}
                  className="inline-flex items-center gap-1 rounded text-zinc-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                >
                  Case study
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
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