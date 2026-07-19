import type { ScenarioMeta } from "@/lib/types";

/**
 * Scenario META only (Phase 2). The four immersive scenarios in App Flow order.
 * Full Scenario objects (narrativeBeats, interactiveMoment, scene3D, fallback)
 * are added with the scene engine in Phase 2.5 and Phase 4 — this list stays
 * the ordering + accent source of truth and must not drift from them.
 */
export const scenarioMetas = [
  {
    id: "scenario-offensive",
    slug: "offensive-security",
    unit: "SC-01",
    title: "Offensive Security",
    accent: "red-amber",
  },
  {
    id: "scenario-grc",
    slug: "grc-compliance",
    unit: "SC-02",
    title: "GRC & Compliance",
    accent: "blue",
  },
  {
    id: "scenario-ai",
    slug: "ai-secured-systems",
    unit: "SC-03",
    title: "AI-Secured Systems",
    accent: "violet",
  },
  {
    id: "scenario-cloud",
    slug: "cloud-infrastructure",
    unit: "SC-04",
    title: "Cloud & Infrastructure",
    accent: "teal",
  },
] satisfies ScenarioMeta[];

// Guaranteed non-empty accessor for the flagship (first) scenario — avoids
// non-null assertions at call sites under noUncheckedIndexedAccess.
const [first] = scenarioMetas;
if (!first) {
  throw new Error("scenarioMetas must contain at least one scenario");
}
export const firstScenarioMeta: ScenarioMeta = first;
