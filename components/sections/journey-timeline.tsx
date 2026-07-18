import {
  SectionPremium,
  SectionHeader,
} from "@/components/layout/section-premium";
import {
  NumberedDetailList,
  type DetailListItem,
} from "@/components/shared/numbered-detail-list";
import { getTimelineEvents } from "@/lib/data";
import type { TimelineCategory } from "@/lib/types";

const CATEGORY_LABEL: Record<TimelineCategory, string> = {
  education: "Education",
  experience: "Experience",
  certification: "Certification",
  milestone: "Milestone",
};

export function JourneyTimeline() {
  const events = getTimelineEvents();

  const items: DetailListItem[] = events.map((event) => ({
    id: event.id,
    title: event.title,
    meta: formatEventDate(event.date),
    tag: CATEGORY_LABEL[event.category],
    description: event.description,
  }));

  return (
    <SectionPremium id="journey" spacing="normal" accentLine="top">
      <SectionHeader
        eyebrow="Journey"
        index="02"
        title="How I got"
        titleAccent="here"
        subtitle="Milestones and key events in my career"
      />
      <NumberedDetailList items={items} ariaLabel="Career journey timeline" />
    </SectionPremium>
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
