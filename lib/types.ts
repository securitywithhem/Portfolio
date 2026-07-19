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

/* ------------------------------------------------------------------ *
 * Scenario (Backend Schema core entity) — full shape.                 *
 * Consumed IDENTICALLY by the SSR DOM, the 3D scene, and the fallback *
 * (Data Integrity Rule — no content forks).                           *
 * ------------------------------------------------------------------ */

export type ScenarioEnvironment =
  | "network-topology"
  | "audit-ledger"
  | "encrypted-vault"
  | "cloud-architecture";

/** Interactive-moment kinds. Kept to this small enum on purpose (no mini-games). */
export type InteractiveType = "trace" | "reveal" | "inspect";

export type SkillCategory =
  "offensive" | "grc" | "ai-security" | "cloud" | "general";

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  proficiencyNote?: string;
}

/** Narrative display grouping for the Skills section (view model). */
export interface SkillGroup {
  id: string;
  title: string;
  /** References Skill.id, in display order. */
  skillIds: string[];
}

export interface TimelineEvent {
  id: string;
  /** YYYY-MM. */
  date: string;
  title: string;
  description: string;
  category: "education" | "experience" | "milestone";
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  /** YYYY-MM-DD. */
  date: string;
  credentialUrl: string | null;
}

export interface NarrativeBeat {
  id: string;
  order: number;
  heading: string;
  body: string;
  /** References Skill.id. */
  relatedSkillIds: string[];
}

export interface InteractiveMoment {
  type: InteractiveType;
  description: string;
  /** Accessible label — used identically on both rendering tiers. */
  triggerLabel: string;
}

export interface CameraKeyframe {
  /** Scroll progress 0..1 this keyframe anchors to. */
  progress: number;
  position: [number, number, number];
  lookAt: [number, number, number];
}

/** Full-tier only (nullable on the Scenario). */
export interface Scene3D {
  /** Optional .glb (Draco/KTX2). Phase 2.5 uses procedural geometry, no asset. */
  modelPath?: string;
  cameraKeyframes: CameraKeyframe[];
}

/** One fallback animation state, mapped 1:1 to a NarrativeBeat by id. */
export interface FallbackAnimationBeat {
  beatId: string;
  /** Visual motif hint the fallback illustration renders at this beat. */
  motif: string;
}

/** Required on every Scenario — guarantees content parity without WebGL. */
export interface ScenarioFallback {
  illustrationRef: string;
  animationBeats: FallbackAnimationBeat[];
}

export interface Scenario extends ScenarioMeta {
  environmentType: ScenarioEnvironment;
  /** 1–2 sentence framing — fallback meta/SEO + non-JS text summary. */
  summary: string;
  narrativeBeats: NarrativeBeat[];
  interactiveMoment: InteractiveMoment;
  /** References Project.id — null when the payoff is capability/cert-backed. */
  payoffProjectId: string | null;
  /** Payoff shown when there is no owning project (e.g. cert-backed cloud). */
  payoffSummary?: string;
  scene3D: Scene3D | null;
  fallback: ScenarioFallback;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  tagline?: string;
  description: string;
  whyItMatters?: string;
  techStack: string[];
  images: string[];
  github: string | null;
  live: string | null;
  featured: boolean;
  /** Links back to the owning Scenario; null if not surfaced through one. */
  scenarioId: string | null;
}
