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
        subtitle="Where I started, where I'm going, and the engineering underneath all three."
      />
      <SkillGrid categories={categories} />
      <p className="mx-auto mt-12 max-w-3xl text-center text-lg leading-relaxed text-text-secondary">
        Most GRC candidates have never run an exploit. Most AI Security
        candidates have never read an audit log. I&apos;ve done
        both&nbsp;&mdash; which is exactly why I&apos;m moving here next.
      </p>
    </SectionPremium>
  );
}
