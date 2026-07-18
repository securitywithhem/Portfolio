"use client";

import { motion } from "motion/react";

import { ProjectCard } from "@/components/sections/project-card";
import { fadeUp, staggerChildren, subtleHover } from "@/lib/motion";
import type { Project } from "@/lib/types";

/**
 * Responsive card grid with a staggered reveal — same rationale as
 * SkillGrid (Phase 3C): Framer variants only propagate through motion
 * components, so the grid parent and each card wrapper must be client,
 * while `ProjectCard` itself stays a plain server-renderable component
 * passed in as children.
 *
 * Re-renders whenever ProjectExplorer's filtered list changes — that's the
 * point of filtering, and it's scoped to this subtree only (Hero/About/
 * Skills above it never re-render), so no extra memoization is needed for
 * a list this small (3 projects today).
 */
export function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={staggerChildren}
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {projects.map((project) => (
        <motion.div key={project.id} variants={fadeUp} whileHover={subtleHover}>
          <ProjectCard project={project} />
        </motion.div>
      ))}
    </motion.div>
  );
}
