"use client";

import { useRef, type ReactNode } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useSpring, useReducedMotion } from "motion/react";
import { useCapability } from "@/lib/capability";

const JourneyAmbientScene = dynamic(() => import("./journey-ambient-scene"), {
  ssr: false,
});

/**
 * Client wrapper around the (server-rendered) timeline list. Adds:
 *  - a scroll-linked accent progress line drawn over the static rail, so the
 *    timeline visibly "fills in" as the visitor reads through it;
 *  - an ambient 3D chain behind the list, mounted only on the full capability
 *    tier (desktop + WebGL2 + motion allowed) — reduced-motion/mobile/low-end
 *    visitors get the identical content with the static rail only.
 *
 * `children` is server-rendered JSX passed straight through — this boundary
 * adds behavior, not content, so the SSR DOM is unaffected.
 */
export function JourneyRail({
  count,
  children,
}: {
  count: number;
  children: ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { capability, detected } = useCapability();
  const showScene = detected && capability.tier === "full";

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
      {/* Ambient 3D — decorative, behind the readable content, never intercepts input. */}
      {showScene && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-70 mix-blend-screen"
        >
          <JourneyAmbientScene count={count} />
        </div>
      )}

      {/* Scroll-filled accent overlay on top of the list's static border-l rail. */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 w-px bg-accent"
        style={{
          height: "100%",
          scaleY: reduce ? 1 : progress,
          transformOrigin: "top",
          opacity: reduce ? 0.6 : 1,
        }}
      />

      {children}
    </div>
  );
}
