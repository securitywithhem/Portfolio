import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { SiteHeader } from "@/components/layout/site-header";
import { Footer } from "@/components/layout/footer";
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
      <body className="min-h-dvh bg-bg text-fg antialiased">
        <a
          href="#hero"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:rounded-[2px] focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-on"
        >
          Skip to content
        </a>
        <SiteHeader />
        {children}
        <Footer />
      </body>
    </html>
  );
}
