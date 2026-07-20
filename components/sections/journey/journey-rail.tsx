"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useSpring, useReducedMotion } from "motion/react";

/**
 * Client wrapper around the (server-rendered) timeline list. Adds a
 * scroll-linked accent overlay on the existing static rail, so the line
 * visibly fills in as the visitor reads through — the same "accent = active/
 * reached" language used everywhere else on the site (nav dot, scenario STEP
 * labels), applied to this section's own device rather than inventing a new
 * one. `children` is server-rendered JSX passed straight through — this
 * boundary adds behavior, not content, so the SSR DOM is unaffected.
 */
export function JourneyRail({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.75", "end 0.35"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.4,
  });

  return (
    <div ref={containerRef} className="relative">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 w-px bg-accent"
        style={{
          height: "100%",
          scaleY: reduce ? 1 : progress,
          transformOrigin: "top",
        }}
      />
      {children}
    </div>
  );
}
