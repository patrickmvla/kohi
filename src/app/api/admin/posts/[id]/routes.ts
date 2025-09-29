// src/app/api/admin/posts/[id]/route.ts
import { NextResponse } from 'next/server'
import { db } from '@/db/client'
import { posts } from '@/db/schema'
import { postSchema } from '@/lib/schemas/post'
import { eq } from 'drizzle-orm'

export const runtime = 'nodejs'

export async function PATCH(req: Request, ctx: { params: { id: string } }) {
  if (!db) return NextResponse.json({ error: 'DB not configured' }, { status: 503 })
  const id = Number(ctx.params.id)
  if (Number.isNaN(id)) return NextResponse.json({ error: 'Invalid id' }, { status: 400 })

  const body = await req.json().catch(() => null)
  const parsed = postSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Validation failed', issues: parsed.error.flatten() }, { status: 400 })
  }

  const data = parsed.data
  try {
    const now = new Date()
    const values = {
      slug: data.slug,
      title: data.title,
      excerpt: data.excerpt || '',
      content: data.content || '',
      readingTime: data.readingTime ?? 6,
      cover: data.cover || null,
      tags: data.tags ?? [],
      featured: !!data.featured,
      published: !!data.published,
      publishedAt: data.published ? (data.publishedAt ?? now) : null,
      updatedAt: now,
    }
    const updated = await db.update(posts).set(values).where(eq(posts.id, id)).returning()
    if (!updated[0]) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(updated[0])
  } catch (e: any) {
    const msg = String(e?.message || e)
    if (msg.includes('UNIQUE') || msg.includes('constraint') || msg.includes('slug')) {
      return NextResponse.json({ error: 'Slug already exists' }, { status: 409 })
    }
    console.error('PATCH /api/admin/posts/[id] error', e)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function DELETE(_req: Request, ctx: { params: { id: string } }) {
  if (!db) return NextResponse.json({ error: 'DB not configured' }, { status: 503 })
  const id = Number(ctx.params.id)
  if (Number.isNaN(id)) return NextResponse.json({ error: 'Invalid id' }, { status: 400 })
  await db.delete(posts).where(eq(posts.id, id))
  return NextResponse.json({ ok: true })
}