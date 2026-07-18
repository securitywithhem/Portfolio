"use client";

import { useActiveSection } from "@/lib/hooks/use-active-section";
import type { NavSection } from "@/lib/types";

import { MobileNav } from "./mobile-nav";
import { NavLinks } from "./nav-links";

/**
 * The one client owner of navigation state: a single IntersectionObserver
 * (useActiveSection) feeds both the desktop list and the mobile drawer, so
 * the two can never disagree. `children` is a slot for the ThemeToggle —
 * passed in from the server shell so this component stays ignorant of it.
 *
 * Desktop links appear at xl (1280px+): 11 sections don't fit the header row
 * at md/lg without truncating labels, so tablets get the drawer. The hidden
 * variant uses display:none, which also removes the inactive nav from the
 * accessibility tree — only one "Primary" nav is ever exposed.
 */
export function SiteNav({
  sections,
  children,
}: {
  sections: NavSection[];
  children?: React.ReactNode;
}) {
  const activeId = useActiveSection(sections.map((s) => s.id));

  return (
    <>
      <nav aria-label="Primary" className="hidden xl:block">
        <NavLinks sections={sections} activeId={activeId} />
      </nav>
      <div className="flex items-center gap-1">
        {children}
        <MobileNav sections={sections} activeId={activeId} />
      </div>
    </>
  );
}
