import type { Project } from "@/lib/types";

/**
 * Portfolio projects. Each is the payoff of a scenario (scenarioId links back).
 * GitHub URLs assume github.com/SecurityWithHem — verify repo names and add
 * live URLs / screenshots before launch.
 */
export const projects = [
  {
    id: "enterprise-api-pentest",
    title: "Enterprise API Security & Penetration Testing Framework",
    slug: "api-pentesting",
    tagline: "The offensive work that informs everything else.",
    description:
      "Automated framework to test authentication and authorization flows against the OWASP API Top 10, documenting every finding with concrete remediation steps — the same process used in professional VAPT engagements.",
    whyItMatters:
      "The “before” to Dharma and VaultIQ's “after” — proof the GRC and AI-security work isn't theoretical. It's built by someone who's actually found what it's meant to prevent.",
    techStack: ["Python", "Postman", "OWASP API Top 10"],
    images: [],
    github: null,
    live: null,
    featured: false,
    scenarioId: "scenario-offensive",
  },
  {
    id: "proj-dharma",
    title: "Dharma",
    slug: "dharma",
    tagline: "Compliance that can prove no one tampered with the evidence.",
    description:
      "Self-hosted GRC platform that automates compliance evidence collection and secures every audit trail with cryptographic hashing — so the record of what happened can't be quietly edited after the fact.",
    whyItMatters:
      "Most GRC candidates come from a policy or audit background and have never built the systems that generate the evidence they're reviewing. I built one — GRC understood from the infrastructure up.",
    techStack: ["Python", "Docker", "REST APIs", "Cryptographic Hashing"],
    images: [],
    github: "https://github.com/SecurityWithHem/Dharma",
    live: null,
    featured: true,
    scenarioId: "scenario-grc",
  },
  {
    id: "proj-vaultiq",
    title: "VaultIQ",
    slug: "vaultiq",
    tagline:
      "An AI platform designed so even the platform can't read your data.",
    description:
      "Zero-knowledge, AI-powered document platform with client-side AES-256 encryption — content is encrypted before it ever leaves the user's device, with automated AI document classification layered on without breaking that boundary.",
    whyItMatters:
      "AI security isn't just red-teaming prompts — it's designing the data architecture so a breach of the AI layer can't expose the underlying data.",
    techStack: ["Python", "FastAPI", "Docker", "AES-256", "AI/ML"],
    images: [],
    github: "https://github.com/SecurityWithHem/VaultIQ",
    live: null,
    featured: true,
    scenarioId: "scenario-ai",
  },
] satisfies Project[];

export const projectById = new Map(projects.map((p) => [p.id, p]));
