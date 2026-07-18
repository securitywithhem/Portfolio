/**
 * Journey Timeline entry category. Drives the marker icon in TimelineItem —
 * see the data-relationship decision in lib/data/index.ts#getTimelineEvents.
 */
export type TimelineCategory =
  "education" | "experience" | "certification" | "milestone";

/** A single point-in-time entry rendered in the Journey timeline. */
export interface TimelineEvent {
  /** Stable unique identifier. */
  id: string;
  /** ISO date (`YYYY-MM-DD`) or month (`YYYY-MM`) — see lib/validations/shared.ts#isoDateOrMonth. */
  date: string;
  title: string;
  description: string;
  category: TimelineCategory;
}
