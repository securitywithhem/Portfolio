"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Entrance reveal. Ease-out on mount (entrances only). Honors
 * prefers-reduced-motion as a hard override AT THE CALL SITE — when reduced,
 * children render immediately at their final state (never hidden), keeping
 * content visible and accessible. Server-rendered children are passed through,
 * so the DOM text is present for crawlers regardless.
 *
 * mode:
 *  - "fade"  (default) opacity + slight rise. For below-the-fold content.
 *  - "slide" transform-only, opacity stays 1 so the element PAINTS immediately.
 *            Use for above-the-fold / LCP-candidate content — a JS-gated
 *            opacity:0 there would delay Largest Contentful Paint.
 *
 * inView: trigger on scroll-into-view (once) instead of on mount — for content
 * further down the page where an on-mount delay would've already elapsed
 * before the visitor scrolls there. Small y-offset per ui-ux-pro-max scroll
 * reveal guidance (8-16px reads as a fade, not a slide); toggleActions-style
 * "once" avoids re-triggering on scroll direction changes.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  mode = "fade",
  inView = false,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  mode?: "fade" | "slide";
  inView?: boolean;
}) {
  const reduce = useReducedMotion();

  if (reduce) return <div className={className}>{children}</div>;

  const initial = mode === "slide" ? { y: 14 } : { opacity: 0, y: 12 };
  const animate = mode === "slide" ? { y: 0 } : { opacity: 1, y: 0 };
  const transition = { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] as const };

  if (inView) {
    return (
      <motion.div
        className={className}
        initial={initial}
        whileInView={animate}
        viewport={{ once: true, margin: "0px 0px -80px 0px" }}
        transition={transition}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={initial}
      animate={animate}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}
