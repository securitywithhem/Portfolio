import { profile } from "@/data/profile";
import { env } from "@/lib/env";

/**
 * Centralized SEO configuration. Every page extends this, never redefines
 * it from scratch (DRY principle). All URLs and branding pull from here.
 */

export const SITE_NAME = "Hem Gabhawala";
export const SITE_DESCRIPTION = profile.bio;
export const SITE_URL = env.NEXT_PUBLIC_SITE_URL || "https://hemgabhawala.com";

export const TWITTER_HANDLE = "@SecurityWithHem";
export const CONTACT_EMAIL = "hhgabhawala0807@gmail.com";
export const LOCALE = "en-US";

/**
 * Default Open Graph image — used if a page doesn't override.
 * Serve a real image from /public/og-default.png for production.
 * For now, use a simple text-based fallback via next/og.
 */
export const DEFAULT_OG_IMAGE = {
  url: `${SITE_URL}/og-default.png`,
  width: 1200,
  height: 630,
  alt: `${SITE_NAME} — ${profile.role}`,
};

/**
 * Social profiles (source: Profile data, verified in Phase 2.2).
 * Used in Person schema sameAs field.
 */
export const SOCIAL_URLS = profile.socials.map((s) => s.url);

/**
 * Structured data builder helpers — URLs and names that repeat.
 */
export const getAbsoluteUrl = (path: string): string => {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
};

export const getImageUrl = (relativePath: string): string => {
  return getAbsoluteUrl(`/images/${relativePath}`);
};
