export default function ContactCTA() {
  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="rounded-2xl surface p-6 text-center sm:p-10">
          <h2 className="text-2xl font-semibold">
            Let’s build something calm and reliable
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-zinc-400">
            Have a project where clarity, performance, and steady execution
            matter? I’m open to select collaborations.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href="mvlapatrick@gmail.com"
              className="rounded-md bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-500"
            >
              Email me
            </a>
            <a
              href="/resume"
              className="rounded-md border border-white/10 px-5 py-2.5 text-sm text-white hover:border-white/30"
            >
              Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
