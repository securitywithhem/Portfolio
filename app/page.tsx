import { Hero } from "@/components/sections/hero";
import { ScenarioSection } from "@/components/scenarios/scenario-section";
import { navLeaves } from "@/data/navigation";
import { accentScope } from "@/lib/accents";
import type { NavLeaf } from "@/lib/types";

/** Scenario anchors already built to the real two-tier pattern. */
const BUILT_SCENARIOS = new Set(["scenario-offensive"]);

/**
 * Home. Phase 2 ships Hero + the shell (nav/footer). Every other nav anchor is
 * a labelled placeholder so navigation, scroll-spy, and the per-scenario active
 * highlight are fully wired and testable now — each is replaced by its real
 * section in later phases (scenarios in 2.5/4, About/Skills/Journey in 3, etc.).
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
      {rest.map((leaf) =>
        BUILT_SCENARIOS.has(leaf.id) ? (
          <ScenarioSection key={leaf.id} scenarioId={leaf.id} />
        ) : (
          <SectionPlaceholder key={leaf.id} leaf={leaf} />
        ),
      )}
    </main>
  );
}
