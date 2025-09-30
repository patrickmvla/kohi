/* eslint-disable @typescript-eslint/no-explicit-any */

import { db } from "@/db/client";
import { posts } from "@/db/schema";
import { postSchema } from "@/lib/schemas/post";
import { desc } from "drizzle-orm";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  if (!db) return NextResponse.json([], { status: 200 });
  const list = await db.select().from(posts).orderBy(desc(posts.publishedAt));
  return NextResponse.json(list);
}

export async function POST(req: Request) {
  if (!db)
    return NextResponse.json({ error: "DB not configured" }, { status: 503 });
  const body = await req.json().catch(() => null);
  const parsed = postSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }
  const data = parsed.data;
  try {
    const now = new Date();
    const values = {
      slug: data.slug,
      title: data.title,
      excerpt: data.excerpt || "",
      content: data.content || "",
      readingTime: data.readingTime ?? 6,
      cover: data.cover || null,
      tags: data.tags ?? [],
      featured: !!data.featured,
      published: !!data.published,
      publishedAt: data.published ? data.publishedAt ?? now : null,
      updatedAt: now,
    };
    const inserted = await db.insert(posts).values(values).returning();
    return NextResponse.json(inserted[0], { status: 201 });
  } catch (e: any) {
    const msg = String(e?.message || e);
    if (
      msg.includes("UNIQUE") ||
      msg.includes("constraint") ||
      msg.includes("slug")
    ) {
      return NextResponse.json(
        { error: "Slug already exists" },
        { status: 409 }
      );
    }
    console.error("POST /api/admin/posts error", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
