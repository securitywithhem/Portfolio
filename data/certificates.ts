import type { Certificate } from "@/lib/types";

/**
 * Certifications and completed learning paths. Entries are realistic
 * placeholders — replace titles/dates with your actual credentials and add
 * verification URLs where issuers provide them (see data/README.md).
 */
export const certificates = [
  {
    id: "cert-google-cybersecurity",
    title: "Google Cybersecurity Professional Certificate",
    issuer: "Google / Coursera",
    date: "2025-06-15",
    credentialUrl: null,
  },
  {
    id: "cert-thm-jr-pentester",
    title: "Jr Penetration Tester Learning Path",
    issuer: "TryHackMe",
    date: "2025-11-20",
    credentialUrl: null,
  },
  {
    id: "cert-isc2-cc",
    title: "Certified in Cybersecurity (CC)",
    issuer: "ISC2",
    date: "2026-02-10",
    credentialUrl: null,
  },
] satisfies Certificate[];
