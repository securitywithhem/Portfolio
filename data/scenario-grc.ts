import type { Scenario } from "@/lib/types";

/**
 * SC-02 — GRC & Compliance (Dharma). Environment: a hash-chained audit ledger.
 * Interactive moment: TRACE the chain to prove no entry was edited after the
 * fact. One object, consumed identically by SSR DOM, 3D scene, and fallback.
 */
export const scenarioGrc: Scenario = {
  id: "scenario-grc",
  slug: "grc-compliance",
  unit: "SC-02",
  title: "GRC & Compliance",
  accent: "blue",
  environmentType: "audit-ledger",
  summary:
    "Dharma — a self-hosted GRC platform that treats compliance as an engineering problem: evidence collected automatically and every audit record hashed to the last, so the trail itself can't be quietly edited.",
  narrativeBeats: [
    {
      id: "beat-capture",
      order: 1,
      heading: "Capture — automate the evidence",
      body: "Compliance dies in manual screenshots and stale spreadsheets. Dharma collects the evidence automatically as controls change, so the record is a byproduct of the work, not an afterthought.",
      relatedSkillIds: ["skill-compliance", "skill-governance"],
    },
    {
      id: "beat-chain",
      order: 2,
      heading: "Chain — hash every record to the last",
      body: "Each entry carries the cryptographic hash of the one before it. Alter any record and every hash downstream stops matching — the tamper shows itself.",
      relatedSkillIds: ["skill-crypto-log", "skill-audit"],
    },
    {
      id: "beat-verify",
      order: 3,
      heading: "Verify — prove the record is intact",
      body: "Anyone can walk the chain top-to-bottom and confirm nothing was edited after the fact. That's the difference between claiming an audit trail and being able to prove one.",
      relatedSkillIds: ["skill-risk", "skill-incident"],
    },
  ],
  interactiveMoment: {
    type: "trace",
    description:
      "Trace the hash chain: verify each entry links cleanly to the one before it, top to bottom.",
    triggerLabel: "Trace the hash chain",
  },
  payoffProjectId: "proj-dharma",
  scene3D: {
    cameraKeyframes: [
      { progress: 0, position: [0, 2.5, 7], lookAt: [0, 2, 0] },
      { progress: 0.5, position: [2.4, 0, 6], lookAt: [0, 0, 0] },
      { progress: 1, position: [0, -2.6, 7], lookAt: [0, -2.2, 0] },
    ],
  },
  fallback: {
    illustrationRef: "audit-ledger-2d",
    animationBeats: [
      { beatId: "beat-capture", motif: "entries-append" },
      { beatId: "beat-chain", motif: "hash-link" },
      { beatId: "beat-verify", motif: "chain-verified" },
    ],
  },
};
