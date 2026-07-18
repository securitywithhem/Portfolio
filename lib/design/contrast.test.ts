import { describe, expect, it } from "vitest";
import { wcagContrast } from "culori";
import { AA_PAIRS, WCAG_AA_NORMAL_TEXT, readThemes } from "./contrast";

/**
 * WCAG AA enforcement for every semantic color pairing, both themes.
 * Fails loudly if a token edit in styles/globals.css drops a pair below 4.5:1.
 */
const themes = readThemes();

describe.each(["light", "dark"] as const)("%s theme", (themeName) => {
  const vars = themes[themeName];

  it.each(AA_PAIRS)("%s on %s meets AA (4.5:1)", (text, surface) => {
    const textValue = vars[text];
    const surfaceValue = vars[surface];
    expect(textValue, `token --${text} missing`).toBeDefined();
    expect(surfaceValue, `token --${surface} missing`).toBeDefined();

    const ratio = wcagContrast(textValue as string, surfaceValue as string);
    expect(
      ratio,
      `--${text} on --${surface} (${themeName}) is ${ratio.toFixed(2)}:1`,
    ).toBeGreaterThanOrEqual(WCAG_AA_NORMAL_TEXT);
  });
});
