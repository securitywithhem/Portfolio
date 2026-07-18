import type { SkillCategory } from "@/lib/types";

/**
 * DATA-MODEL DECISION (Phase 3C) — read before adding a category.
 *
 * The Backend Schema has no Skills entity; modeled here as categories of
 * named items, grouped rather than flat, so a security-engineer reviewer
 * can scan by domain (per PRD: credible to Security Engineers) while a
 * recruiter still gets breadth at a glance.
 *
 * Deliberately no proficiency score, percentage, or level per item. A
 * fabricated "87% Nmap" or even a self-assigned "Expert" tag isn't
 * grounded in anything measurable and reads as unprofessional to the
 * technical reviewers this section targets — the category grouping itself
 * *is* the signal (which tools sit under which domain), not a numeric
 * score. `SkillItem` keeps room for a future `level` field only if a real,
 * defensible rubric exists (e.g. certifications-backed); until then it's
 * intentionally absent from every entry below.
 *
 * Categories/items are grounded in the current resume's Technical/Key
 * Skills sections (Hem/Resume/Hem_Nikesh_Gabhawala_Resume.pdf) — nothing
 * here is invented breadth.
 */
export const skillCategories = [
  {
    id: "penetration-testing",
    title: "Penetration Testing",
    items: [
      { name: "Burp Suite" },
      { name: "OWASP ZAP" },
      { name: "Metasploit" },
      { name: "Nikto" },
      { name: "Hydra" },
      { name: "Dirb" },
    ],
  },
  {
    id: "network-security",
    title: "Network Security",
    items: [
      { name: "Nmap" },
      { name: "Wireshark" },
      { name: "TCPDump" },
      { name: "Netcat" },
    ],
  },
  {
    id: "programming-scripting",
    title: "Programming & Scripting",
    items: [
      { name: "Python" },
      { name: "Bash" },
      { name: "SQL" },
      { name: "Java" },
    ],
  },
  {
    id: "security-operations",
    title: "Security Operations",
    items: [
      { name: "Vulnerability Assessment (VAPT)" },
      { name: "Threat Modeling" },
      { name: "Incident Response" },
      { name: "Risk Assessment" },
      { name: "Threat Intelligence" },
    ],
  },
  {
    id: "systems",
    title: "Systems",
    items: [
      { name: "Kali Linux" },
      { name: "Ubuntu" },
      { name: "Windows Server" },
      { name: "Linux Hardening" },
    ],
  },
] satisfies SkillCategory[];
