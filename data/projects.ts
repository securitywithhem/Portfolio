import type { Project } from "@/lib/types";

/**
 * Portfolio projects. The three entries below are named in Docs/01_PRD.md.
 * Descriptions are realistic drafts — refine wording, add real repo/live
 * URLs, and drop screenshots into /public/images/projects/ (see
 * data/README.md for the checklist).
 */
export const projects = [
  {
    id: "proj-vaultiq",
    title: "VaultIQ",
    slug: "vaultiq",
    description:
      "Secure credential management platform with client-side encryption. Secrets are encrypted with AES-256-GCM before they ever leave the browser, with key derivation via Argon2id. Includes password-health scoring, breach-exposure checks against Have I Been Pwned, and an audit log of every vault action.",
    techStack: ["Next.js", "TypeScript", "Web Crypto API", "PostgreSQL"],
    images: [],
    github: null,
    live: null,
    featured: true,
  },
  {
    id: "proj-dharma",
    title: "Dharma",
    slug: "dharma",
    description:
      "Security automation toolkit that streamlines reconnaissance and reporting for penetration-testing engagements. Chains subdomain enumeration, port scanning, and service fingerprinting into a single pipeline and renders findings into a clean, client-ready report.",
    techStack: ["Python", "Nmap", "Docker", "FastAPI"],
    images: [],
    github: null,
    live: null,
    featured: true,
  },
  {
    id: "proj-api-pentesting",
    title: "API Pentesting",
    slug: "api-pentesting",
    description:
      "Hands-on API security research project: a documented methodology for testing REST APIs against the OWASP API Security Top 10, exercised against deliberately vulnerable targets (crAPI, VAmPI). Covers broken object-level authorization, mass assignment, and rate-limiting bypasses, with write-ups of each finding and its remediation.",
    techStack: ["Burp Suite", "Postman", "OWASP API Top 10", "Python"],
    images: [],
    github: null,
    live: null,
    featured: true,
  },
] satisfies Project[];
