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
        title="Certifications that trace the same arc:"
        titleAccent="offense first, governance next."
        subtitle="Professional credentials across offensive security, risk, and AI foundations."
      />
      <CertificationGrid certs={certs} />
    </SectionPremium>
  );
}
