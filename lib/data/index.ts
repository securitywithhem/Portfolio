import { blogPosts } from "@/data/blog";
import { certificates } from "@/data/certificates";
import { experience } from "@/data/experience";
import { navSections } from "@/data/navigation";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { timelineMilestones } from "@/data/timeline";
import type {
  BlogPost,
  Certificate,
  Experience,
  NavSection,
  Profile,
  Project,
  TimelineEvent,
} from "@/lib/types";
import { slugify } from "@/lib/utils";

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

/** In-page sections in scroll order — see data/navigation.ts for the anchor id contract. */
export function getNavSections(): NavSection[] {
  return [...navSections];
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

/**
 * Journey timeline: milestone-only entries merged with Experience and
 * Certificate facts mapped into TimelineEvent shape — see the
 * data-relationship decision recorded in data/timeline.ts. Sorted
 * ascending (oldest first) so the section reads as a forward narrative;
 * this is the opposite of getExperience()/getCertificates() below, which
 * are newest-first for their own resume-style sections — both orderings
 * are deliberate for their context.
 */
export function getTimelineEvents(): TimelineEvent[] {
  const experienceEvents: TimelineEvent[] = experience.map((e) => ({
    id: `experience-${slugify(e.company)}`,
    date: e.startDate,
    title: `${e.role} — ${e.company}`,
    description: e.achievements[0] ?? "",
    category: "experience",
  }));

  const certificateEvents: TimelineEvent[] = certificates.map((c) => ({
    id: `certification-${c.id}`,
    date: c.date,
    title: c.title,
    description: `Issued by ${c.issuer}.`,
    category: "certification",
  }));

  return [
    ...timelineMilestones,
    ...experienceEvents,
    ...certificateEvents,
  ].sort((a, b) => a.date.localeCompare(b.date));
}

/** Newest first. */
export function getBlogPosts(): BlogPost[] {
  return [...blogPosts].sort((a, b) => b.date.localeCompare(a.date));
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
