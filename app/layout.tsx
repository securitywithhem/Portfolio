import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/layout/footer";
import { SiteHeader } from "@/components/layout/site-header";
import { MotionProvider } from "@/components/providers/motion-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { getProfile } from "@/lib/data";
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

const { name, role } = getProfile();
const siteName = `${name} — Cybersecurity Portfolio`;
const description = `${name}, ${role}. Hands-on offensive security: penetration testing, security tooling, certifications, and TryHackMe achievements.`;

/**
 * Metadata (finalized copy in Phase 2.2, informed by the Hero: name, role,
 * one-line value prop). OG images land with the SEO phase. metadataBase
 * falls back to localhost until NEXT_PUBLIC_SITE_URL is set for the
 * deployed origin.
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
            <Footer />
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
