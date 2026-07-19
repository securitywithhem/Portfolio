"use client";

import { useEffect, useRef, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  offset?: number;
  className?: string;
}

/**
 * Scroll Reveal Wrapper — fade in + slide up when element enters viewport.
 * Part of the Premium Motion tier (8/10).
 *
 * Props:
 * - delay: stagger delay (default: 0)
 * - duration: animation duration (default: 500ms)
 * - offset: y-offset before animation (default: 24px)
 * - className: additional CSS classes
 */
export function ScrollReveal({
  children,
  delay = 0,
  duration = 500,
  offset = 24,
  className = "",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const element = ref.current;
    if (prefersReduced || !element) return;

    gsap.from(element, {
      opacity: 0,
      y: offset,
      duration: duration / 1000,
      ease: "power2.out",
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
        toggleActions: "play none none reverse",
        markers: false,
      },
      delay: delay / 1000,
    });

    return () => {
      ScrollTrigger.getAll()
        .filter((t) => t.vars.trigger === element)
        .forEach((t) => t.kill());
    };
  }, [delay, duration, offset]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/**
 * Stagger Reveal — stagger children into view on scroll.
 * Great for lists, grids, and groups of items.
 */
interface StaggerRevealProps {
  children: ReactNode;
  staggerDelay?: number;
  itemDuration?: number;
  offset?: number;
  className?: string;
}

export function StaggerReveal({
  children,
  staggerDelay = 0.04,
  itemDuration = 300,
  offset = 12,
  className = "",
}: StaggerRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const element = ref.current;
    if (prefersReduced || !element) return;

    gsap.from(element.children, {
      opacity: 0,
      y: offset,
      duration: itemDuration / 1000,
      stagger: staggerDelay,
      ease: "power1.out",
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
        toggleActions: "play none none reverse",
        markers: false,
      },
    });

    return () => {
      ScrollTrigger.getAll()
        .filter((t) => t.vars.trigger === element)
        .forEach((t) => t.kill());
    };
  }, [staggerDelay, itemDuration, offset]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/**
 * Parallax Scroll — background moves slower than foreground for depth.
 */
interface ParallaxScrollProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

export function ParallaxScroll({
  children,
  speed = 0.5,
  className = "",
}: ParallaxScrollProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const element = ref.current;
    if (prefersReduced || !element) return;

    gsap.to(element, {
      yPercent: speed * 50,
      scrollTrigger: {
        trigger: element,
        start: "top center",
        end: "bottom center",
        scrub: true,
        markers: false,
      },
    });

    return () => {
      ScrollTrigger.getAll()
        .filter((t) => t.vars.trigger === element)
        .forEach((t) => t.kill());
    };
  }, [speed]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
