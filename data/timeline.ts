import type { TimelineEvent } from "@/lib/types";

/**
 * Journey timeline — the VAPT → GRC & AI Security arc, sorted ascending at read
 * time. Self-contained for now; Certifications (Phase 4) can be merged in later
 * if desired. Grounded in the resume, the HackersVilla internship, and the
 * Dharma / VaultIQ projects.
 */
export const timeline = [
  {
    id: "started-btech",
    date: "2023-08",
    title: "Started B.Tech, Computer Science (Cybersecurity)",
    description:
      "Enrolled at Navrachana University, Vadodara — chose the cybersecurity specialization deliberately, not by default.",
    category: "education",
  },
  {
    id: "hackersvilla",
    date: "2024-03",
    title: "VAPT Intern at HackersVilla Cybersecurity",
    description:
      "Live vulnerability assessments, penetration testing, and network reconnaissance on real systems — writing remediation reports engineering teams acted on.",
    category: "experience",
  },
  {
    id: "thm-top-2",
    date: "2025-09",
    title: "Reached the top 2% on TryHackMe",
    description:
      "175+ labs across privilege escalation, Active Directory attacks, and OWASP web exploitation — until “how does this system fail” became second nature.",
    category: "milestone",
  },
  {
    id: "built-dharma-vaultiq",
    date: "2026-06",
    title: "Built Dharma (GRC) and VaultIQ (AI Security)",
    description:
      "Turned offensive knowledge into preventive architecture: a compliance platform that runs on local AI with a tamper-evident evidence ledger, and a document platform with client-side encryption and a 98%-accurate AI-content detector.",
    category: "milestone",
  },
  {
    id: "pursuing-grc-ai",
    date: "2026-07",
    title: "Pursuing roles in GRC and AI Security",
    description:
      "Bringing a VAPT practitioner's understanding of real attack paths into risk governance and AI-system security.",
    category: "milestone",
  },
] satisfies TimelineEvent[];

/** Ascending by date (YYYY-MM sorts lexically). */
export const timelineSorted = [...timeline].sort((a, b) =>
  a.date.localeCompare(b.date),
);
