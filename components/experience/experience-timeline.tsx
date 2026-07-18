import {
  SectionPremium,
  SectionHeader,
} from "@/components/layout/section-premium";
import { ExperienceList } from "@/components/experience/experience-list";
import { getExperience } from "@/lib/data";

export function ExperienceTimeline() {
  const experiences = getExperience();

  return (
    <SectionPremium id="experience" spacing="normal" accentLine="top">
      <SectionHeader
        eyebrow="Experience"
        title="Practical Security Work"
        subtitle="Professional roles and hands-on security experience"
      />
      <ExperienceList experiences={experiences} />
    </SectionPremium>
  );
}
