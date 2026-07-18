"use client";

import { motion } from "motion/react";

import { CertificationCard } from "@/components/certifications/certification-card";
import { fadeUp, staggerChildren, subtleHover } from "@/lib/motion";
import type { Certificate } from "@/lib/types";

/**
 * Responsive card grid with staggered reveal. Server component children
 * (CertificationCard) are passed through motion wrappers per
 * COMPONENT_ARCHITECTURE.md — variants only propagate through motion
 * components, so the grid parent and each card wrapper are client, while
 * the card itself stays server-renderable.
 *
 * Used by both Certifications and TryHackMe sections so they share the
 * exact same grid layout, spacing, and reveal behavior.
 */
export function CertificationGrid({ certs }: { certs: Certificate[] }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={staggerChildren}
      className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
    >
      {certs.map((cert) => (
        <motion.div key={cert.id} variants={fadeUp} whileHover={subtleHover}>
          <CertificationCard cert={cert} />
        </motion.div>
      ))}
    </motion.div>
  );
}
