import { SquareArrowOutUpRight } from "lucide-react";

import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { GitHubIcon } from "@/components/shared/brand-icons";
import { TechBadge } from "@/components/shared/tech-badge";
import type { Project } from "@/lib/types";

/**
 * Expanded project view — the Dialog's content, dynamically imported by
 * ProjectDetailTrigger so this chunk (and its own imports) only ship once a
 * card is actually opened. Radix's Dialog primitive (components/ui/dialog)
 * already provides the focus trap, Escape-to-close, and focus-return
 * behavior the App Flow's "Project Details" step requires — nothing extra
 * needed here.
 */
export default function ProjectDetail({ project }: { project: Project }) {
  const { title, description, techStack, github, live } = project;

  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-2xl">{title}</DialogTitle>
        <DialogDescription className="sr-only">
          Full details for the {title} project
        </DialogDescription>
      </DialogHeader>

      <p className="text-sm text-muted-foreground sm:text-base">
        {description}
      </p>

      <ul className="flex flex-wrap gap-2">
        {techStack.map((tech) => (
          <TechBadge key={tech} label={tech} />
        ))}
      </ul>

      {(github || live) && (
        <div className="flex flex-col gap-3 sm:flex-row">
          {github && (
            <Button asChild variant="outline">
              <a href={github} target="_blank" rel="noopener noreferrer">
                <GitHubIcon aria-hidden /> View source on GitHub
              </a>
            </Button>
          )}
          {live && (
            <Button asChild>
              <a href={live} target="_blank" rel="noopener noreferrer">
                <SquareArrowOutUpRight aria-hidden /> Visit live site
              </a>
            </Button>
          )}
        </div>
      )}
    </>
  );
}
