import { env } from "@/lib/env";
import { profile } from "@/data/profile";

export const SITE_NAME = profile.name;
/**
 * Canonical origin, resolved in order of specificity: an explicit override,
 * then Vercel's production domain (present on every Vercel build), then local
 * dev. Every consumer is server-rendered, so the non-public Vercel var is safe.
 */
export const SITE_URL =
  env.NEXT_PUBLIC_SITE_URL ??
  (env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");
export const SITE_TITLE = `${profile.name} — Cybersecurity Portfolio`;
export const SITE_DESCRIPTION =
  "Cybersecurity engineer working across offensive security (VAPT), cloud and AI security, moving into GRC. Top 2% on TryHackMe, 175+ hands-on labs, three security platforms built. Available for security internships.";
export const CONTACT_EMAIL = profile.email;
export const SOCIAL_URLS = profile.socials.map((s) => s.url);

export function getAbsoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}
