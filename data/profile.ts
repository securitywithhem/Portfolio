import type { Profile } from "@/lib/types";

/**
 * Site owner profile. Social URLs are best-guess placeholders — verify each
 * handle before Phase 2 renders them (see data/README.md).
 */
export const profile = {
  name: "Hem Gabhawala",
  role: "Cybersecurity Engineer",
  bio: "Cybersecurity engineer focused on offensive security and secure application development. I build and break things to understand them — from API penetration testing to building security tooling — and document what I learn along the way.",
  socials: [
    { label: "GitHub", url: "https://github.com/hemgabhawala" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/hemgabhawala" },
    { label: "TryHackMe", url: "https://tryhackme.com/p/hemgabhawala" },
  ],
} satisfies Profile;
