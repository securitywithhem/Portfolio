import { Container } from "@/components/layout/container";
import { CertificationGrid } from "@/components/certifications/certification-grid";
import { SectionHeading } from "@/components/shared/section-heading";
import { getTryHackMeAchievements } from "@/lib/data";

/**
 * TryHackMe Achievements — hands-on learning paths completed on the
 * TryHackMe platform. Section 7 in the scroll flow per UI/UX and App Flow;
 * adjacent to Certifications (Section 6) but kept visually and
 * semantically distinct (separate section heading, distinct id).
 *
 * Reuses CertificationCard and CertificationGrid (same schema, different
 * data source) so there's no duplicate card logic — the distinction is
 * purely in section context and heading.
 *
 * Server Component: data is fetched and typed here; CertificationGrid is
 * the only client boundary (animations).
 *
 * `id="tryhackme"` matches the anchor contract in data/navigation.ts.
 */
export function TryHackMeSection() {
  const achievements = getTryHackMeAchievements();

  return (
    <section
      id="tryhackme"
      aria-labelledby="tryhackme-heading"
      className="py-24 sm:py-32"
    >
      <Container>
        <SectionHeading
          id="tryhackme-heading"
          eyebrow="TryHackMe"
          title="Learning Paths & Rooms"
          className="mb-12"
        />
        <CertificationGrid certs={achievements} />
      </Container>
    </section>
  );
}
