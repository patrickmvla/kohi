import PostForm from "@/components/admin/PostForm";

export default function NewPostPage() {
  return (
    <section className="rounded-2xl surface p-6">
      <h2 className="text-lg font-semibold">New post</h2>
      <div className="mt-4">
        <PostForm mode="create" />
      </div>
    </section>
  );
}
