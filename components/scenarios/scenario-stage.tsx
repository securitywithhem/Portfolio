"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { ArrowUpRight, MousePointerClick } from "lucide-react";
import type { Scenario, Project } from "@/lib/types";
import { useCapability } from "@/lib/capability";
import { ACCENT_HEX } from "@/lib/accents";
import { skillById } from "@/data/skills";
import { cn } from "@/lib/utils";
import { OffensiveFallback } from "./offensive/offensive-fallback";

// Code-split: the 3D scene chunk downloads only when the full tier renders it.
const OffensiveScene = dynamic(() => import("./offensive/offensive-scene"), {
  ssr: false,
});

export function ScenarioStage({
  scenario,
  project,
}: {
  scenario: Scenario;
  project: Project;
}) {
  const { capability, detected } = useCapability();
  const tier = detected ? capability.tier : "fallback";

  const stageRef = useRef<HTMLDivElement>(null);
  const beatRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeBeat, setActiveBeat] = useState(0);
  const [traced, setTraced] = useState(false);

  const accentHex = ACCENT_HEX[scenario.accent];

  // Which narrative beat is centered → drives both visual tiers.
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = Number(
              (entry.target as HTMLElement).dataset.beatIndex ?? 0,
            );
            setActiveBeat(idx);
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    beatRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const fallbackVisual = (
    <OffensiveFallback activeBeat={activeBeat} traced={traced} />
  );

  return (
    <div ref={stageRef} className="relative">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 lg:grid-cols-[1fr_1fr]">
        {/* Visual stage — pinned on desktop */}
        <div className="lg:sticky lg:top-16 lg:h-[calc(100dvh-4rem)]">
          <div className="relative h-[52vh] overflow-hidden rounded-[2px] border border-line bg-surface lg:h-full">
            {tier === "full" ? (
              <Suspense fallback={fallbackVisual}>
                <OffensiveScene
                  targetRef={stageRef}
                  keyframes={scenario.scene3D?.cameraKeyframes ?? []}
                  activeBeat={activeBeat}
                  traced={traced}
                  accent={accentHex}
                />
              </Suspense>
            ) : (
              fallbackVisual
            )}

            {/* Telemetry overlay + interactive moment (identical on both tiers) */}
            <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-4">
              <div className="flex items-center justify-between">
                <span className="label-mono text-accent">
                  {scenario.unit} · {scenario.environmentType}
                </span>
                <span className="label-mono">
                  {tier === "full" ? "3D" : "2D"} TIER
                </span>
              </div>
              <button
                type="button"
                onClick={() => setTraced((v) => !v)}
                aria-pressed={traced}
                className="pointer-events-auto inline-flex w-fit items-center gap-2 rounded-[2px] border border-line-strong bg-bg/80 px-3 py-2 text-sm text-fg backdrop-blur-sm transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <MousePointerClick size={15} aria-hidden />
                {scenario.interactiveMoment.triggerLabel}
                {traced && (
                  <span className="label-mono text-accent">· TRACED</span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Narrative beats + payoff — the always-present, crawlable content */}
        <div className="py-[8vh]">
          <ol className="space-y-[16vh]">
            {scenario.narrativeBeats.map((beat, i) => (
              <li
                key={beat.id}
                data-beat-index={i}
                ref={(el) => {
                  beatRefs.current[i] = el;
                }}
                className={cn(
                  "transition-opacity duration-300 motion-reduce:transition-none",
                  i === activeBeat ? "opacity-100" : "opacity-55",
                )}
              >
                <p className="label-mono mb-3 flex items-center gap-3">
                  <span
                    aria-hidden
                    className="h-4 w-1 rounded-[1px] bg-accent"
                  />
                  <span className="text-accent">
                    STEP {String(beat.order).padStart(2, "0")}
                  </span>
                </p>
                <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  {beat.heading}
                </h3>
                <p className="mt-4 max-w-md text-base leading-relaxed text-fg-muted">
                  {beat.body}
                </p>
                {beat.relatedSkillIds.length > 0 && (
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {beat.relatedSkillIds.map((id) => {
                      const skill = skillById.get(id);
                      if (!skill) return null;
                      return (
                        <li
                          key={id}
                          className="label-mono rounded-[2px] border border-line px-2 py-1 text-fg-muted"
                        >
                          {skill.name}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            ))}
          </ol>

          {/* Payoff */}
          <div className="mt-[16vh] rounded-[2px] border border-line bg-surface p-6">
            <p className="label-mono mb-3 text-accent">PAYOFF · PROJECT</p>
            <h3 className="text-xl font-bold tracking-tight">
              {project.title}
            </h3>
            {project.tagline && (
              <p className="mt-2 text-sm text-fg-muted">{project.tagline}</p>
            )}
            <p className="mt-4 text-sm leading-relaxed text-fg-muted">
              {project.description}
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {project.techStack.map((t) => (
                <li key={t} className="label-mono text-fg-dim">
                  {t}
                </li>
              ))}
            </ul>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-sm text-fg transition-colors hover:text-accent"
              >
                View on GitHub
                <ArrowUpRight size={14} aria-hidden />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
