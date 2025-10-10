// app/projects/page.tsx
import type { Metadata } from "next";
import { Suspense } from "react";
import ProjectsHero from "@/components/projects/ProjectsHero";
import FeaturedCaseStudy from "@/components/projects/FeaturedCaseStudy";
import ProjectsExplorer from "@/components/projects/ProjectsExplorer";
import { listCaseStudies } from "@/lib/data";

export const metadata: Metadata = {
  title: "Projects — kohi",
  description:
    "In‑depth case studies: context, constraints, and the decisions in‑between.",
};

export default async function ProjectsPage() {
  const sorted = await listCaseStudies({ sort: "recent" });
  if (sorted.length === 0) {
    return (
      <main>
        <ProjectsHero />
        <section className="section">
          <div className="container text-sm text-zinc-400">
            No projects to show yet.
          </div>
        </section>
      </main>
    );
  }

  const featured = sorted.find((s) => s.featured) ?? sorted[0];
  const rest = sorted.filter((s) => s.slug !== featured.slug);

  return (
    <main>
      <ProjectsHero />
      <FeaturedCaseStudy cs={featured} />
      <Suspense fallback={<ExplorerFallback />}>
        <ProjectsExplorer studies={rest} />
      </Suspense>
    </main>
  );
}

function ExplorerFallback() {
  return (
    <section className="section">
      <div className="container">
        {/* Filter bar skeleton */}
        <div className="sticky top-14 z-10 h-20 rounded-lg border border-white/10 bg-white/[0.03]" />

        {/* Grid skeleton */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl border border-white/10 bg-white/[0.03] p-5"
            >
              <div className="aspect-[16/9] rounded-lg bg-white/5" />
              <div className="mt-3 h-3 w-24 rounded bg-white/5" />
              <div className="mt-2 h-5 w-3/4 rounded bg-white/5" />
              <div className="mt-2 h-4 w-full rounded bg-white/5" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}