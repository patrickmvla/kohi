export default function Footer() {
  return (
    <footer className="section border-t border-white/10">
      <div className="container flex flex-col items-start justify-between gap-4 sm:flex-row">
        <div className="text-sm text-zinc-500">© {new Date().getFullYear()} kohi</div>
        <div className="flex gap-4 text-sm text-zinc-400">
          <a href="https://github.com/you" target="_blank" rel="noreferrer" className="hover:text-white">GitHub</a>
          <a href="https://www.linkedin.com/in/you" target="_blank" rel="noreferrer" className="hover:text-white">LinkedIn</a>
          <a href="https://x.com/you" target="_blank" rel="noreferrer" className="hover:text-white">X</a>
        </div>
      </div>
    </footer>
  )
}