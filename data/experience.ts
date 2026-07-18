import type { Experience } from "@/lib/types";

/**
 * Work/internship history, most recent first. Entries are realistic
 * placeholders — replace with actual roles before launch (data/README.md).
 */
export const experience = [
  {
    company: "Placeholder Security Co.",
    role: "Cybersecurity Intern",
    startDate: "2025-05",
    endDate: null,
    achievements: [
      "Performed vulnerability assessments across internal web applications and reported findings with CVSS scoring.",
      "Automated recurring reconnaissance tasks with Python, cutting manual triage time.",
      "Assisted with API penetration tests following the OWASP API Security Top 10.",
    ],
  },
] satisfies Experience[];
