import type { Metadata } from "next";
import "./globals.css";
import { JetBrains_Mono } from "next/font/google";
import Header from "@/components/Header";

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  weight: ["400", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "kohi — software engineer",
  description:
    "An elegant portfolio by kohi. In-depth projects, writing, and what I’m reading.",
  metadataBase: new URL("https://your-domain.com"),
  openGraph: {
    title: "kohi — software engineer",
    description: "In-depth projects, writing, and what I’m reading.",
    url: "https://your-domain.com",
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jetbrains.variable}`}>
      <body className="font-mono antialiased">
        <Header />
        {children}
      </body>
    </html>
  );
}
