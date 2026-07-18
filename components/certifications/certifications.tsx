import { Container } from "@/components/layout/container";
import { CertificationGrid } from "@/components/certifications/certification-grid";
import { SectionHeading } from "@/components/shared/section-heading";
import { getCertifications } from "@/lib/data";

/**
 * Certifications — professional credentials from traditional issuers
 * (CompTIA, ISC², Google, Coursera, etc.). Section 6 in the scroll flow
 * per UI/UX and App Flow; TryHackMe achievements are Section 7 (separate
 * TryHackMeSection below).
 *
 * Server Component: data is fetched and typed here; CertificationGrid is
 * the only client boundary (animations).
 *
 * `id="certifications"` matches the anchor contract in data/navigation.ts.
 */
export function Certifications() {
  const certs = getCertifications();

  return (
    <section
      id="certifications"
      aria-labelledby="certifications-heading"
      className="py-24 sm:py-32"
    >
      <Container>
        <SectionHeading
          id="certifications-heading"
          eyebrow="Certifications"
          title="Credentials & Learning"
          className="mb-12"
        />
        <CertificationGrid certs={certs} />
      </Container>
    </section>
  );
}
