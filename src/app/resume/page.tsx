// src/app/resume/page.tsx
import type { Metadata } from "next";
import { resume } from "@/lib/resume";
import PrintButton from "@/components/ui/PrintButton";

export const metadata: Metadata = {
  title: "Resume — kohi",
  description: "Resume for kohi — software engineer.",
};

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="avoid-break mt-6 first:mt-0">
      <h2 className="text-base font-semibold tracking-tight text-white print:text-black">
        {title}
      </h2>
      <div className="mt-2">{children}</div>
    </section>
  );
}

export default function ResumePage() {
  return (
    <main className="section">
      <div className="container">
        <div className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-white/5 p-6 print:border-0 print:bg-transparent">
          {/* Header */}
          <header className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-white print:text-black">
                {resume.name}
              </h1>
              <p className="text-sm text-zinc-400">{resume.title}</p>
              {resume.location && (
                <p className="text-xs text-zinc-500">{resume.location}</p>
              )}
            </div>
            <div className="text-sm text-zinc-400 print:text-black">
              <div className="flex flex-wrap gap-x-3 gap-y-1">
                {resume.email && (
                  <a
                    className="hover:text-white print:hover:text-black"
                    href={`mailto:${resume.email}`}
                  >
                    {resume.email}
                  </a>
                )}
                {resume.website && (
                  <a
                    className="hover:text-white print:hover:text-black"
                    href={resume.website}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {resume.website.replace(/^https?:\/\//, "")}
                  </a>
                )}
                {resume.socials?.map((s) => (
                  <a
                    key={s.label}
                    className="hover:text-white print:hover:text-black"
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
              {/* Screen-only actions */}
              <div className="mt-2 hidden gap-2 print:hidden sm:flex">
                <PrintButton /> {/* <-- use client button here */}
              </div>
            </div>
          </header>

          {resume.summary && (
            <Section title="Summary">
              <p className="text-sm text-zinc-300 print:text-black">
                {resume.summary}
              </p>
            </Section>
          )}

          {/* Skills */}
          <Section title="Skills">
            <div className="grid gap-3 sm:grid-cols-2">
              {resume.skills.map((g) => (
                <div key={g.title} className="avoid-break">
                  <div className="text-xs uppercase tracking-wide text-zinc-500">
                    {g.title}
                  </div>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {g.items.map((i) => (
                      <span
                        key={i}
                        className="rounded-full border border-white/10 px-2 py-0.5 text-xs text-zinc-300 print:border-black/20 print:text-black"
                      >
                        {i}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* Experience */}
          <Section title="Experience">
            <div className="grid gap-4">
              {resume.experience.map((e) => (
                <article key={`${e.company}-${e.role}`} className="avoid-break">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <div className="text-sm font-semibold text-white print:text-black">
                      {e.role} · {e.company}
                    </div>
                    <div className="text-xs text-zinc-500">
                      {e.start} {e.end ? `– ${e.end}` : "– Present"}
                    </div>
                  </div>
                  {e.location && (
                    <div className="text-xs text-zinc-500">{e.location}</div>
                  )}
                  <ul className="mt-2 list-outside space-y-1 text-sm text-zinc-300 print:text-black">
                    {e.bullets.map((b) => (
                      <li key={b} className="pl-4">
                        — {b}
                      </li>
                    ))}
                  </ul>
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
                        className="text-brand-400 hover:text-brand-300 print:text-black"
                        href={e.link}
                      >
                        More →
                      </a>
                    </div>
                  )}
                </article>
              ))}
            </div>
          </Section>

          {/* Projects (optional highlights) */}
          {resume.projects?.length ? (
            <Section title="Selected Projects">
              <div className="grid gap-3">
                {resume.projects.map((p) => (
                  <div key={p.title} className="avoid-break">
                    <div className="text-sm font-semibold text-white print:text-black">
                      {p.title}
                    </div>
                    {p.tagline && (
                      <div className="text-xs text-zinc-500">{p.tagline}</div>
                    )}
                    {p.bullets?.length ? (
                      <ul className="mt-1 space-y-1 text-sm text-zinc-300 print:text-black">
                        {p.bullets.map((b) => (
                          <li key={b} className="pl-4">
                            — {b}
                          </li>
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
                    {p.link && (
                      <div className="mt-1 text-xs">
                        <a
                          className="text-brand-400 hover:text-brand-300 print:text-black"
                          href={p.link}
                        >
                          Link →
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Section>
          ) : null}

          {/* Education */}
          {resume.education?.length ? (
            <Section title="Education">
              <div className="grid gap-3">
                {resume.education.map((ed) => (
                  <div key={ed.school} className="avoid-break">
                    <div className="text-sm font-semibold text-white print:text-black">
                      {ed.degree}
                    </div>
                    <div className="text-xs text-zinc-500">
                      {ed.school}
                      {ed.period ? ` · ${ed.period}` : ""}
                    </div>
                    {ed.details?.length ? (
                      <ul className="mt-1 space-y-1 text-sm text-zinc-300 print:text-black">
                        {ed.details.map((d) => (
                          <li key={d} className="pl-4">
                            — {d}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                ))}
              </div>
            </Section>
          ) : null}
        </div>
      </div>
    </main>
  );
}
