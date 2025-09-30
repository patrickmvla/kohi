// components/Principles.tsx
const items = [
  {
    title: "Clarity first",
    body: "Simple interfaces, strong defaults, and APIs that are hard to misuse.",
  },
  {
    title: "Measure, then optimize",
    body: "Budgets over averages. Observe the tail and design for p99s.",
  },
  {
    title: "Accessibility by default",
    body: "Keyboard‑first, screen‑reader aware, and readable in any theme.",
  },
];

export default function Principles() {
  return (
    <section className="section">
      <div className="container">
        <h2 className="text-2xl font-semibold">Principles</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {items.map((it) => (
            <div key={it.title} className="rounded-xl surface p-5">
              <h3 className="text-base font-semibold">{it.title}</h3>
              <p className="mt-2 text-sm text-zinc-400">{it.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
