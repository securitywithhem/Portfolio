import { z } from "zod";
import type { TimelineEvent } from "@/lib/types";
import { isoDateOrMonth, nonEmpty, slug, uniqueBy } from "./shared";

export const timelineCategorySchema = z.enum([
  "education",
  "experience",
  "certification",
  "milestone",
]);

export const timelineEventSchema = z.object({
  id: slug,
  date: isoDateOrMonth,
  title: nonEmpty,
  description: nonEmpty.max(300),
  category: timelineCategorySchema,
}) satisfies z.ZodType<TimelineEvent>;

/** Unique ids across the *merged* timeline — see getTimelineEvents(). */
export const timelineEventsSchema = z
  .array(timelineEventSchema)
  .min(1)
  .superRefine(uniqueBy("id"));
