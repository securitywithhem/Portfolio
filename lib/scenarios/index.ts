import type { Scenario } from "@/lib/types";
import { scenarioOffensive } from "@/data/scenario-offensive";
import { scenarioGrc } from "@/data/scenario-grc";
import { projectById } from "@/data/projects";
import { skillById } from "@/data/skills";
import { assertScenarioIntegrity } from "./integrity";

/**
 * Scenario registry. Importing this module runs the build-time integrity gate
 * over every registered scenario — parity, referenced project, referenced
 * skills. A violation throws and fails the build. Phase 2.5 registers only the
 * flagship (Offensive Security); Phase 4 adds the other three.
 */
const all: Scenario[] = [scenarioOffensive, scenarioGrc];

for (const s of all) {
  assertScenarioIntegrity(s);

  if (!projectById.has(s.payoffProjectId)) {
    throw new Error(
      `[scenario:${s.id}] payoffProjectId "${s.payoffProjectId}" has no matching project`,
    );
  }

  for (const beat of s.narrativeBeats) {
    for (const skillId of beat.relatedSkillIds) {
      if (!skillById.has(skillId)) {
        throw new Error(
          `[scenario:${s.id}] beat "${beat.id}" references unknown skill "${skillId}"`,
        );
      }
    }
  }
}

export const scenarios = all;
export const scenarioById = new Map(all.map((s) => [s.id, s]));

export function getScenario(id: string): Scenario | undefined {
  return scenarioById.get(id);
}
