import {
  SectionPremium,
  SectionHeader,
} from "@/components/layout/section-premium";
import { CertificationGrid } from "@/components/certifications/certification-grid";
import { getTryHackMeAchievements } from "@/lib/data";

export function TryHackMeSection() {
  const achievements = getTryHackMeAchievements();

  return (
    <SectionPremium id="tryhackme" spacing="normal" accentLine="top">
      <SectionHeader
        eyebrow="TryHackMe"
        title="Learning Paths & Rooms"
        subtitle="Hands-on security challenges and practice"
      />
      <CertificationGrid certs={achievements} />
    </SectionPremium>
  );
}
