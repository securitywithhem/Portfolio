import Image from "next/image";
import { ShieldCheck, SquareArrowOutUpRight, Star } from "lucide-react";

import { ProjectDetailTrigger } from "@/components/sections/project-detail-trigger";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { GitHubIcon } from "@/components/shared/brand-icons";
import { TechBadge } from "@/components/shared/tech-badge";
import type { Project } from "@/lib/types";
import { cn } from "@/lib/utils";

/**
 * One project. Server Component — everything here is renderable without
 * client JS; ProjectDetailTrigger is the only interactive piece, isolated
 * per COMPONENT_ARCHITECTURE.md ("use client" as far down the tree as
 * possible).
 *
 * `featured` is distinguished with the existing `primary` token (a ring +
 * a small badge) rather than a new color/shadow — no token invented for
 * Phase 4A, per DESIGN_SYSTEM.md rule zero.
 *
 * `images` is empty for every current entry (data/projects.ts — no
 * fabricated screenshots). The cover renders a decorative placeholder in
 * that case and next/image only once a real path exists, so there's no
 * dead code path to revisit later.
 */
export function ProjectCard({ project }: { project: Project }) {
  const { title, description, techStack, images, github, live, featured } =
    project;
  const cover = images[0];

  return (
    <Card
      className={cn(
        "h-full overflow-hidden py-0",
        featured && "border-primary/50 ring-1 ring-primary/20",
      )}
    >
      <div className="relative aspect-video shrink-0 bg-secondary">
        {cover ? (
          <Image
            src={cover}
            alt={`${title} project screenshot`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <div className="flex size-full items-center justify-center">
            <ShieldCheck
              aria-hidden
              className="size-10 text-muted-foreground"
            />
          </div>
        )}
        {featured && (
          <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-md bg-primary px-2 py-1 text-xs font-medium text-primary-foreground">
            <Star aria-hidden className="size-3" />
            Featured
          </span>
        )}
      </div>

      <CardHeader className="pt-6">
        <h3 className="text-lg leading-none font-semibold tracking-tight">
          {title}
        </h3>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-4 pb-6">
        <p className="line-clamp-3 text-sm text-muted-foreground">
          {description}
        </p>

        <ul className="flex flex-wrap gap-2">
          {techStack.map((tech) => (
            <TechBadge key={tech} label={tech} />
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-2">
          {github && (
            <Button asChild variant="ghost" size="icon-sm">
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${title} source on GitHub (opens in a new tab)`}
              >
                <GitHubIcon aria-hidden />
              </a>
            </Button>
          )}
          {live && (
            <Button asChild variant="ghost" size="icon-sm">
              <a
                href={live}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${title} live demo (opens in a new tab)`}
              >
                <SquareArrowOutUpRight aria-hidden />
              </a>
            </Button>
          )}
          <ProjectDetailTrigger project={project} />
        </div>
      </CardContent>
    </Card>
  );
}
