import type { Certificate } from "@/lib/types";

/**
 * TryHackMe learning paths and achievements. Uses the same Certificate schema
 * as formal certifications (lib/types/certificate.ts) but is a distinct data
 * source — TryHackMe is a hands-on learning platform, not a formal
 * credentialing body. Ordered newest-first at read time.
 *
 * The two "Featured" pentesting paths lead; the foundational paths follow as
 * supporting evidence of the offensive base (positioning v2). Add profile /
 * completion URLs where applicable (see data/README.md).
 */
export const tryHackMeAchievements = [
  {
    id: "thm-offensive-pentesting",
    title: "Offensive Pentesting",
    issuer: "TryHackMe",
    date: "2025-08-01",
    credentialUrl: null,
  },
  {
    id: "thm-web-app-pentesting",
    title: "Web Application Pentesting",
    issuer: "TryHackMe",
    date: "2025-09-01",
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
