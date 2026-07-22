"use client";

import dynamic from "next/dynamic";
import { useScroll } from "motion/react";
import type { RefObject } from "react";
import { useCapability } from "@/lib/capability";
import { LatticeFallback } from "./lattice-fallback";

/**
 * `three` is pulled in only when the full tier actually renders. Capability
 * detection defaults to the fallback tier on the server and on first client
 * render, so this chunk is never requested for reduced-motion, small-viewport
 * or no-WebGL2 visitors.
 */
const LatticeCanvas = dynamic(() => import("./lattice-canvas"), {
  ssr: false,
});

/**
 * Sticky figure for the Approach section. Progress is the scroll position of
 * the surrounding section, normalised 0→1, so the geometry resolves in step
 * with the three beats of copy beside it rather than on a timer of its own.
 */
export function LatticeFigure({
  sectionRef,
}: {
  sectionRef: RefObject<HTMLDivElement | null>;
}) {
  const { capability, detected } = useCapability();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const full = detected && capability.tier === "full";

  return (
    <div className="sticky top-24 h-[52vh] w-full md:h-[70vh]">
      {full ? (
        <LatticeCanvas progress={scrollYProgress} />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <LatticeFallback />
        </div>
      )}
    </div>
  );
}
