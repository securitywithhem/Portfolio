import type { TimelineEvent } from "@/lib/types";

/**
 * DATA-RELATIONSHIP DECISION (Phase 3B) — read before adding an entry.
 *
 * The Backend Schema has no Timeline entity; Journey must either derive
 * from Experience or stand alone. Decision: **hybrid, not a fork.**
 *
 * - Experience and Certificate facts (roles, cert dates/issuers) already
 *   have exactly one source of truth — /data/experience.ts and
 *   /data/certificates.ts. Journey does not re-type those facts here; it
 *   maps them into TimelineEvent shape at read time in
 *   lib/data/index.ts#getTimelineEvents(). Editing an experience or
 *   certificate updates both its dedicated Phase 4 section AND its
 *   Journey entry from one edit.
 * - Journey is broader than either: it also narrates milestones that
 *   belong to neither schema (starting a degree, a ranking, an award) —
 *   those live here, and only here.
 *
 * Out of chronological order deliberately (tryhackme-top-5 before
 * started-btech) — getTimelineEvents() sorts explicitly; this file's
 * order must never be relied upon.
 */
export const timelineMilestones = [
  {
    id: "tryhackme-top-5",
    date: "2025-09",
    title: "Ranked top 5% on TryHackMe",
    description:
      "Completed 170+ rooms across offensive and defensive tracks — web exploitation, privilege escalation, and network attacks.",
    category: "milestone",
  },
  {
    id: "started-btech",
    date: "2022-08",
    title: "Started B.Tech in Computer Science (Cybersecurity)",
    description:
      "Enrolled at Navrachana University, Vadodara, specializing in cybersecurity within the CSE program.",
    category: "education",
  },
] satisfies TimelineEvent[];
