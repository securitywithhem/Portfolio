import {
  SectionPremium,
  SectionHeader,
} from "@/components/layout/section-premium";
import { SkillGrid } from "@/components/sections/skill-grid";
import { getSkillCategories } from "@/lib/data";

export function Skills() {
  const categories = getSkillCategories();

  return (
    <SectionPremium id="skills" spacing="normal" accentLine="top">
      <SectionHeader
        eyebrow="Expertise"
        index="03"
        title="What I work"
        titleAccent="with"
        subtitle="Tools, frameworks, and methodologies"
      />
      <SkillGrid categories={categories} />
    </SectionPremium>
  );
}
