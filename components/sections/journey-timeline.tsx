import { Container } from "@/components/layout/container";
import { TimelineList } from "@/components/sections/timeline-list";
import { SectionHeading } from "@/components/shared/section-heading";
import { getTimelineEvents } from "@/lib/data";

/**
 * Journey — third section in the scroll flow (Hero → About → Journey →
 * Skills → …), narrating milestones chronologically to bridge "who they
 * are" (About) into "what they can do" (Skills/Experience/Projects).
 * Server Component: data fetching and typing happen here; TimelineList is
 * the only client boundary (see its doc comment for why).
 *
 * `id="journey"` matches the anchor contract in data/navigation.ts.
 * Entry count is small by nature for a personal portfolio (milestones +
 * one experience role + a handful of certificates) — no
 * virtualization/pagination; that would be over-engineering for a list
 * that will realistically stay under ~15 items.
 *
 * Layout is vertical-only at every breakpoint (see TimelineItem) — a
 * responsive switch to horizontal on desktop was considered and rejected:
 * horizontal timelines are the more common UX anti-pattern (cramped
 * cards, awkward scroll containers), and a single reliable vertical
 * pattern reads as more "enterprise" than a layout that changes shape
 * across breakpoints.
 */
export function JourneyTimeline() {
  const events = getTimelineEvents();

  return (
    <section
      id="journey"
      aria-labelledby="journey-heading"
      className="py-24 sm:py-32"
    >
      <Container>
        <SectionHeading
          id="journey-heading"
          eyebrow="Journey"
          title="How I got here"
          className="mb-12"
        />
        <TimelineList events={events} />
      </Container>
    </section>
  );
}
