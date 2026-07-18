"use client";

import { motion } from "motion/react";
import { Briefcase } from "lucide-react";

import { fadeUp } from "@/lib/motion";
import type { Experience } from "@/lib/types";

/**
 * One experience entry — role at company with achievements list. Client
 * component (motion.li) so it inherits the staggerChildren timing from
 * ExperienceList; see Journey Timeline's timeline-item.tsx for why this
 * is the accepted client boundary for Framer Motion stagger.
 *
 * Achievements render as a genuine ul/li list (not paragraphs), making them
 * scannable for recruiters and properly announced by screen readers.
 *
 * Ongoing role (endDate === null) is visually indicated with an accent
 * background on the "Present" badge, reusing the existing system's emphasis
 * pattern (like the "featured" treatment in Part 4A).
 */
export function ExperienceItem({ exp }: { exp: Experience }) {
  const { company, role, startDate, endDate, achievements } = exp;

  const formattedStart = formatMonthYear(startDate);
  const formattedEnd = endDate ? formatMonthYear(endDate) : "Present";
  const isOngoing = endDate === null;

  return (
    <motion.li
      variants={fadeUp}
      className="group relative flex gap-4 pb-10 last:pb-0"
    >
      {/* Marker + spine (mimics Journey Timeline) */}
      <div className="relative flex w-9 shrink-0 flex-col items-center">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full border bg-primary text-primary-foreground">
          <Briefcase aria-hidden className="size-4" />
        </span>
        <span
          aria-hidden
          className="mt-1 w-px flex-1 bg-border group-last:hidden"
        />
      </div>

      {/* Content */}
      <div className="flex-1 pt-1 pb-2">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <h3 className="text-lg font-semibold tracking-tight">{role}</h3>
          <span className="text-xs text-muted-foreground">{company}</span>
          {isOngoing && (
            <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
              Present
            </span>
          )}
        </div>
        <time className="block text-sm text-muted-foreground">
          {formattedStart} — {formattedEnd}
        </time>

        {achievements.length > 0 && (
          <ul className="mt-3 space-y-2">
            {achievements.map((achievement, idx) => (
              <li
                key={idx}
                className="flex gap-3 text-sm text-muted-foreground sm:text-base"
              >
                <span
                  aria-hidden
                  className="mt-1 inline-block size-1.5 shrink-0 rounded-full bg-primary/60"
                />
                <span>{achievement}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.li>
  );
}

/** `YYYY-MM` → "May 2025" */
function formatMonthYear(date: string): string {
  const [year, month] = date.split("-").map(Number);
  if (!year || !month) return date;
  const formatted = new Date(Date.UTC(year, month - 1, 1));
  return formatted.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    timeZone: "UTC",
  });
}
