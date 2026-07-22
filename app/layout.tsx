import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import { CapabilityProvider } from "@/lib/capability";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/footer";
import {
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
  SITE_DESCRIPTION,
} from "@/lib/seo/config";
import { generatePersonSchema, generateWebsiteSchema } from "@/lib/seo/jsonld";
import "@/styles/globals.css";

/**
 * One typeface, shown across its range — see styles/globals.css.
 *
 * Archivo is variable on both width (62–125) and weight (100–900), and the
 * width axis is what carries hierarchy here: expanded for display, normal for
 * reading, condensed for dense data. A single family exercised properly beats
 * a display+body pair that hedges, and it means there is no second font to
 * load at all.
 *
 * "optional" because the hero <h1> is the LCP element and a fallback-font swap
 * there was the largest layout-shift contributor; the browser skips the swap
 * once the metric-matched fallback has painted, trading a rare cold-cache
 * mismatch for zero CLS.
 */
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "optional",
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
    <html lang="en" className={archivo.variable}>
      <body className="min-h-dvh bg-paper text-ink antialiased">
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
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:rounded-[2px] focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-on"
        >
          Skip to content
        </a>
        <SiteHeader />
        <CapabilityProvider>{children}</CapabilityProvider>
        <SiteFooter />
      </body>
    </html>
  );
}
