// src/db/queries.ts
import { db } from '@/db/client'
import { posts } from '@/db/schema'
import { desc, eq } from 'drizzle-orm'

export async function getPublishedPosts() {
  if (!db) return []
  return db.select().from(posts).where(eq(posts.published, true)).orderBy(desc(posts.publishedAt))
}

export async function getFeaturedPosts(limit = 2) {
  if (!db) return []
  return db
    .select()
    .from(posts)
    .where(eq(posts.featured, true))
    .orderBy(desc(posts.publishedAt))
    .limit(limit)
}