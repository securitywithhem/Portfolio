import { getScenario } from "@/lib/scenarios";
import { projectById } from "@/data/projects";
import { accentScope } from "@/lib/accents";
import { ScenarioStage } from "./scenario-stage";

/**
 * Server-rendered scenario wrapper. The header (unit/title/summary) is always
 * in the SSR DOM regardless of tier; the interactive stage (beats + visual +
 * payoff) mounts inside. `accentScope` re-points --accent locally so everything
 * within inherits this scenario's accent.
 */
export function ScenarioSection({ scenarioId }: { scenarioId: string }) {
  const scenario = getScenario(scenarioId);
  if (!scenario) return null;
  const project = projectById.get(scenario.payoffProjectId);
  if (!project) return null;

  return (
    <section
      id={scenario.id}
      aria-labelledby={`${scenario.id}-title`}
      style={accentScope(scenario.accent)}
      className="border-t border-line py-20"
    >
      <div className="mx-auto max-w-6xl px-6">
        <p className="label-mono mb-3 flex items-center gap-3">
          <span aria-hidden className="h-4 w-1 rounded-[1px] bg-accent" />
          <span className="text-accent">{scenario.unit}</span> SCENARIO
        </p>
        <h2
          id={`${scenario.id}-title`}
          className="text-4xl font-extrabold tracking-[-0.02em] sm:text-5xl"
        >
          {scenario.title}
        </h2>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-fg-muted">
          {scenario.summary}
        </p>
      </div>

      <div className="mt-16">
        <ScenarioStage scenario={scenario} project={project} />
      </div>
    </section>
  );
}
