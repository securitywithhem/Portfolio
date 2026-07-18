import { Container } from "@/components/layout/container";
import { SkillGrid } from "@/components/sections/skill-grid";
import { SectionHeading } from "@/components/shared/section-heading";
import { getSkillCategories } from "@/lib/data";

/**
 * Skills — fourth section in the scroll flow (Hero → About → Journey →
 * Skills → …). Server Component: category/item data is fetched and typed
 * here; SkillGrid is the only client boundary (see its doc comment).
 *
 * `id="skills"` matches the anchor contract in data/navigation.ts.
 * Spacing (`py-24 sm:py-32`) and heading pattern match About/Journey
 * exactly — no new rhythm introduced for the last section of Phase 3.
 */
export function Skills() {
  const categories = getSkillCategories();

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="py-24 sm:py-32"
    >
      <Container>
        <SectionHeading
          id="skills-heading"
          eyebrow="Skills"
          title="What I work with"
          className="mb-12"
        />
        <SkillGrid categories={categories} />
      </Container>
    </section>
  );
}
