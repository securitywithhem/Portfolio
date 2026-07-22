import type { Project } from "@/lib/types";

/**
 * Portfolio projects, ordered as the page presents them: the two built systems
 * first, the offensive tool they grew out of last.
 *
 * Every claim here is grounded in the actual repositories at
 * github.com/SecurityWithHem (verified via the GitHub API) — tech stacks,
 * metrics and capabilities come from the repos and their READMEs, not from
 * memory. `highlight` is the single number or hard capability a recruiter
 * should retain; `technical` is how it is really built, in one sentence.
 *
 * Dharma is a private repository, so it carries `sourceNote` instead of a
 * `github` link — a dead "view source" under a headline project reads worse
 * than none.
 */
export const projects = [
  {
    id: "proj-dharma",
    title: "Dharma",
    slug: "dharma",
    tagline: "Compliance that can prove no one tampered with the evidence.",
    highlight: "Runs on local AI — sensitive data never leaves the org",
    description:
      "Self-hosted compliance platform that automates SOC 2, ISO 27001 and DPDP Act 2023 readiness entirely on-premise — mapping evidence to controls with a local LLM, so audit data never touches a public AI API.",
    technical:
      "Multi-container platform (Next.js, tRPC, PostgreSQL + pgvector, MinIO, Redis/BullMQ) that maps evidence to controls with a local Ollama model, so documents never touch a public AI API. Evidence is hash-chained — alter one record and the signature chain breaks — and workspaces are multi-tenant with Stripe billing.",
    whyItMatters:
      "Most GRC candidates come from a policy or audit background and have never built the systems that generate the evidence they review. I built one — GRC understood from the infrastructure up.",
    techStack: [
      "Next.js",
      "tRPC",
      "PostgreSQL + pgvector",
      "Ollama (local LLM)",
      "MinIO",
      "Docker",
    ],
    images: [],
    github: null,
    sourceNote: "Private repository — walkthrough available on request",
    live: null,
    featured: true,
  },
  {
    id: "proj-vaultiq",
    title: "VaultIQ",
    slug: "vaultiq",
    tagline:
      "Encrypt documents in the browser, then catch AI-written submissions with 98% accuracy.",
    highlight: "98.3% AI-content detection · ROC-AUC 0.997",
    description:
      "Full-stack document and submission platform: files are encrypted client-side before upload, and a machine-learning ensemble flags AI-generated text from modern LLMs with 98.3% accuracy.",
    technical:
      "React 19 / Node / Python-FastAPI platform on AWS S3. Files are AES-256 encrypted in the browser with SHA-256 integrity checks; a hybrid detector — fine-tuned RoBERTa plus a calibrated logistic-regression model over 20 linguistic features — flags AI-generated text from GPT-4, Claude and Gemini, with Apache Spark running the analytics.",
    whyItMatters:
      "AI security isn't just red-teaming prompts — it's designing the data architecture so a breach of the AI layer can't expose the underlying data.",
    techStack: [
      "React 19",
      "Python / FastAPI",
      "Apache Spark",
      "AWS S3",
      "AES-256",
    ],
    images: [],
    github: "https://github.com/SecurityWithHem/vaultiq",
    live: null,
    featured: true,
  },
  {
    id: "proj-network-recon",
    title: "Network Reconnaissance Tool",
    slug: "network-recon",
    tagline: "The reconnaissance phase of a real engagement, scripted.",
    highlight: "Offensive tooling — the practice behind the defensive work",
    description:
      "A Python reconnaissance tool that automates the first phase of a penetration test — Nmap-driven port scanning, DNS lookup and traceroute — into quick or full scans that produce a single report.",
    technical:
      "Python wrapping Nmap for TCP/UDP port discovery, with DNS resolution and traceroute mapping, exposed as quick and full scan modes that emit one consolidated report.",
    whyItMatters:
      "The offensive practice the defensive work is built on — proof the GRC and AI-security work comes from someone who has actually mapped an attack surface, not just read about one.",
    techStack: ["Python", "Nmap", "Sockets"],
    images: [],
    github: "https://github.com/SecurityWithHem/Network-Recconniassance-Tool",
    live: null,
    featured: false,
  },
] satisfies Project[];

export const projectById = new Map(projects.map((p) => [p.id, p]));
