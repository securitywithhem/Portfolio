import type { Certificate } from "@/lib/types";

/**
 * Formal certifications (non-TryHackMe) — traces the same arc as the rest of
 * the portfolio: risk/governance and AI/cloud foundations layered on top of
 * the offensive base. TryHackMe achievements live in data/tryhackme.ts (same
 * Certificate schema, distinct source). Add verification URLs where issuers
 * provide them (see data/README.md).
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
] satisfies Certificate[];
