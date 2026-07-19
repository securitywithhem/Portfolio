import type { Project } from "@/lib/types";

/**
 * Portfolio projects (positioning v2). Order tells the story: Dharma (GRC) and
 * VaultIQ (AI Security) are the two "proof of trajectory" pieces and are
 * featured; the API Security framework is the offensive "before" that grounds
 * them.
 *
 * NOTE: the GitHub URLs below assume repos at github.com/SecurityWithHem —
 * verify the exact repo names and add live URLs / screenshots before launch
 * (see data/README.md).
 */
export const projects = [
  {
    id: "proj-dharma",
    title: "Dharma",
    slug: "dharma",
    tagline: "Compliance that can prove no one tampered with the evidence.",
    description:
      "Self-hosted GRC (Governance, Risk & Compliance) platform that automates compliance evidence collection and secures every audit trail with cryptographic hashing — so the record of what happened can't be quietly edited after the fact. This is GRC treated as an engineering problem: not a spreadsheet of controls, but a system where the evidence itself is provably intact.",
    whyItMatters:
      "Most GRC candidates come from a policy or audit background and have never built the systems that generate the evidence they're reviewing. I built one — which means I understand GRC from the infrastructure up, not just the checklist down.",
    techStack: ["Python", "Docker", "REST APIs", "Cryptographic Hashing"],
    images: [],
    github: "https://github.com/SecurityWithHem/Dharma",
    live: null,
    featured: true,
  },
  {
    id: "proj-vaultiq",
    title: "VaultIQ",
    slug: "vaultiq",
    tagline:
      "An AI platform designed so even the platform can't read your data.",
    description:
      "Zero-knowledge, AI-powered document platform with client-side AES-256 encryption — content is encrypted before it ever leaves the user's device. Layered automated AI document classification on top without ever breaking that boundary, and containerized every service with Docker.",
    whyItMatters:
      "AI security isn't just red-teaming prompts — it's designing the data architecture underneath the model so a breach of the AI layer can't expose the underlying data. VaultIQ proves I think about that boundary at the architecture level.",
    techStack: ["Python", "FastAPI", "Docker", "AES-256", "AI/ML"],
    images: [],
    github: "https://github.com/SecurityWithHem/VaultIQ",
    live: null,
    featured: true,
  },
  {
    id: "proj-api-pentesting",
    title: "Enterprise API Security & Penetration Testing Framework",
    slug: "api-pentesting",
    tagline: "The offensive work that informs everything above.",
    description:
      "Automated framework to test authentication and authorization flows against the OWASP API Top 10, documenting every finding with concrete remediation steps — the same process used in professional VAPT engagements.",
    whyItMatters:
      "This is the “before” to Dharma and VaultIQ's “after” — proof that the GRC and AI Security work isn't theoretical. It's built by someone who's actually found what it's meant to prevent.",
    techStack: ["Python", "Postman", "OWASP API Top 10"],
    images: [],
    github: null,
    live: null,
    featured: false,
  },
] satisfies Project[];
