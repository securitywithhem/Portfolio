/**
 * Capability detection (TRD "Capability Detection" + App Flow "Tier Selection").
 * Runs ONCE on the client, before any 3D asset is requested. The result decides
 * which visual tier renders for every scenario — never re-evaluated per scenario
 * (avoids a jarring mid-scroll tier switch).
 *
 * Hard rules (in priority order):
 *  1. prefers-reduced-motion: reduce  → fallback, no exceptions
 *  2. viewport < 768px                → fallback (mobile-first mandate)
 *  3. no WebGL2                        → fallback
 *  4. low device tier (memory/CPU)    → fallback (assume low if unknowable)
 * Otherwise → full.
 */

export type RenderTier = "full" | "fallback";

export interface CapabilityResult {
  tier: RenderTier;
  webgl2: boolean;
  reducedMotion: boolean;
  smallViewport: boolean;
  lowDeviceTier: boolean;
  /** Human-readable reason the fallback tier was chosen (debug/telemetry). */
  reason: string;
}

const MOBILE_BREAKPOINT = 768;
const MIN_MEMORY_GB = 4;
const MIN_CORES = 4;

function hasWebGL2(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return canvas.getContext("webgl2") != null;
  } catch {
    return false;
  }
}

/** True when the device looks low-powered. Assumes low when unknowable. */
function isLowDeviceTier(): boolean {
  const nav = navigator as Navigator & { deviceMemory?: number };
  if (typeof nav.deviceMemory === "number") {
    return nav.deviceMemory < MIN_MEMORY_GB;
  }
  if (typeof nav.hardwareConcurrency === "number") {
    return nav.hardwareConcurrency < MIN_CORES;
  }
  // Neither signal available — assume low tier, per TRD.
  return true;
}

/** Detect capability. Safe to call only in the browser. */
export function detectCapability(): CapabilityResult {
  const reducedMotion =
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
  const smallViewport = window.innerWidth < MOBILE_BREAKPOINT;
  const webgl2 = hasWebGL2();
  const lowDeviceTier = isLowDeviceTier();

  let tier: RenderTier = "full";
  let reason = "full tier: WebGL2 + capable device, motion allowed";

  if (reducedMotion) {
    tier = "fallback";
    reason = "reduced-motion preferred";
  } else if (smallViewport) {
    tier = "fallback";
    reason = "viewport < 768px (mobile-first)";
  } else if (!webgl2) {
    tier = "fallback";
    reason = "no WebGL2 support";
  } else if (lowDeviceTier) {
    tier = "fallback";
    reason = "low device tier (memory/CPU)";
  }

  return { tier, webgl2, reducedMotion, smallViewport, lowDeviceTier, reason };
}

/** SSR-safe default: fallback, so server output never assumes 3D. */
export const DEFAULT_CAPABILITY: CapabilityResult = {
  tier: "fallback",
  webgl2: false,
  reducedMotion: false,
  smallViewport: false,
  lowDeviceTier: true,
  reason: "pre-detection default (SSR)",
};
