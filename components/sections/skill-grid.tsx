"use client";

import { motion } from "motion/react";

import { SkillCategoryCard } from "@/components/sections/skill-category-card";
import { fadeUp, staggerChildren, subtleHover } from "@/lib/motion";
import type { SkillCategory } from "@/lib/types";

/**
 * Responsive card grid with a staggered reveal — same rationale as
 * TimelineList (Part 3B): Framer variants only propagate through motion
 * components, so the grid parent and each card wrapper must be client,
 * while `SkillCategoryCard` itself stays a plain server-renderable
 * component passed in as children. `whileHover={subtleHover}` gives the
 * tasteful lift the UI spec asks for, using the existing preset rather
 * than a one-off scale value.
 */
export function SkillGrid({ categories }: { categories: SkillCategory[] }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={staggerChildren}
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {categories.map((category) => (
        <motion.div
          key={category.id}
          variants={fadeUp}
          whileHover={subtleHover}
        >
          <SkillCategoryCard category={category} />
        </motion.div>
      ))}
    </motion.div>
  );
}
