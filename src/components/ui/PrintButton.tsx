// src/components/ui/PrintButton.tsx
"use client";

import { Download, Printer } from "lucide-react";

type Props = {
  label?: string;         // button text
  className?: string;     // extra classes
  pdfUrl?: string;        // optional: direct PDF to download
  fileName?: string;      // optional: name for downloaded file
};

export default function PrintButton({
  label = "Download PDF",
  className = "",
  pdfUrl,
  fileName = "resume.pdf",
}: Props) {
  const isDownload = Boolean(pdfUrl);

  const handleClick = () => {
    if (isDownload && pdfUrl) {
      // Download the provided PDF (safe, no navigation)
      const a = document.createElement("a");
      a.href = pdfUrl;
      a.download = fileName;
      a.rel = "noopener";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } else {
      // Print the current page
      // Slight delay helps certain browsers render before opening dialog
      requestAnimationFrame(() => window.print());
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={[
        "inline-flex items-center gap-1.5 rounded-md",
        "border border-white/10 bg-transparent px-2.5 py-1.5 text-xs",
        "text-zinc-400 hover:text-white hover:border-white/20",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600/60",
        "transition-colors print:hidden",
        className,
      ].join(" ")}
      aria-label={label}
      title={label}
    >
      {isDownload ? (
        <Download className="size-3.5 opacity-80" aria-hidden="true" />
      ) : (
        <Printer className="size-3.5 opacity-80" aria-hidden="true" />
      )}
      <span>{label}</span>
    </button>
  );
}