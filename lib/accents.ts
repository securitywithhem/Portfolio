import type { AccentKey } from "@/lib/types";
import type { CSSProperties } from "react";

/** CSS var reference for a scenario accent, e.g. `var(--accent-blue)`. */
export function accentVar(accent: AccentKey): string {
  return `var(--accent-${accent})`;
}

/**
 * Raw accent hex values — must stay in sync with globals.css. Used where CSS
 * custom properties can't reach (WebGL/three.js materials). See DESIGN.md.
 */
export const ACCENT_HEX: Record<AccentKey, string> = {
  "red-amber": "#ff5a1f",
  blue: "#3b9eff",
  violet: "#9b7bff",
  teal: "#2dd4bf",
};

/**
 * Style object that re-points the local `--accent` (and its -on/-soft pair) to
 * a scenario's accent, so accent-agnostic components inside inherit it. Applied
 * on a scenario section wrapper.
 */
export function accentScope(accent: AccentKey): CSSProperties {
  return {
    ["--accent" as string]: `var(--accent-${accent})`,
    ["--accent-on" as string]: `var(--accent-${accent}-on)`,
    ["--accent-soft" as string]: `var(--accent-${accent}-soft)`,
  };
}
