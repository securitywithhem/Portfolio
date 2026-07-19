import type { Scenario } from "@/lib/types";

/**
 * SC-01 — Offensive Security. The flagship scenario, built end-to-end (both
 * tiers) as the Phase 2.5 gate. Environment: a network topology the visitor
 * moves through recon → exploit → report. Interactive moment: TRACE the kill
 * chain linking the three beats.
 *
 * This single object is consumed identically by the SSR DOM, the 3D scene, and
 * the fallback illustration (Backend Schema Data Integrity Rule).
 */
export const scenarioOffensive: Scenario = {
  id: "scenario-offensive",
  slug: "offensive-security",
  unit: "SC-01",
  title: "Offensive Security",
  accent: "red-amber",
  environmentType: "network-topology",
  summary:
    "Live vulnerability assessment and penetration testing at HackersVilla Cybersecurity — mapping attack surface, exploiting what shouldn't break, and writing remediation engineers actually shipped.",
  narrativeBeats: [
    {
      id: "beat-recon",
      order: 1,
      heading: "Recon — map the attack surface",
      body: "Every engagement starts by making the invisible visible: enumerating hosts, services, and versions until the network's real shape — not its intended one — comes into view.",
      relatedSkillIds: ["skill-recon"],
    },
    {
      id: "beat-exploit",
      order: 2,
      heading: "Exploit — break what shouldn't break",
      body: "From there it's finding the seam and pulling: OWASP web and API flaws, privilege escalation, Active Directory paths — 175+ TryHackMe labs of learning exactly how systems fail, applied to live targets.",
      relatedSkillIds: ["skill-owasp", "skill-privesc"],
    },
    {
      id: "beat-report",
      order: 3,
      heading: "Report — turn findings into fixes",
      body: "A finding no one can act on is noise. Each is documented with reproduction and concrete remediation — the report is the deliverable that turned reconnaissance into shipped fixes.",
      relatedSkillIds: ["skill-reporting", "skill-vapt"],
    },
  ],
  interactiveMoment: {
    type: "trace",
    description:
      "Trace the kill chain: follow the path from the recon foothold through the exploited node to the reported fix.",
    triggerLabel: "Trace the kill chain",
  },
  payoffProjectId: "enterprise-api-pentest",
  scene3D: {
    // Procedural network-topology geometry for Phase 2.5 — no external .glb yet.
    cameraKeyframes: [
      { progress: 0, position: [0, 1.5, 9], lookAt: [0, 0, 0] },
      { progress: 0.5, position: [4, 1, 5], lookAt: [0, 0, 0] },
      { progress: 1, position: [0, 3, 6], lookAt: [0, -0.5, 0] },
    ],
  },
  fallback: {
    illustrationRef: "network-topology-2d",
    // 1:1 with narrativeBeats (Data Integrity Rule — build-time checked).
    animationBeats: [
      { beatId: "beat-recon", motif: "nodes-enumerate" },
      { beatId: "beat-exploit", motif: "edge-breach" },
      { beatId: "beat-report", motif: "path-resolved" },
    ],
  },
};
