import { Container } from "@/components/layout/container";
import { About } from "@/components/sections/about";
import { Hero } from "@/components/sections/hero";
import { JourneyTimeline } from "@/components/sections/journey-timeline";
import { getNavSections } from "@/lib/data";

/**
 * Home page. Hero, About, and Journey are real (Phases 2.2, 3A, 3B); the
 * remaining sections are TEMPORARY full-height placeholders that keep
 * every anchor in the nav contract (data/navigation.ts) present and
 * scrollable until later phases replace them.
 */
export default function Home() {
  const placeholders = getNavSections().filter(
    ({ id }) => id !== "hero" && id !== "about" && id !== "journey",
  );

  return (
    <main id="main">
      <Hero />
      <About />
      <JourneyTimeline />
      {placeholders.map(({ id, label }) => (
        <section
          key={id}
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
      ))}
    </main>
  );
}
