import type { NavLeaf } from "@/lib/types";

/**
 * ANCHOR ID CONTRACT — read before building any section.
 *
 * The page is a hiring funnel in five stops: who I am (hero) → why I'm
 * different (approach, which carries the 3D set piece) → what I built (work) →
 * breadth (capabilities, with credentials folded in below it) → the ask
 * (contact).
 *
 * Every section MUST render an element with the matching `id`, in this order.
 * The scroll-spy (`lib/hooks/use-active-section.ts`) observes exactly these
 * ids; a section rendering a different id will never highlight.
 *
 * Jump offset under the sticky header is handled globally via
 * `scroll-padding-top` on <html> (styles/globals.css) — sections must NOT add
 * their own scroll-margin.
 */
export const navLeaves: NavLeaf[] = [
  { id: "hero", label: "Home" },
  { id: "approach", label: "Approach" },
  { id: "work", label: "Work" },
  { id: "capabilities", label: "Capabilities" },
  { id: "contact", label: "Contact" },
];

export interface PrimaryNavItem {
  id: string;
  label: string;
  /** In-page target anchor. */
  target: string;
}

/**
 * Header nav — the same targets minus Home, which the wordmark already covers.
 */
export const primaryNav: PrimaryNavItem[] = navLeaves
  .filter((l) => l.id !== "hero")
  .map((l) => ({ id: l.id, label: l.label, target: l.id }));
