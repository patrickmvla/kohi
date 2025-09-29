// app/projects/page.tsx
import type { Metadata } from 'next'
import { caseStudies } from '@/lib/case-studies'
import FeaturedCaseStudy from '@/components/projects/FeaturedCaseStudy'
import ProjectsExplorer from '@/components/projects/ProjectsExplorer'
import ProjectsHero from '@/components/projects/ProjectsHero'

export const metadata: Metadata = {
  title: 'Projects — kohi',
  description: 'In‑depth case studies: context, constraints, and the decisions in‑between.',
}

export default function ProjectsPage() {
  const featured = caseStudies.find(s => s.featured)
  const rest = caseStudies.filter(s => s.slug !== featured?.slug)

  return (
    <main>
      <ProjectsHero />
      {featured && <FeaturedCaseStudy cs={featured} />}
      <ProjectsExplorer studies={rest} />
    </main>
  )
}