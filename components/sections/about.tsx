import { AboutContent } from "@/components/sections/about-content";
import {
  SectionPremium,
  SectionHeader,
} from "@/components/layout/section-premium";
import { FadeInView } from "@/components/shared/fade-in-view";
import { getProfile } from "@/lib/data";

export function About() {
  const { aboutBio, focusAreas } = getProfile();

  return (
    <SectionPremium id="about" spacing="normal" accentLine="top">
      <FadeInView>
        <SectionHeader
          eyebrow="About"
          title="About Me"
          subtitle="Security researcher and pentesting specialist"
        />
        <AboutContent aboutBio={aboutBio} focusAreas={focusAreas} />
      </FadeInView>
    </SectionPremium>
  );
}
