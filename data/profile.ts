import type { Profile } from "@/lib/types";

/**
 * Site owner profile. Positioning: VAPT practitioner moving into Governance,
 * Risk & Compliance (GRC) and AI Security. Social URLs and the resume asset in
 * /public come from the current resume — replace both together on update.
 */
export const profile = {
  name: "Hem Nikesh Gabhawala",
  role: "Cybersecurity Engineer · VAPT → GRC & AI Security",
  bio: "I'm Hem — a cybersecurity engineer who started in offensive security (VAPT, penetration testing, network reconnaissance) and is now moving toward Governance, Risk & Compliance and AI Security, where that offensive instinct becomes preventive architecture. I've built a self-hosted GRC platform that runs entirely on local AI with a tamper-evident evidence ledger, and a document platform with client-side encryption and a 98%-accurate AI-content detector — because I'd rather design the guardrails than just report where they're missing.",
  socials: [
    { label: "GitHub", url: "https://github.com/SecurityWithHem" },
    {
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/hem-nikesh-gabhawala-99a5482a9/",
    },
    { label: "TryHackMe", url: "https://tryhackme.com/p/SecurityWithHem" },
  ],
  resumeUrl: "/Hem-Gabhawala-Resume.pdf",
  // Public contact address — must match the one shown on the landing page and
  // in the resume PDF, since this also feeds the Person JSON-LD schema.
  email: "hemgabhawala@icloud.com",
  location: "Vadodara, Gujarat, India",
  aboutBio: [
    "Most people who want to work in GRC or AI Security begin with compliance frameworks or machine learning. My path started somewhere different: understanding how systems actually break.",
    "During my internship at HackersVilla Cybersecurity, I worked on live vulnerability assessments, penetration testing, network reconnaissance, and remediation reporting. Beyond the internship, I completed 175+ TryHackMe labs, reaching the top 2% globally while working through privilege escalation, Active Directory attacks, and OWASP-based web exploitation. That experience trained me to think like an attacker first — to understand not just where vulnerabilities exist, but why they matter.",
    "That offensive mindset is what I now apply to defensive security.",
    "I built Dharma, a self-hosted Governance, Risk, and Compliance platform, because I wanted to understand compliance as an engineering discipline rather than a paperwork exercise. It maps evidence to controls using a local AI model — so sensitive documents never leave the organisation — and chains every record with tamper-evident hashing, so the security evidence itself can't be silently altered.",
    "I also built VaultIQ, a document platform built on the principle that AI security begins with architecture, not filters. Files are encrypted in the browser before they are ever uploaded, and a machine-learning ensemble I trained flags AI-generated submissions with 98.3% accuracy — security you can measure, not just claim.",
    "I'm not moving away from offensive security. I'm building on it. My goal is to bring an attacker's understanding of vulnerabilities into GRC and AI Security — designing secure systems, strengthening governance, and managing risk based on how real adversaries operate, not just what compliance frameworks predict.",
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
