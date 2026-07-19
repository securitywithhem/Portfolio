import type { NavLeaf } from "@/lib/types";
import { scenarioMetas, firstScenarioMeta } from "@/data/scenarios";

/**
 * ANCHOR ID CONTRACT — read before building any section.
 *
 * `navLeaves` is the single source of truth for in-page anchor ids and their
 * order. Every section built in later phases MUST render a top-level element
 * with the matching `id`, in this order. The scroll-spy observes exactly these
 * ids; a section rendering a different id will never highlight.
 *
 * Jump offset under the sticky navbar is handled globally via
 * `scroll-padding-top` on <html> (globals.css) — sections must NOT add their
 * own scroll-margin. Navbar height is 4rem; scroll-padding-top is 5rem.
 * "Home" points at Hero — there is no separate home anchor.
 */
export const navLeaves: NavLeaf[] = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "journey", label: "Journey" },
  ...scenarioMetas.map((s) => ({ id: s.id, label: s.title, scenario: s })),
  { id: "skills", label: "Skills" },
  { id: "certifications", label: "Certifications" },
  { id: "tryhackme", label: "TryHackMe" },
  { id: "github", label: "GitHub" },
  { id: "contact", label: "Contact" },
];

/**
 * Condensed primary nav shown in the top bar. The four scenarios collapse into
 * one "Scenarios" entry (its target is the first scenario anchor) — App Flow
 * still requires the bar to reflect *which* scenario is in view, so the header
 * surfaces the active scenario's unit + accent when a scenario leaf is active.
 */
export interface PrimaryNavItem {
  id: string;
  label: string;
  /** In-page target anchor. */
  target: string;
  /** When true, this item is active if ANY scenario leaf is in view. */
  scenarioGroup?: boolean;
}

export const primaryNav: PrimaryNavItem[] = [
  { id: "about", label: "About", target: "about" },
  { id: "journey", label: "Journey", target: "journey" },
  {
    id: "scenarios",
    label: "Scenarios",
    target: firstScenarioMeta.id,
    scenarioGroup: true,
  },
  { id: "skills", label: "Skills", target: "skills" },
  { id: "certifications", label: "Certifications", target: "certifications" },
  { id: "contact", label: "Contact", target: "contact" },
];

/** Set of scenario anchor ids, for quick "is a scenario active?" checks. */
export const scenarioAnchorIds = new Set(scenarioMetas.map((s) => s.id));
