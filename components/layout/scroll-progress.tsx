"use client";

import { motion, useScroll, useSpring } from "motion/react";

/**
 * Thin accent progress bar tied to scroll position (Design System v2 §5).
 * Fixed to the very top, above the sticky nav. Uses a spring so it eases
 * rather than tracking scroll 1:1. Purely decorative — hidden from a11y tree.
 * `<MotionConfig reducedMotion="user">` (providers) neutralizes the spring
 * animation for users who opt out of motion.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-accent"
    />
  );
}
