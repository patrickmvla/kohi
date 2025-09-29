// components/ProjectCard.tsx
export type Project = {
  title: string
  description: string
  tech: string[]
  live?: string
  code?: string
}

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group rounded-lg border border-white/10 bg-white/5 p-4 transition hover:border-white/20">
      <div className="h-40 rounded-md bg-gradient-to-br from-white/10 to-transparent" />
      <h3 className="mt-4 text-lg font-semibold">{project.title}</h3>
      <p className="mt-2 text-sm text-zinc-400">{project.description}</p>
      <div className="mt-3 text-xs text-zinc-500">{project.tech.join(' • ')}</div>
      <div className="mt-4 flex gap-3 text-sm">
        {project.live && (
          <a className="text-brand-400 hover:text-brand-300" href={project.live} target="_blank" rel="noreferrer">
            Live →
          </a>
        )}
        {project.code && (
          <a className="text-zinc-400 hover:text-white" href={project.code} target="_blank" rel="noreferrer">
            Code →
          </a>
        )}
      </div>
    </article>
  )
}