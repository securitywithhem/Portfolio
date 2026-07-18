import type { Profile } from "@/lib/types";

/**
 * Site owner profile. Social URLs were sourced from the current resume
 * (Hem/Resume/Hem_Nikesh_Gabhawala_Resume.pdf) in Phase 2.2; the GitHub
 * handle is verified live. The resume asset in /public is a copy of that
 * same PDF — replace both together when the resume is updated.
 */
export const profile = {
  name: "Hem Gabhawala",
  role: "Cybersecurity Engineer",
  bio: "Cybersecurity engineer focused on offensive security and secure application development. I build and break things to understand them — from API penetration testing to building security tooling — and document what I learn along the way.",
  socials: [
    { label: "GitHub", url: "https://github.com/SecurityWithHem" },
    {
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/hem-nikesh-gabhawala-99a5482a9/",
    },
    { label: "TryHackMe", url: "https://tryhackme.com/p/SecurityWithHem" },
  ],
  resumeUrl: "/Hem-Gabhawala-Resume.pdf",
  aboutBio: [
    "I'm a Computer Science undergraduate specializing in cybersecurity at Navrachana University, with an attacker's instinct for where systems actually break. My background spans penetration testing, vulnerability assessment, and network analysis — grounded in hands-on lab work rather than theory alone.",
    "Ranked in the top 5% on TryHackMe with 170+ rooms completed across offensive and defensive tracks, I've carried that practice into a cybersecurity internship, bug bounty practice, and CTF competitions. I'm as comfortable writing the report a stakeholder reads as I am running the scan behind it.",
  ],
  focusAreas: [
    "Penetration Testing",
    "Vulnerability Assessment",
    "Network Security",
    "Security Automation",
  ],
} satisfies Profile;
