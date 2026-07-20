"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Timeline node marker. Unreached = hollow (bg-bg, muted border); reached =
 * solid accent fill — the exact "accent = active" language the scenario nodes
 * and nav dot already use, not a new motif. Fills once, on scroll-into-view.
 */
export function JourneyNode() {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <span
        aria-hidden
        className="absolute top-1.5 left-0 h-2.5 w-2.5 -translate-x-1/2 rounded-full border border-accent bg-accent"
      />
    );
  }

  return (
    <motion.span
      aria-hidden
      className="absolute top-1.5 left-0 h-2.5 w-2.5 -translate-x-1/2 rounded-full border"
      initial={{
        backgroundColor: "var(--bg)",
        borderColor: "var(--line-strong)",
      }}
      whileInView={{
        backgroundColor: "var(--accent)",
        borderColor: "var(--accent)",
      }}
      viewport={{ once: true, margin: "0px 0px -100px 0px" }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    />
  );
}
