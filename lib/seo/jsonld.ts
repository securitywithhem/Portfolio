import {
  SITE_NAME,
  SITE_URL,
  SITE_DESCRIPTION,
  SOCIAL_URLS,
  CONTACT_EMAIL,
} from "./config";
import { profile } from "@/data/profile";
import { scenarios } from "@/lib/scenarios";

/** Person schema — site-wide identity. */
export function generatePersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE_NAME,
    jobTitle: profile.role,
    description: profile.bio,
    url: SITE_URL,
    email: CONTACT_EMAIL,
    homeLocation: profile.location,
    sameAs: SOCIAL_URLS,
    knowsAbout: [
      "Penetration Testing",
      "Vulnerability Assessment",
      "Governance, Risk & Compliance",
      "AI Security",
      "Cloud Infrastructure",
    ],
  };
}

/** WebSite schema, with the scenario sections as parts. */
export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    hasPart: scenarios.map((s) => ({
      "@type": "WebPageElement",
      name: s.title,
      description: s.summary,
      url: `${SITE_URL}/#${s.id}`,
    })),
  };
}
