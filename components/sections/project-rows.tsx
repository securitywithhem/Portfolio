"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ShieldCheck, Star } from "lucide-react";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { fadeUp, staggerChildren } from "@/lib/motion";
import type { Project } from "@/lib/types";

const ProjectDetail = dynamic(
  () => import("@/components/sections/project-detail"),
  { ssr: false },
);

interface HoverState {
  id: string;
  x: number;
  y: number;
}

/**
 * Large clickable project rows with a cursor-following hover-reveal thumbnail
 * (Design System v2 §6). Each row opens the full project dialog; the floating
 * preview appears only on pointer-capable large screens and never intercepts
 * clicks. Flat editorial styling — the title turns accent on hover, no shadow.
 *
 * Replaces the card grid. Re-renders when ProjectExplorer's filter changes;
 * scoped to this subtree, so no memoization needed for a list this small.
 */
export function ProjectRows({ projects }: { projects: Project[] }) {
  const [hover, setHover] = useState<HoverState | null>(null);
  const hovered = hover ? projects.find((p) => p.id === hover.id) : null;
  const cover = hovered?.images[0];

  if (projects.length === 0) {
    return (
      <p className="py-16 text-center text-text-muted">
        No projects match that filter.
      </p>
    );
  }

  return (
    <>
      <motion.ol
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerChildren}
        className="list-none border-t border-border-subtle"
      >
        {projects.map((project, i) => (
          <motion.li
            key={project.id}
            variants={fadeUp}
            className="border-b border-border-subtle"
            onMouseEnter={(e) =>
              setHover({ id: project.id, x: e.clientX, y: e.clientY })
            }
            onMouseMove={(e) =>
              setHover({ id: project.id, x: e.clientX, y: e.clientY })
            }
            onMouseLeave={() => setHover(null)}
          >
            <Dialog>
              <DialogTrigger asChild>
                <button
                  type="button"
                  className="group flex w-full items-center gap-4 py-7 text-left md:gap-8 md:py-10"
                >
                  <span className="font-mono text-xs text-text-muted tabular-nums transition-colors duration-200 group-hover:text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-3">
                      <span className="truncate text-2xl font-bold tracking-tight text-text-primary transition-colors duration-200 group-hover:text-accent md:text-4xl">
                        {project.title}
                      </span>
                      {project.featured && (
                        <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-accent px-2 py-0.5 font-mono text-[10px] tracking-wider text-accent uppercase">
                          <Star aria-hidden className="size-3" />
                          Featured
                        </span>
                      )}
                    </span>
                    <span className="mt-2 block truncate text-sm text-text-muted">
                      {project.tagline ?? project.techStack.join(" · ")}
                    </span>
                  </span>

                  <span
                    aria-hidden
                    className="shrink-0 text-xl text-text-muted transition-all duration-200 group-hover:translate-x-1 group-hover:text-accent"
                  >
                    →
                  </span>
                </button>
              </DialogTrigger>
              <DialogContent className="flex flex-col gap-4 sm:max-w-xl">
                <ProjectDetail project={project} />
              </DialogContent>
            </Dialog>
          </motion.li>
        ))}
      </motion.ol>

      {/* Cursor-following preview — desktop pointer devices only */}
      <AnimatePresence>
        {hovered && hover && (
          <motion.div
            key={hovered.id}
            aria-hidden
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ top: hover.y, left: hover.x }}
            className="pointer-events-none fixed z-50 hidden aspect-video w-72 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-md border border-border-subtle bg-bg-surface lg:block"
          >
            {cover ? (
              <Image
                src={cover}
                alt=""
                fill
                sizes="288px"
                className="object-cover"
              />
            ) : (
              <div className="flex size-full flex-col items-center justify-center gap-2">
                <ShieldCheck aria-hidden className="size-8 text-accent" />
                <span className="px-4 text-center text-sm font-medium text-text-secondary">
                  {hovered.title}
                </span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
