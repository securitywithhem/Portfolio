import type { Experience } from "@/lib/types";

/**
 * Work/internship history, most recent first. The HackersVilla VAPT
 * internship is the offensive foundation the GRC / AI Security positioning
 * is built on (positioning v2).
 */
export const experience = [
  {
    company: "HackersVilla Cybersecurity Pvt. Ltd.",
    role: "VAPT Intern (Cybersecurity Analyst)",
    startDate: "2024-03",
    endDate: "2024-05",
    achievements: [
      "Performed live vulnerability assessments and penetration testing on real systems — identifying the kinds of gaps that GRC frameworks and AI security controls exist to close.",
      "Conducted network reconnaissance to map attack surfaces the way a real adversary would, then translated findings into remediation reports for engineering teams to act on.",
      "Applied risk management techniques and security best practices day-to-day — the first hands-on exposure to thinking about risk at a program level, not just an exploit level.",
      "Built the core instinct this whole career direction runs on: you can't govern or secure what you don't understand how to break.",
    ],
  },
] satisfies Experience[];
