/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/projects/CaseStudyPage.tsx
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import ProjectMedia from "./ProjectMedia";
import { ArrowRight, ExternalLink, Code2, Check } from "lucide-react";
import type { ReactNode } from "react";
import type { CaseStudy } from "@/lib/case-studies";

// Optional structured fields (all optional; only render if present)
export type CaseSection = { id: string; title: string; body: string };
export type CaseDecision = {
  id: string;
  title: string;
  context?: string;
  options?: string[];
  tradeoffs?: string[];
  outcome?: string;
  links?: { label: string; href: string }[];
};
export type CaseTimelineItem = { date: string; label: string; detail?: string };

type Props = {
  cs: CaseStudy;
  children?: ReactNode;
  sections?: CaseSection[];
  decisions?: CaseDecision[];
  timeline?: CaseTimelineItem[];
};

export default function CaseStudyPage({
  cs,
  children,
  sections = [],
  decisions = [],
  timeline = [],
}: Props) {
  // Support structured stats if present (backward-compatible with CaseStudy type)
  const stats =
    ((cs as any).stats as { label: string; value: string; tooltip?: string }[] | undefined) ??
    undefined;

  const hasDeepDive =
    !!children ||
    sections.length > 0 ||
    decisions.length > 0 ||
    timeline.length > 0 ||
    (cs.gallery && cs.gallery.length > 0);

  return (
    <article className="section" aria-labelledby="case-title">
      <div className="container">
        {/* Header */}
        <header className="max-w-5xl">
          <p className="text-[11px] uppercase tracking-widest text-brand-300/80">
            Case study
          </p>
          <h1
            id="case-title"
            className="relative mt-2 max-w-4xl text-4xl font-extrabold tracking-tight sm:text-6xl after:mt-4 after:block after:h-px after:w-16 after:bg-gradient-to-r after:from-brand-500/70 after:to-transparent"
          >
            {cs.title}
          </h1>
          {cs.tagline && (
            <p className="mt-3 max-w-3xl text-base text-brand-300 sm:text-lg">
              {cs.tagline}
            </p>
          )}

          {/* Meta row */}
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-zinc-500">
            {cs.period && (
              <span className="rounded border border-white/10 px-2 py-1">
                {cs.period}
              </span>
            )}
            {cs.role && (
              <span className="rounded border border-white/10 px-2 py-1 text-zinc-300">
                {cs.role}
              </span>
            )}
            {"category" in cs && cs.category && (
              <span className="rounded border border-white/10 px-2 py-1">
                {cs.category}
              </span>
            )}
            {"client" in cs && (cs as any).client && (
              <span className="rounded border border-white/10 px-2 py-1">
                {(cs as any).client}
              </span>
            )}
            {"location" in cs && (cs as any).location && (
              <span className="rounded border border-white/10 px-2 py-1">
                {(cs as any).location}
              </span>
            )}
          </div>

          {/* Primary CTAs */}
          <div className="mt-6 flex flex-wrap gap-3">
            {cs.links?.live && (
              <Button asChild className="gap-2">
                <a
                  href={cs.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open live site"
                >
                  View live
                  <ExternalLink className="size-4" aria-hidden="true" />
                </a>
              </Button>
            )}
            {cs.links?.caseStudy && (
              <Button asChild variant="outline" className="gap-2">
                <Link href={cs.links.caseStudy} aria-label="Full write-up">
                  Full write‑up
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </Button>
            )}
            {cs.links?.code && (
              <Button
                asChild
                variant="ghost"
                className="gap-2 text-zinc-300 hover:text-white"
              >
                <a
                  href={cs.links.code}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View code"
                >
                  Code
                  <Code2 className="size-4" aria-hidden="true" />
                </a>
              </Button>
            )}
            {hasDeepDive && (
              <Button asChild variant="ghost" className="gap-2">
                <a href="#deep-dive">Skip to deep dive</a>
              </Button>
            )}
          </div>
        </header>

        {/* Tabs keep both scan-ability and all the detail */}
        <Tabs defaultValue="overview" className="mt-8">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            {hasDeepDive && <TabsTrigger value="deep">Deep dive</TabsTrigger>}
          </TabsList>

          {/* Overview: quick context + media + highlights + metrics */}
          <TabsContent value="overview">
            {/* Stats strip (structured) or fallback chips (string[]) */}
            {stats?.length ? (
              <dl
                aria-label="Key results"
                className="mt-6 overflow-hidden rounded-xl border border-white/10 bg-white/[0.04]"
              >
                <div className="grid grid-cols-2 divide-y divide-white/10 sm:grid-cols-4 sm:divide-y-0 sm:divide-x">
                  {stats.map((m, i) => (
                    <div key={`${m.label}-${i}`} className="p-4 sm:p-5">
                      <dt className="text-[10px] font-medium uppercase tracking-widest text-zinc-500">
                        {m.label}
                      </dt>
                      <dd className="mt-1 text-sm font-semibold text-zinc-200">
                        {m.value}
                      </dd>
                    </div>
                  ))}
                </div>
              </dl>
            ) : cs.metrics?.length ? (
              <ul className="mt-6 flex flex-wrap gap-2 text-sm text-brand-300">
                {cs.metrics.map((m, i) => (
                  <li
                    key={`${m}-${i}`}
                    className="rounded border border-white/10 px-2 py-1 transition-colors hover:border-white/20"
                  >
                    {m}
                  </li>
                ))}
              </ul>
            ) : null}

            {/* Lead grid: overview + hero media */}
            <div className="mt-6 grid gap-8 sm:grid-cols-5">
              <div className="sm:col-span-3">
                <p className="text-zinc-300">{cs.summary}</p>

                {cs.highlights?.length ? (
                  <ul className="mt-6 space-y-2 text-sm text-zinc-300">
                    {cs.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2">
                        <Check
                          className="mt-0.5 size-4 text-brand-400"
                          aria-hidden="true"
                        />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}

                {cs.impact?.length ? (
                  <ul className="mt-4 space-y-1 text-sm text-brand-300">
                    {cs.impact.map((m) => (
                      <li key={m}>• {m}</li>
                    ))}
                  </ul>
                ) : null}

                {cs.stack?.length ? (
                  <div className="mt-6 flex flex-wrap gap-2 text-xs text-zinc-400">
                    {cs.stack.map((t) => (
                      <Badge
                        key={t}
                        variant="outline"
                        className="border-white/10 bg-transparent"
                      >
                        {t}
                      </Badge>
                    ))}
                  </div>
                ) : null}
              </div>

              <div className="sm:col-span-2">
                <Card className="overflow-hidden border-white/10 bg-white/5">
                  <ProjectMedia
                    title={cs.title}
                    image={cs.image}
                    icon={cs.icon}
                    ratioClass="aspect-[4/3]"
                    priority
                  />
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Deep dive: all the details live here */}
          {hasDeepDive && (
            <TabsContent value="deep">
              <section id="deep-dive" className="mt-8">
                {/* 1) If you pass MDX/ReactNode, render it as-is */}
                {children ? (
                  <div className="prose prose-invert max-w-none">{children}</div>
                ) : null}

                {/* 2) Or structured sections (Problem/Approach/Outcome/etc.) */}
                {!children && sections.length > 0 ? (
                  <div className="grid gap-6 md:grid-cols-3">
                    {sections.map((s) => (
                      <article
                        key={s.id}
                        className="rounded-xl border border-white/10 bg-white/[0.03] p-5"
                      >
                        <h3 className="text-sm font-semibold">{s.title}</h3>
                        <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-zinc-300">
                          {s.body}
                        </p>
                      </article>
                    ))}
                  </div>
                ) : null}

                {/* 3) Decisions as an accordion */}
                {decisions.length > 0 && (
                  <section className="mt-8">
                    <h3 className="text-sm font-semibold">Key decisions</h3>
                    <Accordion type="single" collapsible className="mt-3">
                      {decisions.map((d) => (
                        <AccordionItem key={d.id} value={d.id}>
                          <AccordionTrigger className="text-left">
                            {d.title}
                          </AccordionTrigger>
                          <AccordionContent className="space-y-3 text-sm text-zinc-300">
                            {d.context && (
                              <p>
                                <span className="text-zinc-500">Context: </span>
                                {d.context}
                              </p>
                            )}
                            {d.options?.length ? (
                              <div>
                                <p className="text-zinc-500">Options</p>
                                <ul className="mt-1 list-disc pl-5">
                                  {d.options.map((o) => (
                                    <li key={o}>{o}</li>
                                  ))}
                                </ul>
                              </div>
                            ) : null}
                            {d.tradeoffs?.length ? (
                              <div>
                                <p className="text-zinc-500">Trade‑offs</p>
                                <ul className="mt-1 list-disc pl-5">
                                  {d.tradeoffs.map((t) => (
                                    <li key={t}>{t}</li>
                                  ))}
                                </ul>
                              </div>
                            ) : null}
                            {d.outcome && (
                              <p>
                                <span className="text-zinc-500">Outcome: </span>
                                {d.outcome}
                              </p>
                            )}
                            {d.links?.length ? (
                              <div className="flex flex-wrap gap-3 text-xs">
                                {d.links.map((l) => (
                                  <a
                                    key={`${l.label}-${l.href}`}
                                    href={l.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-brand-400 hover:text-brand-300"
                                  >
                                    {l.label} →
                                  </a>
                                ))}
                              </div>
                            ) : null}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </section>
                )}

                {/* 4) Timeline */}
                {timeline.length > 0 && (
                  <section className="mt-8">
                    <h3 className="text-sm font-semibold">Timeline</h3>
                    <ol className="mt-3 space-y-3">
                      {timeline.map((t) => (
                        <li
                          key={`${t.date}-${t.label}`}
                          className="rounded-lg border border-white/10 bg-white/[0.03] p-4"
                        >
                          <div className="text-xs text-zinc-500">{t.date}</div>
                          <div className="text-sm font-medium text-zinc-200">
                            {t.label}
                          </div>
                          {t.detail && (
                            <p className="mt-1 text-sm text-zinc-300">
                              {t.detail}
                            </p>
                          )}
                        </li>
                      ))}
                    </ol>
                  </section>
                )}

                {/* 5) Gallery */}
                {cs.gallery?.length ? (
                  <section className="mt-8">
                    <h3 className="text-sm font-semibold">Gallery</h3>
                    <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {cs.gallery.map((g, i) => (
                        <Card
                          key={g.src ?? i}
                          className="overflow-hidden border-white/10 bg-white/5"
                        >
                          <ProjectMedia
                            title={cs.title}
                            image={g.src}
                            alt={g.alt}
                            ratioClass={g.ratio ?? "aspect-[4/3]"}
                          />
                        </Card>
                      ))}
                    </div>
                  </section>
                ) : null}
              </section>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </article>
  );
}