import type { Skill, SkillGroup } from "@/lib/types";

/**
 * Flat skill catalogue (Backend Schema: Skill is a first-class entity so
 * narrativeBeats[].relatedSkillIds can reference it). The offensive ids
 * (skill-recon … skill-reporting) are referenced by the Offensive Security
 * scenario and validated by the build-time integrity gate — do not rename them.
 *
 * `skillGroups` is the narrative view model for the Skills section; it tells the
 * VAPT → GRC & AI Security arc without fabricating proficiency scores.
 */
export const skills = [
  // Offensive — referenced by SC-01
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
    name: "Privilege Escalation & Active Directory",
    category: "offensive",
    proficiencyNote: "Linux/Windows privesc, AD compromise",
  },
  {
    id: "skill-reporting",
    name: "Remediation Reporting",
    category: "offensive",
    proficiencyNote: "Actionable findings engineers can act on",
  },
  // GRC
  { id: "skill-risk", name: "Risk Management", category: "grc" },
  { id: "skill-compliance", name: "Compliance Automation", category: "grc" },
  { id: "skill-audit", name: "Audit-Trail Integrity", category: "grc" },
  {
    id: "skill-crypto-log",
    name: "Cryptographic Evidence Logging",
    category: "grc",
  },
  { id: "skill-governance", name: "Governance Frameworks", category: "grc" },
  { id: "skill-incident", name: "Incident Response", category: "grc" },
  // AI Security
  {
    id: "skill-secure-ai",
    name: "Secure AI System Design",
    category: "ai-security",
  },
  {
    id: "skill-zk",
    name: "Zero-Knowledge Architecture",
    category: "ai-security",
  },
  { id: "skill-aes", name: "AES-256 Encryption", category: "ai-security" },
  {
    id: "skill-aiml",
    name: "AI/ML Foundations (AWS Academy)",
    category: "ai-security",
  },
  {
    id: "skill-datapipe",
    name: "Data-Pipeline Security",
    category: "ai-security",
  },
  // Cloud & Infrastructure
  { id: "skill-aws", name: "AWS", category: "cloud" },
  { id: "skill-docker", name: "Docker & Containerization", category: "cloud" },
  { id: "skill-linux", name: "Linux/Unix Administration", category: "cloud" },
  // Engineering (general)
  { id: "skill-python", name: "Python", category: "general" },
  { id: "skill-java", name: "Java", category: "general" },
  { id: "skill-sql", name: "SQL", category: "general" },
  { id: "skill-fastapi", name: "FastAPI", category: "general" },
  { id: "skill-flask", name: "Flask", category: "general" },
  { id: "skill-rest", name: "REST APIs", category: "general" },
  { id: "skill-postgres", name: "PostgreSQL / MySQL", category: "general" },
  { id: "skill-git", name: "Git & GitHub", category: "general" },
  // Tooling (general)
  { id: "skill-burp", name: "Burp Suite", category: "general" },
  { id: "skill-nmap", name: "Nmap", category: "general" },
  { id: "skill-metasploit", name: "Metasploit", category: "general" },
  { id: "skill-wireshark", name: "Wireshark", category: "general" },
  { id: "skill-postman", name: "Postman", category: "general" },
] satisfies Skill[];

export const skillById = new Map(skills.map((s) => [s.id, s]));

/** Narrative grouping for the Skills section. */
export const skillGroups: SkillGroup[] = [
  {
    id: "grp-offensive",
    title: "Where I started — VAPT & Offensive Security",
    skillIds: [
      "skill-vapt",
      "skill-recon",
      "skill-owasp",
      "skill-privesc",
      "skill-reporting",
    ],
  },
  {
    id: "grp-grc",
    title: "Where I'm heading — GRC",
    skillIds: [
      "skill-risk",
      "skill-compliance",
      "skill-audit",
      "skill-crypto-log",
      "skill-governance",
      "skill-incident",
    ],
  },
  {
    id: "grp-ai",
    title: "Where I'm heading — AI Security",
    skillIds: [
      "skill-secure-ai",
      "skill-zk",
      "skill-aes",
      "skill-aiml",
      "skill-datapipe",
    ],
  },
  {
    id: "grp-cloud",
    title: "Cloud & infrastructure",
    skillIds: ["skill-aws", "skill-docker", "skill-linux"],
  },
  {
    id: "grp-engineering",
    title: "The engineering underneath all three",
    skillIds: [
      "skill-python",
      "skill-java",
      "skill-sql",
      "skill-fastapi",
      "skill-flask",
      "skill-rest",
      "skill-postgres",
      "skill-git",
    ],
  },
  {
    id: "grp-tooling",
    title: "Tools I've used to find what needed governing",
    skillIds: [
      "skill-burp",
      "skill-nmap",
      "skill-metasploit",
      "skill-wireshark",
      "skill-postman",
    ],
  },
];
