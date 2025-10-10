// src/app/layout.tsx
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { JetBrains_Mono } from "next/font/google";
import Header from "@/components/Header";

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  weight: ["400", "600", "700", "800"],
});

// Prefer setting this in your .env as NEXT_PUBLIC_SITE_URL
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kohii.vercel.app";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0b" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "kohi — software engineer",
    template: "%s — kohi",
  },
  description:
    "An elegant portfolio by kohi. In-depth projects, writing, and what I’m reading.",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "kohi — software engineer",
    description: "In-depth projects, writing, and what I’m reading.",
    url: SITE_URL,
    siteName: "kohi",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "kohi — software engineer",
    description: "In-depth projects, writing, and what I’m reading.",
    images: ["/og.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: ["/favicon-16x16.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={jetbrains.variable}>
      <body className="font-mono bg-black text-zinc-100 antialiased selection:bg-brand-600/30 selection:text-white">
        <Header />
        {/* Centralize skip link target without adding layout wrappers */}
        <div id="main" className="contents">
          {children}
        </div>
      </body>
    </html>
  );
}