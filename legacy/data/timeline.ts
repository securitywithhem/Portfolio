import type { TimelineEvent } from "@/lib/types";

/**
 * DATA-RELATIONSHIP DECISION (Phase 3B) — read before adding an entry.
 *
 * The Backend Schema has no Timeline entity; Journey is a hybrid, not a fork:
 * Experience and (formal) Certificate facts have one source of truth in
 * /data/experience.ts and /data/certificates.ts and are mapped into
 * TimelineEvent shape at read time in lib/data/index.ts#getTimelineEvents().
 * Only narrative milestones that belong to neither schema live here.
 *
 * So the HackersVilla internship and the Google/AWS certificates are NOT
 * re-typed below — they surface automatically. The milestones here fill in
 * the rest of the VAPT → GRC & AI Security arc (positioning v2).
 *
 * Order here is irrelevant — getTimelineEvents() sorts by date ascending.
 */
export const timelineMilestones = [
  {
    id: "started-btech",
    date: "2023-08",
    title: "Started B.Tech, Computer Science (Cybersecurity)",
    description:
      "Enrolled at Navrachana University, Vadodara. Chose the cybersecurity specialization deliberately, not by default.",
    category: "education",
  },
  {
    id: "thm-pre-security",
    date: "2024-12",
    title: "Completed Pre Security foundations on TryHackMe",
    description:
      "Foundations in networking, Linux, and Windows — the base every later skill builds on.",
    category: "milestone",
  },
  {
    id: "thm-top-2",
    date: "2025-09",
    title: "Reached the top 2% on TryHackMe",
    description:
      "Escalated from offensive pentesting into privilege escalation, Active Directory attacks, and OWASP web exploitation across 175+ labs — landing in the top 2% of all users globally.",
    category: "milestone",
  },
  {
    id: "built-dharma-vaultiq",
    date: "2026-01",
    title: "Built Dharma (GRC) and VaultIQ (AI Security)",
    description:
      "Turned offensive knowledge into preventive architecture: a compliance platform with tamper-evident audit trails, and a zero-knowledge AI platform secured by design.",
    category: "milestone",
  },
  {
    id: "pursuing-grc-ai",
    date: "2026-07",
    title: "Pursuing roles in GRC and AI Security",
    description:
      "Bringing a VAPT practitioner's understanding of real attack paths into risk governance and AI system security.",
    category: "milestone",
  },
] satisfies TimelineEvent[];
