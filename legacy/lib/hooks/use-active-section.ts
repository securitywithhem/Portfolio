"use client";

import * as React from "react";

/**
 * Active band: starts below the sticky navbar (matches the 5rem
 * `scroll-padding-top` in globals.css) and ends 45% down the viewport, so a
 * section becomes "active" while it occupies the reading position — not the
 * moment its first pixel enters the screen.
 */
const OBSERVER_ROOT_MARGIN = "-80px 0px -55% 0px";

/**
 * Tracks which in-page section currently occupies the reading position.
 *
 * IntersectionObserver only — no scroll listeners, so there is no per-frame
 * main-thread work; React re-renders happen only when the active id actually
 * changes. `ids` must be in document order (they are, per the contract in
 * data/navigation.ts): among visible sections the topmost wins.
 *
 * Returns null when none of the ids exist on the current page (e.g. on
 * routes other than the home page), so callers can render no highlight.
 * Assumes sections are at least ~half a viewport tall — a final section
 * shorter than that may never reach the band.
 */
export function useActiveSection(ids: string[]): string | null {
  const [activeId, setActiveId] = React.useState<string | null>(null);
  // Key by content, not array identity, so a caller mapping ids on each
  // render doesn't tear down the observer every time.
  const idsKey = ids.join(",");

  React.useEffect(() => {
    const orderedIds = idsKey.split(",").filter(Boolean);
    const sections = orderedIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) {
      setActiveId(null);
      return;
    }

    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.add(entry.target.id);
          } else {
            visible.delete(entry.target.id);
          }
        }
        const topmost = orderedIds.find((id) => visible.has(id));
        if (topmost) {
          setActiveId(topmost);
        }
      },
      { rootMargin: OBSERVER_ROOT_MARGIN },
    );

    for (const section of sections) {
      observer.observe(section);
    }
    return () => observer.disconnect();
  }, [idsKey]);

  return activeId;
}
