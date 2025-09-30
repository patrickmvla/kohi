/* eslint-disable @typescript-eslint/no-explicit-any */

import Link from "next/link";
import { db } from "@/db/client";
import { posts } from "@/db/schema";
import { desc } from "drizzle-orm";
import DeletePostButton from "@/components/admin/DeletePostButton";

export default async function AdminPostsPage() {
  const list = db
    ? await db.select().from(posts).orderBy(desc(posts.publishedAt))
    : [];

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Posts</h2>
        <Link
          href="/admin/posts/new"
          className="rounded-md bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-500"
        >
          New post
        </Link>
      </div>

      {list.length === 0 ? (
        <p className="text-sm text-zinc-400">No posts yet.</p>
      ) : (
        <div className="grid gap-3">
          {list.map((p: any) => (
            <div
              key={p.id}
              className="flex items-center justify-between rounded-lg surface p-4"
            >
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold">{p.title}</div>
                <div className="mt-1 text-xs text-zinc-500">
                  {p.published ? "Published" : "Draft"} · {p.slug}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href={`/admin/posts/${p.id}`}
                  className="text-sm text-brand-400 hover:text-brand-300"
                >
                  Edit
                </Link>
                <DeletePostButton id={p.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
