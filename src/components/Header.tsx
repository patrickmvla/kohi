// src/components/Header.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll state
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the drawer on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll + close on Esc while drawer is open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") setOpen(false);
      };
      window.addEventListener("keydown", onKey);
      return () => {
        document.body.style.overflow = prev;
        window.removeEventListener("keydown", onKey);
      };
    }
  }, [open]);

  const contactHref = "/contact";

  const nav: { href: string; label: string }[] = [
    { href: "/projects", label: "Projects" },
    // { href: "/blog", label: "Blog" },
    { href: "/reading", label: "Reading" },
    { href: contactHref, label: "Contact" },
    { href: "/about", label: "About" },
  ];

  const linkBase =
    "px-2 py-1 text-sm transition-colors rounded hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600";
  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    // exact or nested route (e.g., /projects/foo)
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      <a
        href="#main"
        className="fixed left-2 top-2 z-[100] sr-only rounded bg-black px-3 py-1 text-sm text-white focus:not-sr-only"
      >
        Skip to content
      </a>

      <header
        className={`sticky top-0 z-50 border-b border-white/10 backdrop-blur ${
          scrolled ? "bg-black/60" : "bg-black/30"
        }`}
      >
        <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <Link href="/" className="text-sm font-semibold tracking-tight">
            kohi
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-6 sm:flex">
            {nav.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`${linkBase} ${
                  isActive(href) ? "text-white" : "text-zinc-400"
                }`}
                aria-current={isActive(href) ? "page" : undefined}
              >
                {label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/resume"
              className="hidden rounded-md bg-white px-3 py-1.5 text-sm font-semibold text-black hover:bg-white/90 sm:inline-block"
            >
              Resume
            </Link>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-controls="mobile-menu"
              aria-expanded={open}
              className="inline-flex items-center justify-center rounded-md border border-white/10 px-2 py-1 text-sm text-zinc-300 hover:text-white sm:hidden"
            >
              <Menu className="size-4" aria-hidden="true" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile drawer */}
      {open && (
        <div
          className="fixed inset-0 z-[60] bg-black/70 backdrop-blur"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={`fixed inset-x-0 z-[70] mx-auto mt-3 w-full max-w-6xl px-4 transition-[transform,opacity] sm:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div
          className="rounded-xl border border-white/10 bg-black/70 p-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold">kohi</div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="rounded-md border border-white/10 px-2 py-1 text-sm text-zinc-300 hover:text-white"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-4 grid gap-2">
            {nav.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="rounded px-2 py-2 text-base text-zinc-300 hover:text-white"
                aria-current={isActive(href) ? "page" : undefined}
              >
                {label}
              </Link>
            ))}
            <Link
              href="/resume"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-md bg-white px-3 py-2 text-sm font-semibold text-black hover:bg-white/90"
            >
              Resume
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}