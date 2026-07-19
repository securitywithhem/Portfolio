"use client";

import { useEffect } from "react";
import { gsap } from "gsap";

/**
 * Premium page transition animation.
 * Fades in main content on mount with a staggered reveal.
 * Part of the Motion tier: Complex (8/10).
 */
export function PageTransition() {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReduced) {
      // Instant reveal if user prefers reduced motion
      gsap.set("main", { opacity: 1 });
      return;
    }

    // Animate in main content
    gsap.from("main", {
      opacity: 0,
      duration: 0.4,
      ease: "power1.inOut",
      delay: 0.1,
    });

    // Animate first section from top
    gsap.from("section:first-child", {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: "expo.out",
    });

    return () => {
      gsap.killTweensOf("main");
      gsap.killTweensOf("section:first-child");
    };
  }, []);

  return null;
}

/**
 * Exit animation before navigation.
 * Fade out current page before transitioning to next.
 */
export const pageTransitionOut = async () => {
  return await gsap.to("main", {
    opacity: 0,
    duration: 0.3,
    ease: "power1.inOut",
  });
};
