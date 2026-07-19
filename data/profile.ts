import type { Profile } from "@/lib/types";

/**
 * Site owner profile. Positioning (v2): VAPT practitioner moving into
 * Governance, Risk & Compliance (GRC) and AI Security. Social URLs and the
 * resume asset in /public are sourced from the current resume — replace both
 * together when the resume is updated.
 */
export const profile = {
  name: "Hem Gabhawala",
  role: "Cybersecurity Engineer · VAPT → GRC & AI Security",
  bio: "I'm Hem — a cybersecurity engineer who started in offensive security (VAPT, penetration testing, network reconnaissance) and is now moving toward Governance, Risk & Compliance and AI Security, where that offensive instinct becomes preventive architecture. I've built a self-hosted GRC platform with tamper-evident audit trails and a zero-knowledge AI platform secured from the ground up — because I'd rather design the guardrails than just report where they're missing.",
  socials: [
    { label: "GitHub", url: "https://github.com/SecurityWithHem" },
    {
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/hem-nikesh-gabhawala-99a5482a9/",
    },
    { label: "TryHackMe", url: "https://tryhackme.com/p/SecurityWithHem" },
  ],
  resumeUrl: "/Hem-Gabhawala-Resume.pdf",
  email: "hhgabhawala0807@gmail.com",
  location: "Vadodara, Gujarat, India",
  aboutBio: [
    "Most people who say they want to work in GRC or AI Security are starting from a compliance checklist or a machine learning course. I'm starting from the other side — from actually finding the vulnerabilities that GRC frameworks exist to prevent, and the attack surfaces that AI security is meant to close.",
    "My internship at HackersVilla Cybersecurity put me on the offensive side of security: live vulnerability assessments, penetration testing, network reconnaissance, and writing remediation reports that real engineers had to act on. I pushed that further on TryHackMe — 175+ labs, top 2% globally, working through privilege escalation, Active Directory compromise, and OWASP-based web exploitation until “how does this system fail” became second nature.",
    "That's exactly the background I'm now applying in the other direction. I built Dharma, a self-hosted GRC platform, because I wanted to understand compliance and risk management not as paperwork but as an engineering problem — every action logged with cryptographic hashing so the audit trail itself can't be quietly edited. I built VaultIQ, a zero-knowledge AI-powered platform, because AI security isn't just “add a content filter” — it's designing the whole system so sensitive data is unreadable even to the platform running it.",
    "I'm not pivoting away from VAPT. I'm using it as the foundation for GRC and AI Security work that's grounded in what attackers actually do — not just what a framework says they might.",
  ],
  aboutPullQuote:
    "You can't govern risk you've never actually seen exploited. I've seen it. Now I want to build the systems that prevent it.",
  focusAreas: [
    "Governance, Risk & Compliance",
    "AI Security",
    "Vulnerability Assessment & Penetration Testing",
    "Secure System Design",
  ],
} satisfies Profile;
