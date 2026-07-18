import type { Transition, Variants } from "motion/react";

/**
 * Motion tokens — the single place animation timing/easing is defined.
 * Components must import these presets instead of writing inline variants;
 * no animation duration or easing may be hardcoded elsewhere.
 *
 * All presets animate only opacity/transform (compositor-friendly, no layout
 * shift). `prefers-reduced-motion` is honored globally via
 * `<MotionConfig reducedMotion="user">` in components/providers.tsx, which
 * disables the transform portion of these presets for users who opt out.
 */

/** Standard easing/duration for entrances (v2 §5: ease-default, duration-base). */
export const transitionBase: Transition = {
  duration: 0.5,
  ease: [0.16, 1, 0.3, 1],
};

/** Fast easing for micro-interactions (hover, press) — v2 duration-fast. */
export const transitionFast: Transition = {
  duration: 0.2,
  ease: [0.16, 1, 0.3, 1],
};

/** Element rises 24px (v2 reveal-offset) and fades in. Pair with `initial="hidden" animate="visible"`. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: transitionBase },
};

/** Opacity-only entrance for surfaces where movement would distract. */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
};

/**
 * Parent container that reveals `fadeUp`/`fadeIn` children one after another.
 * Apply to the wrapper; children carry their own variants.
 */
export const staggerChildren: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

/** Subtle scale for interactive cards/buttons — use with `whileHover`. */
export const subtleHover = {
  scale: 1.02,
  transition: transitionFast,
} as const;
