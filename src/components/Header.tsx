'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // inside Header component
const contactHref = '/contact'

  const linkBase =
    'px-2 py-1 text-sm transition-colors rounded hover:text-white focus:outline-none focus-visible:ring-2 ring-brand-600'
  const isActive = (href: string) =>
    href !== '/#contact' && href !== '#contact' && pathname.startsWith(href)

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only fixed left-2 top-2 z-[100] rounded bg-black px-3 py-1 text-sm text-white">
        Skip to content
      </a>

      <header
        className={`sticky top-0 z-50 border-b border-white/10 backdrop-blur ${
          scrolled ? 'bg-black/60' : 'bg-black/30'
        }`}
      >
        <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <Link href="/" className="text-sm font-semibold tracking-tight">
            kohi
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-6 sm:flex">
            <Link
              href="/projects"
              className={`${linkBase} ${isActive('/projects') ? 'text-white' : 'text-zinc-400'}`}
            >
              Projects
            </Link>
            {/* <Link
              href="/blog"
              className={`${linkBase} ${isActive('/blog') ? 'text-white' : 'text-zinc-400'}`}
            >
              Blog
            </Link> */}
            <Link
              href="/reading"
              className={`${linkBase} ${isActive('/reading') ? 'text-white' : 'text-zinc-400'}`}
            >
              Reading
            </Link>
            <Link
              href={contactHref}
              className={`${linkBase} ${pathname === '/' ? 'text-zinc-400 hover:text-white' : 'text-zinc-400 hover:text-white'}`}
            >
              Contact
            </Link>
            <Link
              href="/about"
              className={`${linkBase} ${pathname === '/' ? 'text-zinc-400 hover:text-white' : 'text-zinc-400 hover:text-white'}`}
            >
              About
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/resume"
              className="hidden rounded-md bg-white px-3 py-1.5 text-sm font-semibold text-black hover:bg-white/90 sm:inline-block"
            >
              Resume
            </Link>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="inline-flex items-center justify-center rounded-md border border-white/10 px-2 py-1 text-sm text-zinc-300 hover:text-white sm:hidden"
            >
              Menu
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-[60] bg-black/70 backdrop-blur">
          <div className="mx-auto mt-3 w-full max-w-6xl px-4">
            <div className="rounded-xl border border-white/10 bg-black/70 p-4">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold">kohi</div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="rounded-md border border-white/10 px-2 py-1 text-sm text-zinc-300 hover:text-white"
                >
                  Close
                </button>
              </div>

              <div className="mt-4 grid gap-2">
                <Link href="/projects" onClick={() => setOpen(false)} className="rounded px-2 py-2 text-base text-zinc-300 hover:text-white">
                  Projects
                </Link>
                <Link href="/blog" onClick={() => setOpen(false)} className="rounded px-2 py-2 text-base text-zinc-300 hover:text-white">
                  Blog
                </Link>
                <Link href="/reading" onClick={() => setOpen(false)} className="rounded px-2 py-2 text-base text-zinc-300 hover:text-white">
                  Reading
                </Link>
                <Link href={contactHref} onClick={() => setOpen(false)} className="rounded px-2 py-2 text-base text-zinc-300 hover:text-white">
                  Contact
                </Link>
                <Link href="/resume.pdf" onClick={() => setOpen(false)} className="mt-2 rounded-md bg-white px-3 py-2 text-sm font-semibold text-black hover:bg-white/90">
                  Resume
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}