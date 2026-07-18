"use client";

import { Award, Briefcase, GraduationCap, Sparkles } from "lucide-react";
import { motion } from "motion/react";

import { fadeUp } from "@/lib/motion";
import type { TimelineCategory, TimelineEvent } from "@/lib/types";

/**
 * One entry on the spine. `motion.li` (not a plain `<li>` wrapped in
 * motion.div) so the semantic list item itself is what animates — no extra
 * non-semantic wrapper element. Must live in a client file to be a motion
 * component and inherit `visible`/`hidden` from the parent's
 * staggerChildren timing (see TimelineList) — see journey-timeline.tsx for
 * why this is the accepted client boundary rather than a defect.
 *
 * Marker uses the existing `primary` (deep blue) token for every category —
 * only the icon glyph varies, per "reuse existing accent, don't introduce
 * a new one."
 */

const CATEGORY_ICON: Record<TimelineCategory, React.ElementType> = {
  education: GraduationCap,
  experience: Briefcase,
  certification: Award,
  milestone: Sparkles,
};

const CATEGORY_LABEL: Record<TimelineCategory, string> = {
  education: "Education",
  experience: "Experience",
  certification: "Certification",
  milestone: "Milestone",
};

export function TimelineItem({ event }: { event: TimelineEvent }) {
  const Icon = CATEGORY_ICON[event.category];

  return (
    <motion.li
      variants={fadeUp}
      className="group relative flex gap-4 pb-10 last:pb-0"
    >
      <div className="relative flex w-9 shrink-0 flex-col items-center">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full border bg-primary text-primary-foreground">
          <Icon aria-hidden className="size-4" />
        </span>
        {/* Spine segment connecting to the next marker — omitted after the last item. */}
        <span
          aria-hidden
          className="mt-1 w-px flex-1 bg-border group-last:hidden"
        />
      </div>
      <div className="flex-1 pt-1 pb-2">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <h3 className="text-lg font-semibold tracking-tight">
            {event.title}
          </h3>
          <span className="text-xs font-medium text-primary uppercase">
            {CATEGORY_LABEL[event.category]}
          </span>
        </div>
        <time
          dateTime={event.date}
          className="block text-sm text-muted-foreground"
        >
          {formatEventDate(event.date)}
        </time>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
          {event.description}
        </p>
      </div>
    </motion.li>
  );
}

/** `YYYY-MM` → "May 2025"; `YYYY-MM-DD` → "May 15, 2025". Avoids timezone-shift bugs from `new Date("YYYY-MM")`. */
function formatEventDate(date: string): string {
  const [year, month, day] = date.split("-").map(Number);
  if (!year || !month) return date;
  const formatted = new Date(Date.UTC(year, month - 1, day ?? 1));
  return formatted.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: day ? "numeric" : undefined,
    timeZone: "UTC",
  });
}
