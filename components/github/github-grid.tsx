"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";

import { fadeUp, staggerChildren, subtleHover } from "@/lib/motion";

/**
 * Grid of GitHub repos with staggered reveal animation. Uses the exact
 * pattern from Skills/Projects/Certifications grids for visual consistency.
 *
 * Accepts `children` (typically GitHubCard components passed as JSX),
 * so the grid component stays presentation-only and the parent section
 * owns the data fetching and card rendering.
 */
export function GitHubGrid({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={staggerChildren}
      className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
    >
      {children}
    </motion.div>
  );
}

/**
 * Individual grid item wrapper — adds motion animation per card.
 * Must be a client component to inherit stagger timing.
 */
export function GitHubGridItem({ children }: { children: ReactNode }) {
  return (
    <motion.div variants={fadeUp} whileHover={subtleHover}>
      {children}
    </motion.div>
  );
}
