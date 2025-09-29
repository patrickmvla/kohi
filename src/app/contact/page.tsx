// src/app/contact/page.tsx
import type { Metadata } from 'next'
import ContactRHF from '@/components/ContactRHF'

export const metadata: Metadata = {
  title: 'Contact — kohi',
  description: 'Get in touch about projects, collaborations, or questions.',
}

export default function ContactPage() {
  return (
    <main>
      {/* Hero */}
      <section className="section">
        <div className="container">
          <div className="relative">
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_40%_at_15%_0%,rgba(137,82,33,0.16),transparent_60%)]" />
            <p className="text-xs uppercase tracking-widest text-zinc-500">Contact</p>
            <h1 className="mt-2 max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl">
              Let’s build something calm and reliable
            </h1>
            <p className="mt-6 max-w-2xl text-base text-zinc-400 sm:text-lg">
              Share a few details about your project or question. I read every message and typically
              reply within 1–2 business days.
            </p>
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="section">
        <div className="container">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl surface p-5">
              <div className="text-xs text-zinc-500">Email</div>
              <a
                href="mailto:hello@kohi.dev"
                className="mt-1 block text-sm text-white hover:underline"
              >
                hello@kohi.dev
              </a>
              <p className="mt-2 text-xs text-zinc-500">
                Prefer email? I’m happy to continue there.
              </p>
            </div>

            <div className="rounded-xl surface p-5">
              <div className="text-xs text-zinc-500">Availability</div>
              <div className="mt-1 text-sm text-white">Open to select collaborations</div>
              <p className="mt-2 text-xs text-zinc-500">Timezone: CAT (UTC+2)</p>
            </div>

            <div className="rounded-xl surface p-5">
              <div className="text-xs text-zinc-500">Elsewhere</div>
              <div className="mt-1 flex flex-wrap gap-3 text-sm">
                <a href="https://github.com/you" target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-white">
                  GitHub
                </a>
                <a href="https://www.linkedin.com/in/you" target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-white">
                  LinkedIn
                </a>
                <a href="https://x.com/you" target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-white">
                  X
                </a>
                <a href="/resume.pdf" className="text-zinc-400 hover:text-white">Resume</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form (validated with RHF + Zod) */}
      <ContactRHF />
    </main>
  )
}