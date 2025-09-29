export default function Contact() {
  return (
    <section id="contact" className="section">
      <div className="container">
        <h2 className="text-2xl font-semibold">Contact</h2>
        <form className="mt-6 grid max-w-md gap-4">
          <input
            type="email"
            placeholder="Email"
            className="rounded-md border border-white/10 bg-transparent px-3 py-2 outline-none ring-brand-600 focus:ring-2"
          />
          <textarea
            placeholder="Message"
            rows={4}
            className="rounded-md border border-white/10 bg-transparent px-3 py-2 outline-none ring-brand-600 focus:ring-2"
          />
          <button
            type="submit"
            className="rounded-md bg-brand-600 px-4 py-2 font-semibold text-white hover:bg-brand-500"
          >
            Send
          </button>
        </form>
      </div>
    </section>
  )
}