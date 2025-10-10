// src/components/ContactCTA.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Mail, ArrowRight } from "lucide-react";
import { resume } from "@/lib/resume";

export default function ContactCTA() {
  const email = resume.email ?? "mvlapatrick@gmail.com";

  return (
    <section id="contact" aria-labelledby="contact-cta-heading" className="section">
      <div className="container">
        <div className="rounded-2xl surface p-6 text-center sm:p-10">
          <h2 id="contact-cta-heading" className="text-2xl font-semibold">
            Let’s build something calm and reliable
          </h2>
          <p id="contact-cta-desc" className="mx-auto mt-3 max-w-2xl text-sm text-zinc-400">
            Have a project where clarity, performance, and steady execution matter? I’m open to select collaborations.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Button asChild className="gap-2">
              <a href={`mailto:${email}`} aria-label={`Email ${email}`} aria-describedby="contact-cta-desc">
                <Mail className="size-4" aria-hidden="true" />
                Email me
              </a>
            </Button>

            <Button asChild variant="outline" className="gap-2">
              <Link href="/resume" aria-label="View resume" aria-describedby="contact-cta-desc">
                Resume
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}