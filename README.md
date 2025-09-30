# kohi — portfolio

Calm, reliable software. A Next.js portfolio with elegant UI, in‑depth projects, writing, reading, and a personality‑forward About. Built with Tailwind v4 and Bun.

## Features

- Next.js App Router (15.x) + Bun
- Tailwind CSS v4 with design tokens (@theme)
- JetBrains Mono (self‑host option) with system‑mono fallback
- Elegant header, landing, and compact About page
- Projects
  - Featured case study, filter/search, sort, grid/list toggle
  - Media fallback (Lucide icon if no image)
- Blog
  - Static posts with optional DB source (Turso + Drizzle)
- Reading
  - “Currently reading” shelf and full explorer with progress
  - Robust CoverImage component (ratio lock + graceful fallback)
- Contact
  - Resend email via API route
  - react‑hook‑form + Zod validation, honeypot + time trap
- Resume
  - Print‑ready page with subtle “Download PDF” button
- Admin (optional)
  - Protected with Basic Auth (ENV)
  - Create/edit/delete blog posts (Turso + Drizzle)
- Extras
  - OG image route, RSS, sitemap
  - Command palette (⌘K) snippet included

## Tech stack

- Next.js 15 (App Router) — Webpack runtime
- Bun (package manager and scripts)
- Tailwind CSS v4 (no tailwind.config.*; themed via CSS)
- Drizzle ORM + Turso (libSQL) — optional
- Resend (transactional email)
- Zod + react‑hook‑form
- lucide-react (icons)

## Getting started

