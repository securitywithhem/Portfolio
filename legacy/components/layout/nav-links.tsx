"use client";

import Link from "next/link";
import { motion } from "motion/react";

import { transitionFast } from "@/lib/motion";
import type { NavSection } from "@/lib/types";
import { cn } from "@/lib/utils";

/**
 * Desktop link list with the animated active-section indicator. Presentational
 * only — active state is computed once in SiteNav and passed down. The shared
 * `layoutId` makes the underline glide between links as the active section
 * changes (disabled automatically under reduced motion via MotionConfig).
 */
export function NavLinks({
  sections,
  activeId,
}: {
  sections: NavSection[];
  activeId: string | null;
}) {
  return (
    <ul className="flex items-center">
      {sections.map(({ id, label }) => {
        const isActive = id === activeId;
        return (
          <li key={id} className="relative">
            <Link
              href={`/#${id}`}
              aria-current={isActive ? "location" : undefined}
              className={cn(
                "block px-2.5 py-2 text-sm whitespace-nowrap transition-colors",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {label}
            </Link>
            {isActive && (
              <motion.span
                aria-hidden
                layoutId="active-section-indicator"
                transition={transitionFast}
                className="absolute inset-x-2.5 bottom-0 h-0.5 rounded-full bg-primary"
              />
            )}
          </li>
        );
      })}
    </ul>
  );
}
