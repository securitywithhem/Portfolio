"use client";

import dynamic from "next/dynamic";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import type { Project } from "@/lib/types";

const ProjectDetail = dynamic(
  () => import("@/components/sections/project-detail"),
  { ssr: false },
);

/**
 * The one interactive piece a ProjectCard needs — isolated to its own
 * client leaf (same pattern as Hero/HeroParticles, About/FadeInView) so
 * ProjectCard itself stays a plain, server-renderable component. Radix's
 * DialogContent only mounts once `open` is true, so the dynamic import
 * doesn't fetch ProjectDetail's chunk until the user actually opens a
 * card — it's below-the-fold and interaction-triggered, per the TRD's
 * lazy-loading requirement.
 */
export function ProjectDetailTrigger({ project }: { project: Project }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          View details
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-4 sm:max-w-xl">
        <ProjectDetail project={project} />
      </DialogContent>
    </Dialog>
  );
}
