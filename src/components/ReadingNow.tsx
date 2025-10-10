// src/components/ReadingNow.tsx
export type Book = {
  title: string;
  author: string;
  cover?: string;
  progress?: number; // 0-100
};

import CoverImage from "@/components/ui/CoverImage";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const clamp = (n?: number) => Math.max(0, Math.min(100, n ?? 0));

export default function ReadingNow({ books }: { books: Book[] }) {
  if (!books?.length) return null;

  return (
    <section id="reading" aria-labelledby="reading-heading" className="section">
      <div className="container">
        <h2 id="reading-heading" className="text-2xl font-semibold">
          What I’m reading
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-zinc-400">
          Papers and books shaping my current thinking.
        </p>

        {/* Mobile: horizontal shelf */}
        <ScrollArea className="mt-6 sm:hidden">
          <ul role="list" className="-mx-1 flex snap-x snap-mandatory gap-3 px-1 pb-2">
            {books.map((b) => {
              const key = `${b.title}-${b.author}`;
              const p = clamp(b.progress);
              return (
                <li key={key} className="min-w-[14rem] shrink-0 snap-start">
                  <Card className="h-full border-white/10 bg-white/[0.04]">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <CoverImage src={b.cover} alt={`${b.title} cover`} widthClass="w-16" ratio="2 / 3" />
                        <div className="min-w-0">
                          <div className="truncate text-sm font-semibold">{b.title}</div>
                          <div className="mt-0.5 text-xs text-zinc-400">{b.author}</div>
                        </div>
                      </div>

                      {typeof b.progress === "number" && (
                        <div className="mt-3">
                          <Progress
                            value={p}
                            className="h-1.5 bg-white/10"
                            aria-label={`Reading progress for ${b.title}`}
                          />
                          <div className="mt-1 text-xs text-zinc-500">{p}%</div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </li>
              );
            })}
          </ul>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        {/* Desktop grid */}
        <ul role="list" className="mt-6 hidden gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-3">
          {books.map((b) => {
            const key = `${b.title}-${b.author}`;
            const p = clamp(b.progress);
            return (
              <li key={key}>
                <Card className="h-full border-white/10 bg-white/[0.04]">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <CoverImage src={b.cover} alt={`${b.title} cover`} widthClass="w-16" ratio="2 / 3" />
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-semibold">{b.title}</div>
                        <div className="mt-0.5 text-xs text-zinc-400">{b.author}</div>

                        {typeof b.progress === "number" && (
                          <div className="mt-3">
                            <Progress
                              value={p}
                              className="h-1.5 bg-white/10"
                              aria-label={`Reading progress for ${b.title}`}
                            />
                            <div className="mt-1 text-xs text-zinc-500">{p}%</div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}