"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";

import { fadeIn, staggerChildren } from "@/lib/motion";

/**
 * Flat hairline grid of GitHub repos (Design System v2) — the same credential
 * wall treatment as CertificationGrid: a top/left frame plus per-cell
 * right/bottom borders, opacity-only stagger so the seams stay stable.
 *
 * Accepts server-rendered GitHubCard elements as children (each wrapped in a
 * GitHubGridItem), keeping data fetching in the parent section while the
 * motion wrappers stay client-side.
 */
export function GitHubGrid({ children }: { children: ReactNode }) {
  return (
    <motion.ul
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={staggerChildren}
      className="border-border-subtle grid grid-cols-1 border-t border-l sm:grid-cols-2 lg:grid-cols-3"
    >
      {children}
    </motion.ul>
  );
}

/** Individual grid cell wrapper — motion.li so it inherits the stagger. */
export function GitHubGridItem({ children }: { children: ReactNode }) {
  return (
    <motion.li
      variants={fadeIn}
      className="border-border-subtle border-r border-b"
    >
      {children}
    </motion.li>
  );
}
