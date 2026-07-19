import type { AccentKey } from "@/lib/types";
import type { CSSProperties } from "react";

/** CSS var reference for a scenario accent, e.g. `var(--accent-blue)`. */
export function accentVar(accent: AccentKey): string {
  return `var(--accent-${accent})`;
}

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
