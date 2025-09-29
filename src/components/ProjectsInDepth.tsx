import CaseStudyCard, { type CaseStudy } from './CaseStudyCard'

export default function ProjectsInDepth({ studies }: { studies: CaseStudy[] }) {
  return (
    <section id="projects" className="section">
      <div className="container">
        <h2 className="text-2xl font-semibold">Projects — in depth</h2>
        <p className="mt-2 max-w-2xl text-sm text-zinc-400">
          Work that mattered: context, constraints, and the decisions in-between.
        </p>

        <div className="mt-8 grid gap-6">
          {studies.map((cs) => (
            <CaseStudyCard key={cs.title} cs={cs} />
          ))}
        </div>
      </div>
    </section>
  )
}