import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { SiteHeader } from "@/components/layout/site-header";
import { Footer } from "@/components/layout/footer";
import { CapabilityProvider } from "@/lib/capability";
import {
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
  SITE_DESCRIPTION,
} from "@/lib/seo/config";
import { generatePersonSchema, generateWebsiteSchema } from "@/lib/seo/jsonld";
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

// OpenGraph/Twitter images are auto-populated by Next from app/opengraph-image.tsx.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: `%s — ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  keywords: [
    "cybersecurity",
    "penetration testing",
    "VAPT",
    "GRC",
    "AI security",
    "cloud security",
    "portfolio",
    SITE_NAME,
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-dvh bg-bg text-fg antialiased">
        <script
          type="application/ld+json"
          // Structured data (data, not executed script). Content is built from
          // static site data, so this is safe to inline.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              generatePersonSchema(),
              generateWebsiteSchema(),
            ]),
          }}
        />
        <a
          href="#hero"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:rounded-[2px] focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-on"
        >
          Skip to content
        </a>
        <CapabilityProvider>
          <SiteHeader />
          {children}
          <Footer />
        </CapabilityProvider>
      </body>
    </html>
  );
}
