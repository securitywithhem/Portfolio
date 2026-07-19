import type { NavSection } from "@/lib/types";

/**
 * ANCHOR ID CONTRACT (Phase 2.1) — read before building any section.
 *
 * These ids are the single source of truth for in-page navigation. Every
 * section component built in Phases 2.2+ MUST render a top-level element
 * with the matching `id` (e.g. `<section id="hero">`), in this order.
 *
 * - The navbar's active-section highlight observes exactly these ids; a
 *   section that renders a different id will never highlight.
 * - Jump-to-section offset under the sticky navbar is handled globally via
 *   `scroll-padding-top` on `html` (styles/globals.css) — sections must NOT
 *   add their own `scroll-mt-*`.
 * - The navbar height is h-16 (4rem); `scroll-padding-top` is 5rem to leave
 *   breathing room below it.
 * - "Home" points at the Hero section — there is no separate home anchor.
 *
 * Changing an id here is a breaking change for every section that anchors
 * to it; do it only in a change that updates both sides.
 */
export const navSections = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "journey", label: "Journey" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "certifications", label: "Certifications" },
  { id: "tryhackme", label: "TryHackMe" },
  { id: "github", label: "GitHub" },
  { id: "blog", label: "Blog" },
  { id: "contact", label: "Contact" },
] satisfies NavSection[];
