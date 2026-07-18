import { describe, expect, it } from "vitest";
import { blogPosts } from "@/data/blog";
import { certificates } from "@/data/certificates";
import { experience } from "@/data/experience";
import { navSections } from "@/data/navigation";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import {
  blogPostsSchema,
  certificatesSchema,
  experiencesSchema,
  navSectionsSchema,
  profileSchema,
  projectsSchema,
  timelineEventsSchema,
} from "@/lib/validations";
import {
  getBlogPosts,
  getExperience,
  getFeaturedProjects,
  getProjectBySlug,
  getTimelineEvents,
} from "@/lib/data";

/**
 * Build-time guarantee that every static data file matches its Zod schema.
 * If an edit to /data breaks the shape (or duplicates a slug/id), these
 * fail loudly in pre-commit and CI.
 */
describe("static data matches schemas", () => {
  it("profile", () => {
    expect(profileSchema.safeParse(profile)).toMatchObject({ success: true });
  });

  it("projects (incl. unique slugs/ids)", () => {
    const result = projectsSchema.safeParse(projects);
    expect(result.error?.issues ?? []).toEqual([]);
    expect(result.success).toBe(true);
  });

  it("certificates", () => {
    expect(certificatesSchema.safeParse(certificates)).toMatchObject({
      success: true,
    });
  });

  it("experience", () => {
    expect(experiencesSchema.safeParse(experience)).toMatchObject({
      success: true,
    });
  });

  it("blog posts (incl. unique slugs)", () => {
    expect(blogPostsSchema.safeParse(blogPosts)).toMatchObject({
      success: true,
    });
  });

  it("nav sections (incl. unique anchor ids)", () => {
    const result = navSectionsSchema.safeParse(navSections);
    expect(result.error?.issues ?? []).toEqual([]);
    expect(result.success).toBe(true);
  });

  it("includes the PRD-named projects", () => {
    const titles = projects.map((p) => p.title);
    expect(titles).toEqual(
      expect.arrayContaining(["VaultIQ", "Dharma", "API Pentesting"]),
    );
  });
});

describe("uniqueness is enforced, not assumed", () => {
  it("rejects duplicate project slugs", () => {
    const first = projects[0];
    if (!first) throw new Error("projects data is empty");
    const dup = [...projects, { ...first, id: "proj-other" }];
    const result = projectsSchema.safeParse(dup);
    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.message).toContain("Duplicate slug");
  });
});

/** Throwaway consumer proving the data-access-layer pattern works. */
describe("data access layer", () => {
  it("getFeaturedProjects returns only featured projects", () => {
    const featured = getFeaturedProjects();
    expect(featured.length).toBeGreaterThan(0);
    expect(featured.every((p) => p.featured)).toBe(true);
  });

  it("getProjectBySlug resolves a known slug and misses an unknown one", () => {
    expect(getProjectBySlug("vaultiq")?.title).toBe("VaultIQ");
    expect(getProjectBySlug("does-not-exist")).toBeUndefined();
  });

  it("getExperience puts current roles first", () => {
    const sorted = getExperience();
    const firstEnded = sorted.findIndex((e) => e.endDate !== null);
    const lastCurrent = sorted.map((e) => e.endDate).lastIndexOf(null);
    if (firstEnded !== -1 && lastCurrent !== -1) {
      expect(lastCurrent).toBeLessThan(firstEnded);
    }
  });

  it("getBlogPosts sorts newest first", () => {
    const dates = getBlogPosts().map((p) => p.date);
    expect(dates).toEqual([...dates].sort((a, b) => b.localeCompare(a)));
  });

  it("getTimelineEvents merges Experience/Certificates and sorts ascending, regardless of source order", () => {
    const events = getTimelineEvents();
    const dates = events.map((e) => e.date);
    expect(dates).toEqual([...dates].sort((a, b) => a.localeCompare(b)));

    // data/timeline.ts deliberately lists its milestones out of order —
    // this proves the accessor sorts explicitly rather than relying on it.
    expect(events[0]?.id).toBe("started-btech");

    // Experience/Certificates are represented without being duplicated as
    // separate hand-authored timeline entries.
    expect(events.some((e) => e.category === "experience")).toBe(true);
    expect(events.some((e) => e.category === "certification")).toBe(true);

    const result = timelineEventsSchema.safeParse(events);
    expect(result.error?.issues ?? []).toEqual([]);
    expect(result.success).toBe(true);
  });
});
