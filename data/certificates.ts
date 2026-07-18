import type { Certificate } from "@/lib/types";

/**
 * Professional certifications and completed learning paths from traditional
 * issuers (CompTIA, ISC², Google, Coursera, etc.) — separate from
 * TryHackMe achievements (see data/tryhackme.ts, which uses the same
 * Certificate schema but is a distinct content source).
 *
 * Entries are realistic placeholders — replace titles/dates with your
 * actual credentials and add verification URLs where issuers provide them
 * (see data/README.md).
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
    id: "cert-isc2-cc",
    title: "Certified in Cybersecurity (CC)",
    issuer: "ISC2",
    date: "2026-02-10",
    credentialUrl: null,
  },
] satisfies Certificate[];
