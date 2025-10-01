import { notFound } from "next/navigation";
import { db } from "@/db/client";
import { posts } from "@/db/schema";
import { eq } from "drizzle-orm";
import PostForm from "@/components/admin/PostForm";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const postId = Number(id);
  if (!db || Number.isNaN(postId)) notFound();

  const row =
    (await db.select().from(posts).where(eq(posts.id, postId)).limit(1))[0] ||
    null;

  if (!row) notFound();

  return (
    <section className="rounded-2xl surface p-6">
      <h2 className="text-lg font-semibold">Edit post</h2>
      <div className="mt-4">
        <PostForm
          mode="edit"
          initial={{
            id: row.id,
            title: row.title,
            slug: row.slug,
            excerpt: row.excerpt ?? "",
            content: row.content ?? "",
            readingTime: row.readingTime ?? 6,
            cover: row.cover ?? "",
            tags: row.tags ?? [],
            featured: !!row.featured,
            published: !!row.published,
            publishedAt: row.publishedAt ?? null,
          }}
        />
      </div>
    </section>
  );
}
