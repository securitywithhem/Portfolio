"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Tech-stack filter bar — controlled by ProjectExplorer, which owns the
 * selection state (two client siblings can't share state through a server
 * parent, so the state has to live in a shared client ancestor). Purely
 * presentational: native `<button>`s are keyboard-operable and focusable
 * by default, and `aria-pressed` exposes the toggle state to screen
 * readers without any extra wiring.
 */
export function ProjectFilter({
  techStacks,
  active,
  onSelect,
}: {
  techStacks: string[];
  active: string | null;
  onSelect: (tech: string | null) => void;
}) {
  return (
    <div
      role="group"
      aria-label="Filter projects by technology"
      className="flex flex-wrap gap-2"
    >
      <Button
        type="button"
        size="sm"
        variant={active === null ? "default" : "outline"}
        aria-pressed={active === null}
        onClick={() => onSelect(null)}
      >
        All
      </Button>
      {techStacks.map((tech) => (
        <Button
          key={tech}
          type="button"
          size="sm"
          variant={active === tech ? "default" : "outline"}
          aria-pressed={active === tech}
          onClick={() => onSelect(tech === active ? null : tech)}
          className={cn(active === tech && "font-semibold")}
        >
          {tech}
        </Button>
      ))}
    </div>
  );
}
