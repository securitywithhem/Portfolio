"use client";

import { motion } from "motion/react";

import { TimelineItem } from "@/components/sections/timeline-item";
import { staggerChildren } from "@/lib/motion";
import type { TimelineEvent } from "@/lib/types";

/**
 * The `<ol>` itself — timeline entries are inherently ordinal, not a
 * generic list, so this must be a real ordered list rather than styled
 * `<div>`s. `events` is plain serializable data fetched server-side by
 * JourneyTimeline; this file only owns rendering + the staggered reveal.
 *
 * Framer Motion variants only propagate through motion components, so
 * achieving true per-item stagger (not just one fade on the whole list)
 * requires both this `motion.ol` and each `motion.li` (TimelineItem) to be
 * client-rendered — an inherent constraint of the library, not a choice to
 * avoid. Data mapping/typing still happens on the server (JourneyTimeline
 * calls getTimelineEvents()); this is the "motion wrapper" the perf
 * requirement says to isolate, sized to what Framer actually requires.
 *
 * `viewport={{ once: true }}`: the stagger plays once on first scroll in,
 * matching FadeInView's convention from About.
 */
export function TimelineList({ events }: { events: TimelineEvent[] }) {
  return (
    <motion.ol
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={staggerChildren}
      className="list-none"
    >
      {events.map((event) => (
        <TimelineItem key={event.id} event={event} />
      ))}
    </motion.ol>
  );
}
