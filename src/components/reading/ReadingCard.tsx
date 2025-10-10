// src/components/reading/ReadingCard.tsx
"use client";

import { useState } from "react";
import type { ReadingItem } from "@/lib/reading";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";

function Stars({ rating = 0 }: { rating?: number }) {
  // Clamp 0–5 and round to nearest half
  const r = Math.max(0, Math.min(5, rating));
  const rounded = Math.round(r * 2) / 2;
  const full = Math.floor(rounded);
  const half = rounded - full >= 0.5;

  return (
    <div className="flex items-center gap-0.5" aria-label={`Rating: ${rounded} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const isFull = i < full;
        const isHalf = i === full && half;
        return (
          <span
            key={i}
            className={isFull || isHalf ? "text-amber-400" : "text-zinc-600"}
            aria-hidden="true"
            title={`${rounded}/5`}
          >
            {isHalf ? "☆" : "★"}
          </span>
        );
      })}
      <span className="sr-only">{rounded} out of 5</span>
    </div>
  );
}

export default function ReadingCard({ item }: { item: ReadingItem }) {
  const [loaded, setLoaded] = useState(false);
  const href = item.link;
  const cover = item.cover || "/images/reading/placeholder.jpg";

  const since =
    item.dateStarted && item.status === "reading"
      ? `since ${new Date(item.dateStarted).toLocaleDateString()}`
      : "";
  const finished =
    item.dateFinished && item.status === "finished"
      ? new Date(item.dateFinished).toLocaleDateString()
      : "";

  const Cover = (
    <div className="w-[72px] min-w-[72px]"> {/* ~ w-18 */}
      <AspectRatio ratio={2 / 3} className="overflow-hidden rounded-md border border-white/10 bg-white/5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={cover}
          alt={`${item.title} cover`}
          className="h-full w-full object-cover opacity-0 transition-opacity duration-300 data-[loaded=true]:opacity-100"
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          data-loaded={loaded}
        />
        {!loaded && (
          <Skeleton aria-hidden className="absolute inset-0" />
        )}
      </AspectRatio>
    </div>
  );

  return (
    <Card className="group rounded-xl border-white/10 bg-white/[0.04] transition-colors hover:border-white/20">
      <CardContent className="p-4">
        <div className="flex gap-4">
          {href ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
              aria-label={`Open source for ${item.title}`}
              title={item.title}
            >
              {Cover}
            </a>
          ) : (
            Cover
          )}

          <div className="min-w-0 flex-1">
            {/* Meta pills */}
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="border-white/10 text-zinc-400">
                {item.type}
              </Badge>
              <Badge
                variant="outline"
                className={
                  item.status === "reading"
                    ? "border-brand-600 bg-brand-600/10 text-white"
                    : "border-white/10 text-zinc-400"
                }
              >
                {item.status}
              </Badge>
              {finished && (
                <Badge variant="outline" className="border-white/10 text-zinc-400">
                  {finished}
                </Badge>
              )}
              {since && (
                <Badge variant="outline" className="border-white/10 text-zinc-400">
                  {since}
                </Badge>
              )}
            </div>

            {/* Title + author */}
            <h3 className="mt-1 truncate text-base font-semibold tracking-tight">
              {href ? (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
                  title={item.title}
                >
                  {item.title}
                </a>
              ) : (
                item.title
              )}
            </h3>
            <p className="truncate text-sm text-zinc-400">{item.author}</p>

            {/* Progress or rating */}
            {typeof item.progress === "number" ? (
              <div className="mt-3">
                <Progress
                  value={Math.max(0, Math.min(100, item.progress))}
                  className="h-1.5 bg-white/10"
                />
                <div className="mt-1 text-xs text-zinc-500">
                  {Math.round(item.progress)}%
                </div>
              </div>
            ) : item.status === "finished" && typeof item.rating === "number" ? (
              <div className="mt-2">
                <Stars rating={item.rating} />
              </div>
            ) : null}

            {/* Tags + source */}
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-zinc-400">
              {item.tags?.map((t) => (
                <Badge key={t} variant="outline" className="border-white/10 bg-transparent font-normal">
                  {t}
                </Badge>
              ))}
              {href && (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto text-brand-400 hover:text-brand-300"
                  aria-label={`Open source for ${item.title} in a new tab`}
                >
                  Source →
                </a>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}