import { Container } from "@/components/layout/container";
import { Hero } from "@/components/sections/hero";
import { getNavSections } from "@/lib/data";

/**
 * Home page. Hero is real (Phase 2.2); the remaining sections are TEMPORARY
 * full-height placeholders that keep every anchor in the nav contract
 * (data/navigation.ts) present and scrollable until Phases 3+ replace them.
 */
export default function Home() {
  const placeholders = getNavSections().filter(({ id }) => id !== "hero");

  return (
    <main id="main">
      <Hero />
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
