import type { Scenario } from "@/lib/types";

/**
 * SC-04 — Cloud & Infrastructure (AWS). Environment: a cloud-architecture graph.
 * Interactive moment: INSPECT the security layer (IAM). Payoff is capability /
 * cert-backed rather than a single project (App Flow) — payoffProjectId is null
 * with a payoffSummary. One object, consumed identically by all tiers.
 */
export const scenarioCloud: Scenario = {
  id: "scenario-cloud",
  slug: "cloud-infrastructure",
  unit: "SC-04",
  title: "Cloud & Infrastructure",
  accent: "teal",
  environmentType: "cloud-architecture",
  summary:
    "The infrastructure the other work runs on: services containerized with Docker, deployed on AWS, and secured behind least-privilege IAM — grounded in AWS Academy foundations.",
  narrativeBeats: [
    {
      id: "beat-containerize",
      order: 1,
      heading: "Containerize — package every service",
      body: "Each service ships as a Docker container — reproducible, isolated, and identical from laptop to cloud. Dharma and VaultIQ are both fully containerized.",
      relatedSkillIds: ["skill-docker", "skill-linux"],
    },
    {
      id: "beat-deploy",
      order: 2,
      heading: "Deploy — ship to AWS",
      body: "Containers run behind a load balancer and CDN, backed by managed data services. Infrastructure that scales without hand-tuning individual machines.",
      relatedSkillIds: ["skill-aws"],
    },
    {
      id: "beat-secure",
      order: 3,
      heading: "Secure — least privilege by default",
      body: "Access is scoped with least-privilege IAM, data is encrypted at rest, and services sit in private subnets. Security designed into the topology, not patched on after.",
      relatedSkillIds: ["skill-aws", "skill-linux"],
    },
  ],
  interactiveMoment: {
    type: "inspect",
    description:
      "Inspect the security layer: focus the IAM node to see how access and data are locked down.",
    triggerLabel: "Inspect the security layer",
  },
  payoffProjectId: null,
  payoffSummary:
    "AWS Academy foundations plus hands-on, containerized infrastructure — Docker-packaged services deployed and secured behind least-privilege IAM across Dharma and VaultIQ.",
  scene3D: {
    cameraKeyframes: [
      { progress: 0, position: [-3.5, 1.4, 8], lookAt: [-2.5, 0, 0] },
      { progress: 0.4, position: [-0.5, 0.6, 7], lookAt: [-0.2, 0, 0] },
      { progress: 0.7, position: [2, 0.6, 6.6], lookAt: [1.8, 0, 0] },
      { progress: 1, position: [4.2, 1, 7.2], lookAt: [3.6, 0, 0] },
    ],
  },
  fallback: {
    illustrationRef: "cloud-architecture-2d",
    animationBeats: [
      { beatId: "beat-containerize", motif: "services-boxed" },
      { beatId: "beat-deploy", motif: "edges-live" },
      { beatId: "beat-secure", motif: "iam-inspect" },
    ],
  },
};
