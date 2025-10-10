// src/app/contact/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import ContactRHF from "@/components/ContactRHF";
import { resume } from "@/lib/resume";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact — kohi",
  description: "Get in touch about projects, collaborations, or questions.",
};

export default function ContactPage() {
  const email = resume.email ?? "mvlapatrick@gmail.com";

  return (
    <main>
      {/* Hero */}
      <section aria-labelledby="contact-heading" className="section">
        <div className="container">
          <div className="relative">
            {/* Overlay removed for a cleaner, professional look */}
            <p className="text-[11px] uppercase tracking-widest text-brand-300/80">
              Contact
            </p>
            <h1
              id="contact-heading"
              className="relative mt-2 max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl after:mt-4 after:block after:h-px after:w-16 after:bg-gradient-to-r after:from-brand-500/70 after:to-transparent"
            >
              Let’s build something calm and reliable
            </h1>
            <p className="mt-6 max-w-2xl text-base text-zinc-400 sm:text-lg">
              Share a few details about your project or question. I read every
              message and typically reply within 1–2 business days.
            </p>

            {/* Primary CTAs */}
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild size="sm" className="gap-2 bg-brand-600 hover:bg-brand-500">
                <a href={`mailto:${email}`} aria-label={`Email ${email}`}>
                  <Mail className="size-4" aria-hidden="true" />
                  Email me
                </a>
              </Button>
              <Button asChild variant="outline" size="sm" className="gap-2">
                <Link href="/resume" aria-label="View resume">
                  View resume
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Details strip */}
      <section className="section" aria-labelledby="contact-details-heading">
        <div className="container">
          <h2 id="contact-details-heading" className="sr-only">
            Contact details
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {/* Email */}
            <Card className="border-white/10 bg-white/[0.04]">
              <CardContent className="p-5">
                <div className="text-xs text-zinc-500">Email</div>
                <a
                  href={`mailto:${email}`}
                  className="mt-1 block text-sm text-white hover:underline"
                >
                  {email}
                </a>
                <p className="mt-2 text-xs text-zinc-500">
                  Prefer email? I’m happy to continue there.
                </p>
              </CardContent>
            </Card>

            {/* Availability */}
            <Card className="border-white/10 bg-white/[0.04]">
              <CardContent className="p-5">
                <div className="text-xs text-zinc-500">Availability</div>
                <div className="mt-1 text-sm text-white">
                  Open to select collaborations
                </div>
                <p className="mt-2 text-xs text-zinc-500">Timezone: CAT (UTC+2)</p>
              </CardContent>
            </Card>

            {/* Elsewhere (pulled from resume.socials) */}
            <Card className="border-white/10 bg-white/[0.04]">
              <CardContent className="p-5">
                <div className="text-xs text-zinc-500">Elsewhere</div>
                <nav aria-label="Elsewhere" className="mt-1 flex flex-wrap gap-3 text-sm">
                  {resume.socials?.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-zinc-400 hover:text-white"
                    >
                      {s.label}
                    </a>
                  ))}
                  <Link href="/resume" className="text-zinc-400 hover:text-white">
                    Resume
                  </Link>
                </nav>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Form (validated with RHF + Zod) */}
       <ContactRHF /> 
    </main>
  );
}