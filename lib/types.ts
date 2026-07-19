/**
 * Shared domain types. The `Scenario` entity (Backend Schema) is the core of
 * the immersive rebuild; Phase 2 only needs its *meta* (id/slug/unit/title/
 * accent) for navigation. The full Scenario shape (narrativeBeats, scene3D,
 * fallback, …) lands with the scene engine in Phase 2.5.
 */

/** One accent per scenario — never a single global accent. See DESIGN.md. */
export type AccentKey = "red-amber" | "blue" | "violet" | "teal";

export interface Social {
  label: string;
  url: string;
}

export interface Profile {
  name: string;
  role: string;
  bio: string;
  socials: Social[];
  resumeUrl: string;
  email: string;
  location: string;
  aboutBio: string[];
  aboutPullQuote: string;
  focusAreas: string[];
}

/** Lightweight scenario descriptor used by navigation + the scenario index. */
export interface ScenarioMeta {
  /** In-page anchor id, e.g. "scenario-offensive". */
  id: string;
  /** URL/detail slug, e.g. "offensive-security". */
  slug: string;
  /** Telemetry unit label, e.g. "SC-01". */
  unit: string;
  title: string;
  accent: AccentKey;
}

/** A flat, ordered nav target that the scroll-spy observes. */
export interface NavLeaf {
  id: string;
  label: string;
  /** True for the four scenario anchors (drives per-scenario highlight). */
  scenario?: ScenarioMeta;
}
