"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Entrance reveal. Ease-out on mount (entrances only). Honors
 * prefers-reduced-motion as a hard override AT THE CALL SITE — when reduced,
 * children render immediately at their final state (never hidden), keeping
 * content visible and accessible. Server-rendered children are passed through,
 * so the DOM text is present for crawlers regardless.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
