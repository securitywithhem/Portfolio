"use client";

import { motion } from "motion/react";

import { fadeUp } from "@/lib/motion";

/**
 * Scroll-triggered entrance wrapper for below-the-fold sections (About,
 * Journey, Skills, …) — extracted as a shared client leaf so each section
 * stays a Server Component and composes this in, the same pattern Hero uses
 * for HeroParticles. Animates only opacity/transform (the `fadeUp` preset),
 * so it never causes layout shift, and `MotionConfig reducedMotion="user"`
 * (app-wide) disables the transform portion for users who opt out.
 *
 * `viewport={{ once: true }}`: the entrance plays on first scroll into
 * view only — it's an arrival cue, not a repeating effect, and re-firing
 * on every scroll direction would read as distracting rather than subtle.
 */
export function FadeInView({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeUp}
      className={className}
    >
      {children}
    </motion.div>
  );
}
