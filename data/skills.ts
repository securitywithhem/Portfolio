import type { Skill } from "@/lib/types";

/**
 * Skills — explicit entities so narrativeBeats[].relatedSkillIds can reference
 * them. Phase 2.5 defines the offensive set used by the Offensive Security
 * scenario; the full skills catalogue (all categories) is completed in Phase 3.
 */
export const skills = [
  {
    id: "skill-recon",
    name: "Network Reconnaissance",
    category: "offensive",
    proficiencyNote:
      "Enumeration, service/version mapping, attack-surface discovery",
  },
  {
    id: "skill-vapt",
    name: "Vulnerability Assessment & Penetration Testing",
    category: "offensive",
    proficiencyNote: "Live engagements at HackersVilla Cybersecurity",
  },
  {
    id: "skill-owasp",
    name: "OWASP Web & API Exploitation",
    category: "offensive",
    proficiencyNote: "OWASP Top 10 / API Top 10",
  },
  {
    id: "skill-privesc",
    name: "Privilege Escalation",
    category: "offensive",
    proficiencyNote: "Linux/Windows privesc, Active Directory compromise",
  },
  {
    id: "skill-reporting",
    name: "Remediation Reporting",
    category: "offensive",
    proficiencyNote: "Actionable findings engineers can act on",
  },
] satisfies Skill[];

export const skillById = new Map(skills.map((s) => [s.id, s]));
