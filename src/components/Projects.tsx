// components/Projects.tsx
import ProjectCard, { type Project } from './ProjectCard'

export default function Projects({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
      <h2 className="text-2xl font-semibold">Selected Projects</h2>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <ProjectCard key={p.title} project={p} />
        ))}
      </div>
    </section>
  )
}