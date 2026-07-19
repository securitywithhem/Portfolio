"use client";

import { MotionConfig } from "motion/react";

/** Applies `prefers-reduced-motion` to every Framer Motion preset globally. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
