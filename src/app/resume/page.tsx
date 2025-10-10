// src/app/resume/page.tsx
import type { Metadata } from "next";
import { resume } from "@/lib/resume";
import PrintButton from "@/components/ui/PrintButton";
import { Mail, Phone, Globe, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Resume — kohi",
  description: "Resume for kohi — software engineer.",
};

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      role="region"
      aria-labelledby={`${id}-heading`}
      className="avoid-break mt-8 border-t border-white/10 pt-6 first:mt-0 first:border-t-0 first:pt-0 print:border-t-0 print:pt-0"
    >
      <h2
        id={`${id}-heading`}
        className="text-base font-semibold tracking-tight text-white print:text-black"
      >
        {title}
      </h2>
      <div className="mt-2">{children}</div>
    </section>
  );
}

function PersonJsonLd() {
  const sameAs = (resume.socials ?? []).map((s) => s.href);
  const alumni = (resume.education ?? []).map((e) => e.school).filter(Boolean);
  const worksFor = (resume.experience ?? []).map((e) => e.company).filter(Boolean);

  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: resume.name,
    jobTitle: resume.title,
    url: resume.website || undefined,
    email: resume.email ? `mailto:${resume.email}` : undefined,
    telephone: resume.phone || undefined,
    address: resume.location || undefined,
    sameAs: sameAs.length ? sameAs : undefined,
    alumniOf: alumni.length ? alumni : undefined,
    worksFor: worksFor.length ? worksFor : undefined,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function ResumePage() {
  return (
    <main className="section" role="main" aria-labelledby="resume-title">
      <div className="container">
        <div className="mx-auto max-w-4xl rounded-2xl border border-white/10 bg-white/[0.04] p-6 md:max-w-5xl md:p-8 print:border-0 print:bg-transparent print:w-full print:max-w-none">
          {/* Header */}
          <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1
                id="resume-title"
                className="text-3xl font-extrabold tracking-tight text-white print:text-black"
              >
                {resume.name}
              </h1>
              {resume.title && (
                <p className="text-sm text-zinc-400 print:text-black" role="doc-subtitle">
                  {resume.title}
                </p>
              )}
              {resume.location && (
                <p className="text-xs text-zinc-500 print:text-black">{resume.location}</p>
              )}
            </div>

            {/* Contact + actions */}
            <div className="text-sm text-zinc-400 print:text-black">
              <nav aria-label="Contact" className="flex flex-wrap items-center gap-x-4 gap-y-1">
                {resume.email && (
                  <a
                    className="inline-flex items-center gap-1 hover:text-white print:hover:text-black"
                    href={`mailto:${resume.email}`}
                  >
                    <Mail className="size-3.5" aria-hidden />
                    {resume.email}
                  </a>
                )}
                {resume.phone && (
                  <a
                    className="inline-flex items-center gap-1 hover:text-white print:hover:text-black"
                    href={`tel:${resume.phone.replace(/\s+/g, "")}`}
                  >
                    <Phone className="size-3.5" aria-hidden />
                    {resume.phone}
                  </a>
                )}
                {resume.website && (
                  <a
                    className="inline-flex items-center gap-1 hover:text-white print:hover:text-black"
                    href={resume.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Globe className="size-3.5" aria-hidden />
                    {resume.website.replace(/^https?:\/\//, "")}
                  </a>
                )}
                {resume.socials?.map((s) => (
                  <a
                    key={s.label}
                    className="hover:text-white print:hover:text-black"
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {s.label}
                  </a>
                ))}
              </nav>

              {/* Screen-only actions */}
              <div className="mt-2 hidden items-center justify-end gap-2 print:hidden sm:flex">
                {resume.pdf && (
                  <a
                    href={resume.pdf}
                    download
                    className="rounded border border-white/10 px-2 py-1 text-xs text-zinc-300 hover:border-white/20 hover:text-white"
                    aria-label="Download PDF resume"
                  >
                    Download PDF
                  </a>
                )}
                <PrintButton />
              </div>
            </div>
          </header>

          {/* Summary */}
          {resume.summary && (
            <Section id="summary" title="Summary">
              <p className="text-sm leading-6 text-zinc-300 print:text-black">
                {resume.summary}
              </p>
            </Section>
          )}

          {/* Skills */}
          {resume.skills?.length ? (
            <Section id="skills" title="Skills">
              <div className="grid gap-4 sm:grid-cols-2">
                {resume.skills.map((g) => (
                  <div key={g.title} className="avoid-break print:break-inside-avoid-page">
                    <div className="text-xs uppercase tracking-wide text-zinc-500 print:text-black">
                      {g.title}
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {g.items.map((i) => (
                        <span
                          key={i}
                          className="rounded-full border border-white/12 px-2 py-0.5 text-xs text-zinc-300 print:border-black/20 print:text-black"
                        >
                          {i}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          ) : null}

          {/* Experience */}
          {resume.experience?.length ? (
            <Section id="experience" title="Experience">
              <div className="grid gap-5">
                {resume.experience.map((e) => (
                  <article
                    key={`${e.company}-${e.role}`}
                    className="avoid-break print:break-inside-avoid-page"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <div className="text-sm font-semibold text-white print:text-black">
                        {e.role} · {e.company}
                      </div>
                      <div className="text-xs text-zinc-500 print:text-black">
                        {e.start ? (
                          <>
                            <time dateTime={e.start}>{e.start}</time> –{" "}
                            <time dateTime={e.end ?? ""}>{e.end ?? "Present"}</time>
                          </>
                        ) : null}
                      </div>
                    </div>
                    {e.location && (
                      <div className="text-xs text-zinc-500 print:text-black">{e.location}</div>
                    )}
                    {e.bullets?.length ? (
                      <ul className="mt-2 list-disc pl-5 text-sm leading-6 text-zinc-300 print:text-black">
                        {e.bullets.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                    ) : null}
                    {e.stack?.length ? (
                      <div className="mt-2 flex flex-wrap gap-2 text-xs text-zinc-400 print:text-black">
                        {e.stack.map((t) => (
                          <span
                            key={t}
                            className="rounded border border-white/10 px-2 py-0.5 print:border-black/20"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    ) : null}
                    {e.link && (
                      <div className="mt-1 text-xs">
                        <a
                          className="inline-flex items-center gap-1 text-brand-400 hover:text-brand-300 print:text-black"
                          href={e.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          More <ExternalLink className="size-3.5" aria-hidden />
                        </a>
                      </div>
                    )}
                  </article>
                ))}
              </div>
            </Section>
          ) : null}

          {/* Selected Projects (include Eiga here in your resume.projects) */}
          {resume.projects?.length ? (
            <Section id="projects" title="Selected Projects">
              <div className="grid gap-5">
                {resume.projects.map((p) => (
                  <article key={p.title} className="avoid-break print:break-inside-avoid-page">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <div className="text-sm font-semibold text-white print:text-black">
                        {p.title}
                      </div>
                      {p.link && (
                        <a
                          className="text-xs text-brand-400 hover:text-brand-300 print:text-black"
                          href={p.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Link →
                        </a>
                      )}
                    </div>
                    {p.tagline && (
                      <div className="text-xs text-zinc-500 print:text-black">{p.tagline}</div>
                    )}
                    {p.bullets?.length ? (
                      <ul className="mt-1 list-disc pl-5 text-sm leading-6 text-zinc-300 print:text-black">
                        {p.bullets.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                    ) : null}
                    {p.stack?.length ? (
                      <div className="mt-2 flex flex-wrap gap-2 text-xs text-zinc-400 print:text-black">
                        {p.stack.map((t) => (
                          <span
                            key={t}
                            className="rounded border border-white/10 px-2 py-0.5 print:border-black/20"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </article>
                ))}
              </div>
            </Section>
          ) : null}

          {/* Education */}
          {resume.education?.length ? (
            <Section id="education" title="Education">
              <div className="grid gap-4">
                {resume.education.map((ed) => (
                  <article key={ed.school} className="avoid-break print:break-inside-avoid-page">
                    <div className="text-sm font-semibold text-white print:text-black">
                      {ed.degree}
                    </div>
                    <div className="text-xs text-zinc-500 print:text-black">
                      {ed.school}
                      {ed.period ? (
                        <>
                          {" "}
                          · <time dateTime={ed.period}>{ed.period}</time>
                        </>
                      ) : null}
                    </div>
                    {ed.details?.length ? (
                      <ul className="mt-1 list-disc pl-5 text-sm leading-6 text-zinc-300 print:text-black">
                        {ed.details.map((d) => (
                          <li key={d}>{d}</li>
                        ))}
                      </ul>
                    ) : null}
                  </article>
                ))}
              </div>
            </Section>
          ) : null}
        </div>
      </div>
      <PersonJsonLd />
    </main>
  );
}