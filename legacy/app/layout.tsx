import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/layout/footer";
import { SiteHeader } from "@/components/layout/site-header";
import { PageTransition } from "@/components/shared/page-transition";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { MotionProvider } from "@/components/providers/motion-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { LayoutClient } from "@/components/layout/layout-client";
import { getProfile } from "@/lib/data";
import { env } from "@/lib/env";
import { generatePersonSchema } from "@/lib/seo/jsonld";
import { DEFAULT_OG_IMAGE } from "@/lib/seo/config";
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
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description,
    images: [DEFAULT_OG_IMAGE.url],
  },
  icons: {
    icon: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const personSchema = generatePersonSchema();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-black text-white antialiased`}
      >
        <ThemeProvider>
          <MotionProvider>
            <LayoutClient>
              <ScrollProgress />
              <PageTransition />
              <SiteHeader />
              {children}
              <Footer />
            </LayoutClient>
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
