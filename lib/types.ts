/**
 * Shared domain types. One entity per section of the page — the site renders
 * `data/` directly, so these are the only shapes content has to satisfy.
 */

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

/** A flat, ordered nav target that the scroll-spy observes. */
export interface NavLeaf {
  id: string;
  label: string;
}

export type SkillCategory =
  "offensive" | "grc" | "ai-security" | "cloud" | "general";

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  proficiencyNote?: string;
}

/** Narrative display grouping for the Capabilities section (view model). */
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

export interface Project {
  id: string;
  title: string;
  slug: string;
  tagline?: string;
  description: string;
  /** How it is actually engineered — the technical basis, in one sentence. */
  technical?: string;
  whyItMatters?: string;
  /** The one outcome a recruiter should retain — a metric or hard capability. */
  highlight?: string;
  techStack: string[];
  images: string[];
  github: string | null;
  /** Shown in place of a source link when the repo is real but private. */
  sourceNote?: string;
  live: string | null;
  featured: boolean;
}
