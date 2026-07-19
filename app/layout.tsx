import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "@/styles/globals.css";

/**
 * Two-typeface system (see /DESIGN.md):
 * Inter for narrative body/headings, JetBrains Mono for technical telemetry.
 */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

// Minimal metadata for Phase 1. Full SEO (OG/Twitter/JSON-LD/sitemap) lands in
// Phase 5 against the server-rendered DOM, per the Implementation Plan.
export const metadata: Metadata = {
  title: "Hem Gabhawala — Cybersecurity Portfolio",
  description:
    "Immersive, scenario-based cybersecurity portfolio: offensive security, GRC & compliance, AI-secured systems, and cloud infrastructure.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-dvh bg-bg text-fg antialiased">{children}</body>
    </html>
  );
}
