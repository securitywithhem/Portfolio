"use client";

import { useMemo, useState } from "react";

import { ProjectFilter } from "@/components/sections/project-filter";
import { ProjectRows } from "@/components/sections/project-rows";
import type { Project } from "@/lib/types";

/**
 * Owns the filter selection — the one piece of state ProjectFilter and
 * ProjectRows both need, so it has to live in their nearest shared client
 * ancestor rather than in the server-rendered Projects section above it.
 */
export function ProjectExplorer({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<string | null>(null);

  const techStacks = useMemo(
    () => [...new Set(projects.flatMap((p) => p.techStack))].sort(),
    [projects],
  );

  const filtered = useMemo(
    () =>
      active ? projects.filter((p) => p.techStack.includes(active)) : projects,
    [projects, active],
  );

  return (
    <div className="flex flex-col gap-8">
      <ProjectFilter
        techStacks={techStacks}
        active={active}
        onSelect={setActive}
      />
      <p aria-live="polite" className="sr-only">
        Showing {filtered.length} of {projects.length} projects
        {active ? ` filtered by ${active}` : ""}
      </p>
      <ProjectRows projects={filtered} />
    </div>
  );
}
