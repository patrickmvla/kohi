// components/Principles.tsx
import { Card, CardContent } from "@/components/ui/card";

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
    body: "Keyboard-first, screen reader–aware, and readable in any theme.",
  },
];

export default function Principles() {
  return (
    <section aria-labelledby="principles-heading" className="section">
      <div className="container">
        <h2
          id="principles-heading"
          className="relative text-2xl font-semibold after:mt-2 after:block after:h-px after:w-12 after:bg-white/10"
        >
          Principles
        </h2>

        <ul role="list" className="mt-6 grid gap-4 sm:grid-cols-3">
          {items.map((it) => (
            <li key={it.title} className="h-full">
              <Card className="h-full border-white/8 bg-white/[0.03]">
                <CardContent className="p-5">
                  <h3 className="text-base font-semibold">{it.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-400">{it.body}</p>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}