import type { Scenario } from "@/lib/types";

/**
 * Data Integrity Rule (Backend Schema) — enforced, not just convention.
 * A Scenario cannot ship with a 3D scene and a mismatched fallback: every
 * narrativeBeat must have exactly one fallback animationBeat, keyed by id.
 * Thrown errors surface at import time → `next build` fails. This is the
 * mechanism guaranteeing the PRD's "100% content parity between tiers".
 */
export function assertScenarioIntegrity(s: Scenario): void {
  const beats = s.narrativeBeats;
  const anim = s.fallback.animationBeats;

  if (anim.length !== beats.length) {
    throw new Error(
      `[scenario:${s.id}] fallback.animationBeats (${anim.length}) must match narrativeBeats (${beats.length}) — content parity violation`,
    );
  }

  const beatIds = new Set(beats.map((b) => b.id));
  for (const a of anim) {
    if (!beatIds.has(a.beatId)) {
      throw new Error(
        `[scenario:${s.id}] animationBeat references unknown beatId "${a.beatId}"`,
      );
    }
  }

  // Fallback is non-nullable and must be a real, referenceable illustration.
  if (!s.fallback.illustrationRef) {
    throw new Error(`[scenario:${s.id}] fallback.illustrationRef is required`);
  }
}
