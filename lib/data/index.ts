import { blogPosts } from "@/data/blog";
import { certificates } from "@/data/certificates";
import { experience } from "@/data/experience";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import type {
  BlogPost,
  Certificate,
  Experience,
  Profile,
  Project,
} from "@/lib/types";

/**
 * Data access layer — the ONLY sanctioned way to read /data.
 * Components import from here, never from /data directly, so the static
 * files can be swapped for a CMS or database later without touching a
 * single component. Shape correctness is enforced at compile time
 * (`satisfies` in /data) and at test time (Zod, lib/data/data.test.ts).
 */

export function getProfile(): Profile {
  return profile;
}

export function getProjects(): Project[] {
  return [...projects];
}

/** Projects surfaced on the Home page highlight section. */
export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** Newest first. */
export function getCertificates(): Certificate[] {
  return [...certificates].sort((a, b) => b.date.localeCompare(a.date));
}

/** Current position first, then by most recent start date. */
export function getExperience(): Experience[] {
  return [...experience].sort((a, b) => {
    if ((a.endDate === null) !== (b.endDate === null)) {
      return a.endDate === null ? -1 : 1;
    }
    return b.startDate.localeCompare(a.startDate);
  });
}

/** Newest first. */
export function getBlogPosts(): BlogPost[] {
  return [...blogPosts].sort((a, b) => b.date.localeCompare(a.date));
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
