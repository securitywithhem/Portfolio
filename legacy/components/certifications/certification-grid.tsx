"use client";

import { motion } from "motion/react";

import { CertificationCard } from "@/components/certifications/certification-card";
import { fadeIn, staggerChildren } from "@/lib/motion";
import type { Certificate } from "@/lib/types";

/**
 * Flat logo/name grid (Design System v2 §6 — the "enterprise partners" wall).
 * Cells are separated by hairline borders (no cards, no shadow, no gap-fill
 * blocks on partial rows): a top/left frame on the list plus right/bottom
 * borders per cell. Opacity-only stagger so the hairline seams stay stable
 * during the reveal.
 *
 * Shared by Certifications and TryHackMe so both render the same credential
 * wall. Variants only propagate through motion components, hence the client
 * boundary here while each CertificationCard stays server-renderable.
 */
export function CertificationGrid({ certs }: { certs: Certificate[] }) {
  return (
    <motion.ul
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={staggerChildren}
      className="border-border-subtle grid grid-cols-1 border-t border-l sm:grid-cols-2 lg:grid-cols-3"
    >
      {certs.map((cert) => (
        <motion.li
          key={cert.id}
          variants={fadeIn}
          className="border-border-subtle border-r border-b"
        >
          <CertificationCard cert={cert} />
        </motion.li>
      ))}
    </motion.ul>
  );
}
