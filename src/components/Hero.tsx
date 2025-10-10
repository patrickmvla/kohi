// src/components/Hero.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

const STATS: { label: string; value: string }[] = [
  { label: "Experience", value: "Mid-Level" },
  { label: "Response", value: "<24h" },
  { label: "Timezones", value: "EU/US friendly" },
  { label: "Stack", value: "Next.js · TS · React · Go" },
];

export default function Hero() {
  return (
    <section className="section relative overflow-hidden" aria-labelledby="hero-heading">
      {/* Ambient background (blended coffee tint) */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-0 top-0 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 bg-brand-900/10 blur-[90px] [will-change:transform] sm:h-[560px] sm:w-[560px] sm:blur-[110px] md:h-[620px] md:w-[620px] md:blur-[120px]" />
        <div className="absolute right-0 top-20 h-[360px] w-[360px] translate-x-1/3 bg-brand-900/6 blur-[80px] [will-change:transform] sm:h-[400px] sm:w-[400px] sm:blur-[100px]" />
      </div>

      <div className="container">
        <div className="relative mx-auto max-w-5xl">
          {/* Top meta */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-[11px] uppercase tracking-widest text-brand-300/80">
              Patrick Mvula
            </span>
            <Badge
              variant="outline"
              role="status"
              aria-live="polite"
              className="gap-2 border-brand-600/20 bg-brand-600/5 px-3 py-1 text-xs font-medium text-brand-300"
            >
              <span className="relative flex size-2" aria-hidden="true">
                <span className="absolute inline-flex size-full rounded-full bg-brand-500 opacity-75 motion-safe:animate-ping" />
                <span className="relative inline-flex size-2 rounded-full bg-brand-500" />
              </span>
              Available for select projects
            </Badge>
          </div>

          {/* Main heading */}
          <h1
            id="hero-heading"
            className="relative mt-6 max-w-4xl bg-gradient-to-br from-zinc-50 via-zinc-200 to-zinc-400 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-6xl after:mt-4 after:block after:h-px after:w-16 after:bg-gradient-to-r after:from-brand-500/70 after:to-transparent"
          >
            Calm, reliable software — built with intent
          </h1>

          {/* Subheading */}
          <p className="mt-6 max-w-2xl text-base text-zinc-400 sm:text-lg" id="hero-subheading">
            I design and ship systems that favor clarity, durability, and performance. Explore in‑depth projects,
            field notes, and what’s shaping my thinking.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              asChild
              size="lg"
              className="group gap-2 bg-brand-600 shadow-lg shadow-brand-600/20 hover:bg-brand-500 hover:shadow-brand-500/30 focus-visible:ring-2 focus-visible:ring-brand-500"
            >
              <Link href="/projects" aria-label="Explore projects">
                Explore projects
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none"
                  aria-hidden="true"
                />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="group gap-2 focus-visible:ring-2 focus-visible:ring-brand-500"
            >
              <Link href="/contact" aria-label="Contact">
                Contact
                <ArrowRight
                  className="size-4 opacity-50 transition-opacity group-hover:opacity-100"
                  aria-hidden="true"
                />
              </Link>
            </Button>
          </div>

          {/* Info strip with separators */}
          <dl aria-label="Key details" className="mt-10 overflow-hidden rounded-xl border border-white/8 bg-white/[0.03]">
            <div className="grid grid-cols-2 divide-y divide-white/10 sm:grid-cols-4 sm:divide-y-0 sm:divide-x">
              {STATS.map(({ label, value }) => (
                <div key={label} className="p-4 sm:p-5">
                  <dt className="text-[10px] font-medium uppercase tracking-widest text-zinc-500">
                    {label}
                  </dt>
                  <dd className="mt-1 text-sm font-semibold text-zinc-200">{value}</dd>
                </div>
              ))}
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}