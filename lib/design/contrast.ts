import fs from "node:fs";
import path from "node:path";

/**
 * Reads the semantic color tokens straight out of styles/globals.css so the
 * CSS file stays the single source of truth — the WCAG test and the contrast
 * report both consume this, and editing a token re-runs the checks in CI.
 */

export type ThemeVars = Record<string, string>;

const GLOBALS_CSS = path.join(process.cwd(), "styles", "globals.css");

/**
 * Semantic foreground/background pairs that must meet WCAG AA (4.5:1).
 * `[text, surface]` — the first token is rendered on top of the second.
 */
export const AA_PAIRS: readonly [text: string, surface: string][] = [
  ["foreground", "background"],
  ["card-foreground", "card"],
  ["popover-foreground", "popover"],
  ["primary-foreground", "primary"],
  ["secondary-foreground", "secondary"],
  ["muted-foreground", "muted"],
  ["muted-foreground", "background"],
  ["accent-foreground", "accent"],
  ["destructive-foreground", "destructive"],
  // primary is also used as link/emphasis text on the page background
  ["primary", "background"],
];

export const WCAG_AA_NORMAL_TEXT = 4.5;

function parseBlock(css: string, selector: string): ThemeVars {
  const withoutComments = css.replace(/\/\*[\s\S]*?\*\//g, "");
  const blockMatch = new RegExp(
    `${selector.replace(".", "\\.")}\\s*\\{([^}]*)\\}`,
  ).exec(withoutComments);
  if (!blockMatch?.[1]) {
    throw new Error(`Selector "${selector}" not found in globals.css`);
  }
  const vars: ThemeVars = {};
  for (const m of blockMatch[1].matchAll(/--([a-z0-9-]+)\s*:\s*([^;]+);/g)) {
    if (m[1] && m[2]) vars[m[1]] = m[2].trim();
  }
  return vars;
}

/** Returns `{ light, dark }` maps of token name → oklch() string. */
export function readThemes(): { light: ThemeVars; dark: ThemeVars } {
  const css = fs.readFileSync(GLOBALS_CSS, "utf8");
  return { light: parseBlock(css, ":root"), dark: parseBlock(css, ".dark") };
}
