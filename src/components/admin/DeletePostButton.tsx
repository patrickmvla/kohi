"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeletePostButton({ id }: { id: number }) {
  const [pending, setPending] = useState(false);
  const router = useRouter();
  const onDelete = async () => {
    if (!confirm("Delete this post?")) return;
    setPending(true);
    try {
      const res = await fetch(`/api/admin/posts/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error(await res.text());
      router.refresh();
    } catch {
      alert("Failed to delete.");
    } finally {
      setPending(false);
    }
  };
  return (
    <button
      onClick={onDelete}
      disabled={pending}
      className="rounded-md border border-white/10 px-3 py-1.5 text-sm text-zinc-300 hover:text-white disabled:opacity-60"
    >
      {pending ? "Deleting…" : "Delete"}
    </button>
  );
}
