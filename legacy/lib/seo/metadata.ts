import { Metadata } from "next";
import { SITE_NAME, DEFAULT_OG_IMAGE, getAbsoluteUrl } from "./config";

/**
 * Metadata helper functions for per-page metadata generation.
 * Use these to override root layout metadata on specific pages.
 */

export interface PageMetadataProps {
  title: string;
  description: string;
  path: string;
  image?: {
    url: string;
    alt: string;
    width?: number;
    height?: number;
  };
  noindex?: boolean;
}

/**
 * Generate page metadata from a set of props. Handles title template,
 * canonical URL, OG image fallback, and Twitter card.
 */
export function generatePageMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  noindex = false,
}: PageMetadataProps): Metadata {
  const url = getAbsoluteUrl(path);

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    robots: noindex ? { index: false } : undefined,
    openGraph: {
      title,
      description,
      url,
      type: "website",
      images: [
        {
          url: image.url,
          width: image.width || 1200,
          height: image.height || 630,
          alt: image.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image.url],
    },
  };
}

/**
 * Home page metadata.
 */
export function homeMetadata(): Metadata {
  return generatePageMetadata({
    title: "Hem Gabhawala — Cybersecurity Engineer",
    description:
      "Offensive security specialist. Penetration testing, vulnerability assessment, and security tooling. Top 5% on TryHackMe.",
    path: "/",
  });
}

/**
 * Generic fallback for sections without explicit metadata.
 */
export function sectionMetadata(
  sectionName: string,
  description: string,
  path: string,
): Metadata {
  return generatePageMetadata({
    title: `${sectionName} — ${SITE_NAME}`,
    description,
    path,
  });
}
