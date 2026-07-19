import type { SkillCategory } from "@/lib/types";

/**
 * Skills grouped to tell the positioning-v2 story: where I started (offensive
 * / VAPT), where I'm going (GRC and AI Security), and the engineering and
 * tooling that underpin all three. Grouping is the signal — no fabricated
 * proficiency scores (see the Phase 3C rationale that originally shaped this
 * file). Items are grounded in the resume and the Dharma / VaultIQ projects.
 */
export const skillCategories = [
  {
    id: "offensive-vapt",
    title: "Where I started — VAPT & Offensive Security",
    items: [
      { name: "Vulnerability Assessment" },
      { name: "Penetration Testing" },
      { name: "Network Reconnaissance" },
      { name: "Privilege Escalation" },
      { name: "Active Directory Security" },
      { name: "OWASP Top 10" },
      { name: "Ethical Hacking" },
    ],
  },
  {
    id: "grc",
    title: "Where I'm going — GRC",
    items: [
      { name: "Risk Management" },
      { name: "Compliance Automation" },
      { name: "Audit Trail Integrity" },
      { name: "Cryptographic Evidence Logging" },
      { name: "Governance Frameworks" },
      { name: "Incident Response" },
    ],
  },
  {
    id: "ai-security",
    title: "Where I'm going — AI Security",
    items: [
      { name: "Secure AI System Design" },
      { name: "Zero-Knowledge Architecture" },
      { name: "AES-256 Encryption" },
      { name: "AI/ML Foundations (AWS Academy)" },
      { name: "Data Pipeline Security" },
    ],
  },
  {
    id: "engineering",
    title: "The engineering underneath all three",
    items: [
      { name: "Python" },
      { name: "Java" },
      { name: "SQL" },
      { name: "FastAPI" },
      { name: "Flask" },
      { name: "REST APIs" },
      { name: "Docker" },
      { name: "AWS" },
      { name: "MySQL" },
      { name: "PostgreSQL" },
      { name: "Git & GitHub" },
      { name: "Linux/Unix Administration" },
    ],
  },
  {
    id: "tooling",
    title: "Tools I've used to find what needed governing",
    items: [
      { name: "Burp Suite" },
      { name: "Nmap" },
      { name: "Metasploit" },
      { name: "Wireshark" },
      { name: "Postman" },
    ],
  },
] satisfies SkillCategory[];
