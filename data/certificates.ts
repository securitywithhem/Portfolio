import type { Certificate } from "@/lib/types";

/**
 * Formal certifications (non-TryHackMe) — governance and AI/cloud foundations
 * layered on the offensive base. TryHackMe achievements live in
 * data/tryhackme.ts (same schema, distinct source). Add verification URLs where
 * issuers provide them.
 */
export const certificates = [
  {
    id: "cert-google-cybersecurity",
    title: "Google Cybersecurity Professional Certificate",
    issuer: "Google / Coursera",
    date: "2024-11-01",
    credentialUrl: null,
  },
  {
    id: "cert-aws-ml-foundations",
    title: "AWS Academy — Machine Learning Foundations",
    issuer: "AWS Academy",
    date: "2026-04-01",
    credentialUrl: null,
  },
  {
    id: "cert-aws-data-engineering",
    title: "AWS Academy — Data Engineering",
    issuer: "AWS Academy",
    date: "2026-04-01",
    credentialUrl: null,
  },
  {
    id: "cert-isea",
    title: "Information Security Education and Awareness (ISEA)",
    issuer: "CDAC / MeitY",
    date: "2024-07-24",
    credentialUrl: null,
  },
] satisfies Certificate[];

/** Newest first. */
export const certificatesSorted = [...certificates].sort((a, b) =>
  b.date.localeCompare(a.date),
);
