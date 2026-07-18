import { Container } from "@/components/layout/container";
import { ExperienceList } from "@/components/experience/experience-list";
import { SectionHeading } from "@/components/shared/section-heading";
import { getExperience } from "@/lib/data";

/**
 * Experience — work and internship history. Positioned after Skills in the
 * App Flow to establish credibility through practical work examples (PRD
 * objective: "Establish credibility...Highlight practical cybersecurity work").
 *
 * Server Component: data fetching and typing happen here; ExperienceList is
 * the only client boundary (animations via Framer Motion).
 *
 * Timeline follows the same vertical spine pattern as the Journey Timeline
 * (Phase 3) for visual consistency, but renders different content
 * (full achievements list, role details) since Experience serves a different
 * purpose in the recruiter's evaluation flow.
 *
 * Entries are sorted by getExperience(): current roles first (endDate === null),
 * then most recent start date — resume-style ordering for a work history section.
 *
 * `id="experience"` matches the anchor contract in data/navigation.ts.
 */
export function ExperienceTimeline() {
  const experiences = getExperience();

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="py-24 sm:py-32"
    >
      <Container>
        <SectionHeading
          id="experience-heading"
          eyebrow="Experience"
          title="Practical Security Work"
          className="mb-12"
        />
        <ExperienceList experiences={experiences} />
      </Container>
    </section>
  );
}
