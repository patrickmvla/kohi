// src/lib/schemas/post.ts
import { z } from "zod";

export const postSchema = z.object({
  title: z.string().trim().min(3, "Title is required").max(160),
  slug: z
    .string()
    .trim()
    .min(3, "Slug is required")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase and dashes"),
  excerpt: z.string().trim().max(300).optional().default(""),
  content: z.string().trim().optional().default(""),
  readingTime: z.coerce.number().int().min(1).max(120).optional().default(6),
  cover: z
    .string()
    .url("Enter a valid URL")
    .optional()
    .or(z.literal(""))
    .optional(),
  tags: z.array(z.string().trim()).optional().default([]),
  featured: z.coerce.boolean().optional().default(false),
  published: z.coerce.boolean().optional().default(false),
  publishedAt: z.coerce.date().optional().nullable(),
});

export type PostInput = z.input<typeof postSchema>;
export type PostOutput = z.output<typeof postSchema>;
