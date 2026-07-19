import type { Scenario } from "@/lib/types";

/**
 * SC-03 — AI-Secured Systems (VaultIQ). Environment: an encrypted vault of
 * document fields. Interactive moment: REVEAL a field — it decrypts client-side,
 * proving the platform itself never held the plaintext (zero-knowledge). One
 * object, consumed identically by SSR DOM, 3D scene, and fallback.
 */
export const scenarioAi: Scenario = {
  id: "scenario-ai",
  slug: "ai-secured-systems",
  unit: "SC-03",
  title: "AI-Secured Systems",
  accent: "violet",
  environmentType: "encrypted-vault",
  summary:
    "VaultIQ — a zero-knowledge, AI-powered document platform. Content is encrypted client-side with AES-256 before it ever leaves the device, and classified by AI without the platform ever seeing the plaintext.",
  narrativeBeats: [
    {
      id: "beat-encrypt",
      order: 1,
      heading: "Encrypt — before it leaves the device",
      body: "Every field is sealed with AES-256 on the client. By the time data reaches the server it's already ciphertext — the platform stores what it cannot read.",
      relatedSkillIds: ["skill-aes", "skill-secure-ai"],
    },
    {
      id: "beat-classify",
      order: 2,
      heading: "Classify — without ever seeing it",
      body: "AI document classification runs over the pipeline without breaking the encryption boundary. Intelligence layered on top of data the model never decrypts.",
      relatedSkillIds: ["skill-aiml", "skill-datapipe"],
    },
    {
      id: "beat-zk",
      order: 3,
      heading: "Zero-knowledge — even the platform can't read it",
      body: "The key lives with the user, not the service. A breach of the AI layer exposes ciphertext and nothing more — security designed at the architecture level, not bolted on as a filter.",
      relatedSkillIds: ["skill-zk", "skill-secure-ai"],
    },
  ],
  interactiveMoment: {
    type: "reveal",
    description:
      "Reveal an encrypted field: decrypt it client-side to see the plaintext the platform never had.",
    triggerLabel: "Reveal an encrypted field",
  },
  payoffProjectId: "proj-vaultiq",
  scene3D: {
    cameraKeyframes: [
      { progress: 0, position: [0, 2.2, 7.6], lookAt: [0, 1.8, 0] },
      { progress: 0.4, position: [2.3, 0.6, 6.2], lookAt: [0, 0.2, 0] },
      { progress: 0.7, position: [-2.3, -0.6, 6.2], lookAt: [0, -0.5, 0] },
      { progress: 1, position: [0, -2.1, 7.6], lookAt: [0, -1.8, 0] },
    ],
  },
  fallback: {
    illustrationRef: "encrypted-vault-2d",
    animationBeats: [
      { beatId: "beat-encrypt", motif: "fields-seal" },
      { beatId: "beat-classify", motif: "ai-scan" },
      { beatId: "beat-zk", motif: "keys-held-client" },
    ],
  },
};
