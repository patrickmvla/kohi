// src/db/schema.ts
import { sqliteTable, integer, text, index } from 'drizzle-orm/sqlite-core'
import { sql } from 'drizzle-orm'

// Contact emails
export const emails = sqliteTable(
  'emails',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    name: text('name').notNull(),
    email: text('email').notNull(),
    message: text('message').notNull(),
    status: text('status').notNull().default('received'), // received | sent | error
    resendId: text('resend_id'),
    error: text('error'),
    ip: text('ip'),
    userAgent: text('user_agent'),
    createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
    updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  },
  (t) => ({
    createdIdx: index('emails_created_idx').on(t.createdAt),
    statusIdx: index('emails_status_idx').on(t.status),
  })
)

// Blog posts
export const posts = sqliteTable(
  'posts',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    slug: text('slug').notNull().unique(),
    title: text('title').notNull(),
    excerpt: text('excerpt'),
    content: text('content'), // optional markdown content
    readingTime: integer('reading_time'),
    cover: text('cover'),
    tags: text('tags', { mode: 'json' }).$type<string[]>(), // JSON array of strings
    featured: integer('featured', { mode: 'boolean' }).notNull().default(false),
    published: integer('published', { mode: 'boolean' }).notNull().default(true),
    publishedAt: integer('published_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
    updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  },
  (t) => ({
    slugIdx: index('posts_slug_idx').on(t.slug),
    publishedIdx: index('posts_pub_idx').on(t.published, t.publishedAt),
  })
)