/**
 * A named competency within a category (a tool, language, or practice).
 * No proficiency score/level field — see data/skills.ts for why.
 */
export interface SkillItem {
  name: string;
}

/** A named group of related skills (Backend Schema has no Skills entity — see data/skills.ts). */
export interface SkillCategory {
  /** Stable unique identifier. */
  id: string;
  title: string;
  items: SkillItem[];
}
