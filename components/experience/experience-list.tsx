"use client";

import { motion } from "motion/react";

import { ExperienceItem } from "@/components/experience/experience-item";
import { staggerChildren } from "@/lib/motion";
import type { Experience } from "@/lib/types";

/**
 * Ordered list of experience entries with staggered reveal. Follows the
 * exact pattern from Journey Timeline's TimelineList (Phase 3) to maintain
 * consistency across timeline-style sections.
 *
 * Must be a real ordered list (ol, not styled divs) since work history
 * is inherently chronological/ordinal — screen readers need to announce
 * the sequence.
 *
 * Must be client-rendered for Framer Motion variants to propagate through
 * the ol and li elements; see timeline-list.tsx for detailed reasoning.
 */
export function ExperienceList({ experiences }: { experiences: Experience[] }) {
  return (
    <motion.ol
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={staggerChildren}
      className="list-none"
    >
      {experiences.map((exp) => (
        <ExperienceItem key={`${exp.company}-${exp.startDate}`} exp={exp} />
      ))}
    </motion.ol>
  );
}
