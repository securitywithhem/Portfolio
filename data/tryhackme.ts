import type { Certificate } from "@/lib/types";

/**
 * TryHackMe learning paths — same Certificate schema, distinct source (a
 * hands-on platform, not a formal credentialing body). The two pentesting paths
 * lead; foundational paths follow as evidence of the offensive base.
 */
export const tryHackMe = [
  {
    id: "thm-offensive-pentesting",
    title: "Offensive Pentesting",
    issuer: "TryHackMe",
    date: "2025-08-06",
    credentialUrl: null,
  },
  {
    id: "thm-web-app-pentesting",
    title: "Web Application Pentesting",
    issuer: "TryHackMe",
    date: "2025-09-20",
    credentialUrl: null,
  },
  {
    id: "thm-jr-pentester",
    title: "Jr Penetration Tester",
    issuer: "TryHackMe",
    date: "2025-05-01",
    credentialUrl: null,
  },
  {
    id: "thm-web-fundamentals",
    title: "Web Fundamentals",
    issuer: "TryHackMe",
    date: "2025-03-01",
    credentialUrl: null,
  },
  {
    id: "thm-cyber-security-101",
    title: "Cyber Security 101",
    issuer: "TryHackMe",
    date: "2025-01-01",
    credentialUrl: null,
  },
  {
    id: "thm-pre-security",
    title: "Pre Security",
    issuer: "TryHackMe",
    date: "2024-12-01",
    credentialUrl: null,
  },
] satisfies Certificate[];

export const tryHackMeSorted = [...tryHackMe].sort((a, b) =>
  b.date.localeCompare(a.date),
);

/** Headline achievement stats (from the resume / TryHackMe profile). */
export const tryHackMeStats = [
  { label: "GLOBAL RANK", value: "Top 2%" },
  { label: "LABS COMPLETED", value: "175+" },
  { label: "LEARNING PATHS", value: String(tryHackMe.length) },
];

export const tryHackMeProfileUrl = "https://tryhackme.com/p/SecurityWithHem";
