import { AboutContent } from "@/components/sections/about-content";
import {
  SectionPremium,
  SectionHeader,
} from "@/components/layout/section-premium";
import { FadeInView } from "@/components/shared/fade-in-view";
import { getProfile } from "@/lib/data";

export function About() {
  const { aboutBio, aboutPullQuote, focusAreas } = getProfile();

  return (
    <SectionPremium id="about" spacing="normal" accentLine="top">
      <FadeInView>
        <SectionHeader
          eyebrow="About"
          index="01"
          title="I didn't start in GRC and AI Security."
          titleAccent="I earned my way there."
          subtitle="From finding the vulnerabilities to building the systems that prevent them."
        />
        <AboutContent
          aboutBio={aboutBio}
          pullQuote={aboutPullQuote}
          focusAreas={focusAreas}
        />
      </FadeInView>
    </SectionPremium>
  );
}
