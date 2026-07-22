import {
  SITE_NAME,
  SITE_URL,
  SITE_DESCRIPTION,
  SOCIAL_URLS,
  CONTACT_EMAIL,
} from "./config";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";

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

/** WebSite schema, with the built projects as parts. */
export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    hasPart: projects.map((project) => ({
      "@type": "SoftwareSourceCode",
      name: project.title,
      description: project.description,
      programmingLanguage: project.techStack,
      author: { "@type": "Person", name: SITE_NAME },
      ...(project.github ? { codeRepository: project.github } : {}),
      url: `${SITE_URL}/#work`,
    })),
  };
}