Prereqs
- Bun installed (https://bun.sh)
- Node 18+ (for tooling)
- Optional: Turso account (https://turso.tech)
- Optional: Resend account (https://resend.com)

Clone and install
```bash
git clone <your-repo-url> kohi
cd kohi
bun install
```

Environment
- Copy .env.example to .env.local and fill values.
```bash
cp .env.example .env.local
```

Run dev
```bash
bun run dev
```
Visit http://localhost:3000

Build
```bash
bun run build
bun run start
```

## Project structure (key files)

- app/
  - page.tsx — landing
  - about/page.tsx — in‑depth, compact, personal
  - projects/page.tsx — hero + featured + explorer
  - blog/page.tsx — blog index (static or DB fallback)
  - contact/page.tsx — validated contact form (RHF + Zod)
  - resume/page.tsx — print‑ready resume
  - api/contact/route.ts — Resend email endpoint
  - opengraph-image.tsx — site OG image
  - rss.xml/route.ts — RSS
  - sitemap.ts — sitemap
- components/
  - Header, Hero, Skills, FeaturedWork, Principles, BlogTeaser, ReadingNow, ContactRHF, ContactCTA
  - projects/: ProjectsExplorer, CaseStudyCard, FeaturedCaseStudy, ProjectMedia
  - blog/: BlogHero, FeaturedPost, PostCard, BlogExplorer
  - reading/: ReadingHero, ReadingExplorer, ReadingCard, CurrentlyReading
  - ui/: CoverImage, PrintButton
- lib/
  - posts.ts — static blog posts (fallback)
  - case-studies.ts — your project data (with optional icon names)
  - reading.ts — “currently reading” data
  - faves.ts — Top films/TV for About
  - resume.ts — resume data source
- db/ (optional DB)
  - schema.ts — emails, posts tables
  - client.ts — Drizzle + Turso client
  - queries.ts — blog queries
- middleware.ts — Basic Auth (admin)
- app/globals.css — Tailwind v4 import, tokens, helpers

## Environment variables

See .env.example for all keys.

Minimum for dev:
- NEXT_PUBLIC_SITE_URL
- RESEND_API_KEY, CONTACT_FROM, CONTACT_TO (for Contact form)
- Optional DB: TURSO_DATABASE_URL, TURSO_AUTH_TOKEN
- Optional Admin: ADMIN_USER, ADMIN_PASS

## Styling and tokens

Tailwind v4 via CSS:
- app/globals.css contains:
  - @import "tailwindcss";
  - @theme with brand colors and font tokens
  - Utilities: .section, .section-compact, .surface, .container, .hairline
- Compact spacing:
  - Wrap a page with <main className="section-compact"> to tighten vertical rhythm.

Customize brand
- Edit @theme in app/globals.css (colors starting with --color-brand-*)

Fonts (JetBrains Mono)
- Recommended: self‑host with next/font/local
  - Place .woff2 in public/fonts/jetbrains-mono/
  - In app/layout.tsx use localFont and set variable: --font-jetbrains
- Fallback in @theme: --font-mono uses system monospace when font is unavailable

## Content updates

Projects (case studies)
- lib/case-studies.ts
  - Add or edit entries; image optional
  - icon?: string uses Lucide fallback in ProjectMedia
    - Supported in code: 'Mail', 'Wand2', 'Link', 'FileText' (extend iconMap in ProjectMedia.tsx)

Blog
- By default uses lib/posts.ts
- If DB is configured and migrated, blog index will pull from Turso; otherwise falls back to static posts

Reading
- lib/reading.ts — add items with title, author, status, cover (remote or local)
- Images:
  - Remote URLs are fine (CoverImage handles errors)
  - Or place under public/images/reading/

About favorites (films/TV)
- lib/faves.ts — titles, years, poster paths
- Place poster images under:
  - public/images/faves/films/
  - public/images/faves/shows/
- Missing posters fall back to a placeholder (public/images/reading/placeholder.svg)

Resume
- lib/resume.ts — update your details
- Print from /resume via the subtle “Download PDF” button (PrintButton)

## Contact form (Resend)

- Client: components/ContactRHF.tsx
  - react‑hook‑form + Zod validation
  - Honeypot and time trap
- API: app/api/contact/route.ts
  - Validates again with Zod
  - Sends via Resend
  - Optionally records to DB (emails table) if configured

Setup
- Set RESEND_API_KEY, CONTACT_FROM (verified domain), CONTACT_TO
- Test at /contact

## Database (optional)

Drizzle + Turso
- Configure env:
  - TURSO_DATABASE_URL, TURSO_AUTH_TOKEN
- Migrations:
```bash
bunx drizzle-kit generate
bunx drizzle-kit push:sqlite
bunx drizzle-kit studio  # optional UI
```
- Seed (optional example in src/db/seed.ts):
```bash
bun run src/db/seed.ts
```

Admin dashboard
- Basic Auth via middleware.ts
- Env: ADMIN_USER, ADMIN_PASS
- Routes:
  - /admin — dashboard
  - /admin/posts — manage blog posts
  - API under /api/admin/posts

Note: Pages that hit the DB export runtime = 'nodejs'.

## Images and media

- CoverImage component guarantees:
  - Aspect ratio (default 2/3)
  - Skeleton fade‑in
  - Placeholder fallback if remote fails (public/images/reading/placeholder.svg)
- For project media without images, Lucide icon fallback keeps layouts intact.

## Commands

```bash
bun run dev     # start dev server
bun run build   # build
bun run start   # start production server
# DB (optional)
bunx drizzle-kit generate
bunx drizzle-kit push:sqlite
bunx drizzle-kit studio
```

## Deployment

- Vercel recommended
- Set env vars in the project settings
- Ensure any DB‑touching routes/pages use runtime 'nodejs'
- If self‑hosting fonts, include the woff2 files in public/fonts

## Troubleshooting

- JetBrains Mono download timeout
  - Use next/font/local (self‑host) or rely on system monospace fallback
- Broken book/film covers (404)
  - Verify file paths under public/images/... or let CoverImage fallback handle it
- DB query failures
  - Ensure TURSO envs set, run migrations, confirm schema in studio
- Resend errors
  - Verify CONTACT_FROM domain in Resend, check API key and inbox spam
- Admin 401/503
  - Set ADMIN_USER/ADMIN_PASS; middleware protects /admin and /api/admin/*

## Roadmap (optional)

- Per‑post OG images
- TOC + footnotes for long blog posts
- TMDb integration to auto‑pull posters
- Supabase storage for project/reading images
- Case study pages in MDX (re‑enable MDX if desired)

---

