import { Container } from "@/components/layout/container";
import { About } from "@/components/sections/about";
import { Hero } from "@/components/sections/hero";
import { JourneyTimeline } from "@/components/sections/journey-timeline";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { getNavSections } from "@/lib/data";

const IMPLEMENTED_IDS = ["hero", "about", "journey", "skills", "projects"];

function Placeholder({ id, label }: { id: string; label: string }) {
  return (
    <section
      id={id}
      className="flex min-h-dvh flex-col items-center justify-center border-b"
    >
      <Container className="text-center">
        <h2 className="text-2xl font-semibold tracking-tight">{label}</h2>
        <p className="mt-3 font-mono text-sm text-muted-foreground">
          {label} placeholder — replaced in a later phase
        </p>
      </Container>
    </section>
  );
}

/**
 * Home page. Hero, About, Journey, Skills (Phases 2.2, 3A, 3B, 3C) and
 * Projects (Phase 4A) are real; the remaining sections are TEMPORARY
 * full-height placeholders that keep every anchor in the nav contract
 * (data/navigation.ts) present and scrollable until later phases replace
 * them. Placeholders are rendered in `navSections` order and split around
 * Projects (Experience before it, Certifications onward after it) so the
 * App Flow's Experience → Projects → Certifications order holds even
 * though Experience itself isn't built yet.
 */
export default function Home() {
  const sections = getNavSections();
  const beforeProjects = sections.filter(({ id }) =>
    ["experience"].includes(id),
  );
  const afterProjects = sections.filter(
    ({ id }) => !IMPLEMENTED_IDS.includes(id) && id !== "experience",
  );

  return (
    <main id="main">
      <Hero />
      <About />
      <JourneyTimeline />
      <Skills />
      {beforeProjects.map((section) => (
        <Placeholder key={section.id} {...section} />
      ))}
      <Projects />
      {afterProjects.map((section) => (
        <Placeholder key={section.id} {...section} />
      ))}
    </main>
  );
}
