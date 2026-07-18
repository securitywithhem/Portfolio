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
} satisfies Profile;
