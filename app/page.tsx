import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { JourneyTimeline } from "@/components/sections/journey-timeline";
import { Skills } from "@/components/sections/skills";
import { ScenarioSection } from "@/components/scenarios/scenario-section";
import { navLeaves } from "@/data/navigation";
import { accentScope } from "@/lib/accents";
import type { NavLeaf } from "@/lib/types";

/** Scenario anchors already built to the real two-tier pattern (Phase 2.5). */
const BUILT_SCENARIOS = new Set(["scenario-offensive", "scenario-grc"]);

/** Non-scenario anchors with a real section built (Phase 3+). */
const SECTION_COMPONENTS: Record<string, () => React.ReactElement> = {
  about: About,
  journey: JourneyTimeline,
  skills: Skills,
};

/**
 * Home. Sections render in App Flow order. Remaining anchors are labelled
 * placeholders (scenarios 2–4 in Phase 4; certifications/tryhackme/github/blog/
 * contact in Phase 4–5) so navigation + scroll-spy stay fully wired.
 */
function SectionPlaceholder({ leaf }: { leaf: NavLeaf }) {
  const scenario = leaf.scenario;
  return (
    <section
      id={leaf.id}
      aria-label={leaf.label}
      style={scenario ? accentScope(scenario.accent) : undefined}
      className="flex min-h-[70dvh] flex-col justify-center border-t border-line px-6"
    >
      <div className="mx-auto w-full max-w-6xl">
        {scenario ? (
          <p className="label-mono mb-3 flex items-center gap-3">
            <span aria-hidden className="h-4 w-1 rounded-[1px] bg-accent" />
            <span className="text-accent">{scenario.unit}</span>
            SCENARIO
          </p>
        ) : (
          <p className="label-mono mb-3">SECTION</p>
        )}
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {leaf.label}
        </h2>
        <p className="mt-3 font-mono text-sm text-fg-muted">
          Placeholder — implemented in a later phase.
        </p>
      </div>
    </section>
  );
}

export default function Home() {
  const rest = navLeaves.filter((l) => l.id !== "hero");

  return (
    <main id="main">
      <Hero />
      {rest.map((leaf) => {
        if (BUILT_SCENARIOS.has(leaf.id)) {
          return <ScenarioSection key={leaf.id} scenarioId={leaf.id} />;
        }
        const Section = SECTION_COMPONENTS[leaf.id];
        if (Section) return <Section key={leaf.id} />;
        return <SectionPlaceholder key={leaf.id} leaf={leaf} />;
      })}
    </main>
  );
}
