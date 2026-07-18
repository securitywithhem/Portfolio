import {
  SectionPremium,
  SectionHeader,
} from "@/components/layout/section-premium";
import { TimelineList } from "@/components/sections/timeline-list";
import { getTimelineEvents } from "@/lib/data";

export function JourneyTimeline() {
  const events = getTimelineEvents();

  return (
    <SectionPremium id="journey" spacing="normal" accentLine="top">
      <SectionHeader
        eyebrow="Journey"
        title="How I got here"
        subtitle="Milestones and key events in my career"
      />
      <TimelineList events={events} />
    </SectionPremium>
  );
}
