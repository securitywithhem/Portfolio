import {
  SectionPremium,
  SectionHeader,
} from "@/components/layout/section-premium";
import { CertificationGrid } from "@/components/certifications/certification-grid";
import { getCertifications } from "@/lib/data";

export function Certifications() {
  const certs = getCertifications();

  return (
    <SectionPremium id="certifications" spacing="normal" accentLine="top">
      <SectionHeader
        eyebrow="Credentials"
        index="06"
        title="Certifications &"
        titleAccent="learning"
        subtitle="Professional credentials and continuous education"
      />
      <CertificationGrid certs={certs} />
    </SectionPremium>
  );
}
