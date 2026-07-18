import type { Certificate } from "@/lib/types";

/**
 * TryHackMe learning paths and achievements. Uses the same Certificate
 * schema as professional certifications (lib/types/certificate.ts) but is
 * a distinct data source reflecting the platform's role as a hands-on
 * learning platform rather than a formal credentialing body.
 *
 * Entries are realistic placeholders — replace titles/dates with your
 * actual TryHackMe completion dates and add profile URLs where applicable
 * (see data/README.md).
 */
export const tryHackMeAchievements = [
  {
    id: "thm-jr-pentester",
    title: "Jr Penetration Tester Learning Path",
    issuer: "TryHackMe",
    date: "2025-11-20",
    credentialUrl: null,
  },
] satisfies Certificate[];
