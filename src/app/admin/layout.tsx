// src/app/admin/layout.tsx
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="section">
      <div className="container">
        <header className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Admin</h1>
          <nav className="flex gap-4 text-sm text-zinc-400">
            <Link href="/admin/posts" className="hover:text-white">
              Posts
            </Link>
            <Link href="/" className="hover:text-white">
              View site →
            </Link>
          </nav>
        </header>
        {children}
      </div>
    </main>
  );
}
