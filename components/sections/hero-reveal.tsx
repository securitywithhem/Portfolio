"use client";

import { motion, useReducedMotion } from "motion/react";
import { Children, type ReactNode } from "react";

/**
 * The one choreographed page-load on the site.
 *
 * Every other plate earns its own motion (or none) rather than sharing a single
 * fade-on-scroll applied everywhere — that uniform reflex is itself the tell.
 * Here the hero's blocks rise in sequence as one gesture.
 *
 * Transform-only, with opacity left at 1 throughout: the <h1> is the LCP
 * element, and animating it up from opacity 0 would delay the largest paint to
 * buy an effect nobody consciously sees. The rise reads as choreography on its
 * own.
 */
export function HeroReveal({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();

  if (reduce) return <>{children}</>;

  return (
    <motion.div
      initial="hidden"
      animate="shown"
      transition={{ staggerChildren: 0.09, delayChildren: 0.04 }}
    >
      {Children.map(children, (child) => (
        <motion.div
          variants={{ hidden: { y: 22 }, shown: { y: 0 } }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
