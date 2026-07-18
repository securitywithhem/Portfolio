import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { About } from "@/components/sections/about";
import { Hero } from "@/components/sections/hero";
import { JourneyTimeline } from "@/components/sections/journey-timeline";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { ExperienceTimeline } from "@/components/experience/experience-timeline";
import { Certifications } from "@/components/certifications/certifications";
import { TryHackMeSection } from "@/components/certifications/tryhackme-section";
import { GitHubSection } from "@/components/github/github-section";
import { ContactSection } from "@/components/contact/contact-section";
import { getNavSections } from "@/lib/data";
import { homeMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = homeMetadata();

const IMPLEMENTED_IDS = [
  "hero",
  "about",
  "journey",
  "skills",
  "experience",
  "projects",
  "certifications",
  "tryhackme",
  "github",
  "contact",
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
 * Home page. Phases 2–4 complete + Phase 5 Contact/GitHub:
 * Hero, About, Journey, Skills (2–3), Projects (4A), Certifications & TryHackMe (4B),
 * Experience (4C), GitHub (5a), and Contact (5b). The remaining sections (Blog)
 * are TEMPORARY placeholders until Phase 5c.
 *
 * Layout follows App Flow order: Hero → About → Journey → Skills →
 * Experience → Projects → Certifications → TryHackMe → GitHub → Contact → [placeholders].
 *
 * Contact is the final conversion point before Resume Download.
 */
export default function Home() {
  const sections = getNavSections();
  const afterContact = sections.filter(
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
      <GitHubSection />
      <ContactSection />
      {afterContact.map((section) => (
        <Placeholder key={section.id} {...section} />
      ))}
    </main>
  );
}
