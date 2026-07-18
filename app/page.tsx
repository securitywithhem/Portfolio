import { Container } from "@/components/layout/container";
import { About } from "@/components/sections/about";
import { Hero } from "@/components/sections/hero";
import { JourneyTimeline } from "@/components/sections/journey-timeline";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { ExperienceTimeline } from "@/components/experience/experience-timeline";
import { Certifications } from "@/components/certifications/certifications";
import { TryHackMeSection } from "@/components/certifications/tryhackme-section";
import { getNavSections } from "@/lib/data";

const IMPLEMENTED_IDS = [
  "hero",
  "about",
  "journey",
  "skills",
  "experience",
  "projects",
  "certifications",
  "tryhackme",
];

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
 * Home page. Phases 2–4 are now complete: Hero, About, Journey, Skills (2–3),
 * Projects (4A), Certifications & TryHackMe (4B), and Experience (4C). The
 * remaining sections (GitHub, Blog, Contact) are TEMPORARY full-height
 * placeholders that keep every anchor in the nav contract (data/navigation.ts)
 * present and scrollable until Phase 5.
 *
 * Layout follows App Flow order: Hero → About → Journey → Skills →
 * Experience → Projects → Certifications → TryHackMe → [placeholders].
 */
export default function Home() {
  const sections = getNavSections();
  const afterTryHackMe = sections.filter(
    ({ id }) => !IMPLEMENTED_IDS.includes(id),
  );

  return (
    <main id="main">
      <Hero />
      <About />
      <JourneyTimeline />
      <Skills />
      <ExperienceTimeline />
      <Projects />
      <Certifications />
      <TryHackMeSection />
      {afterTryHackMe.map((section) => (
        <Placeholder key={section.id} {...section} />
      ))}
    </main>
  );
}
