import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteHeader } from "@/components/layout/site-header";
import { MotionProvider } from "@/components/providers/motion-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { env } from "@/lib/env";
import "@/styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteName = "Hem Gabhawala — Cybersecurity Portfolio";
const description =
  "Cybersecurity portfolio of Hem Gabhawala: projects, certifications, and experience.";

/**
 * Metadata scaffold (Phase 1C): structure is final; copy and OG images are
 * finalized with real content in later phases. metadataBase falls back to
 * localhost until NEXT_PUBLIC_SITE_URL is set for the deployed origin.
 */
export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: siteName,
    template: "%s — Hem Gabhawala",
  },
  description,
  openGraph: {
    type: "website",
    url: "/",
    siteName,
    title: siteName,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <MotionProvider>
            <SiteHeader />
            {children}
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
