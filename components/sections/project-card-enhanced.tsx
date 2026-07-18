"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ShieldCheck, SquareArrowOutUpRight, Star } from "lucide-react";
import { gsap } from "gsap";

import { ProjectDetailTrigger } from "@/components/sections/project-detail-trigger";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { GitHubIcon } from "@/components/shared/brand-icons";
import { TechBadge } from "@/components/shared/tech-badge";
import type { Project } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ProjectCardEnhancedProps {
  project: Project;
}

/**
 * Enhanced project card with premium hover animations.
 * Animations:
 * - Hover: elevation (y: -8px) + shadow glow
 * - Magnetic pull effect on mouse move
 * - Tech badges stagger on hover
 */
export function ProjectCardEnhanced({ project }: ProjectCardEnhancedProps) {
  const { title, description, techStack, images, github, live, featured } =
    project;
  const cover = images[0];

  const cardRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    if (!cardRef.current) return;

    // Hover elevation + shadow effect
    cardRef.current.addEventListener("mouseenter", () => {
      gsap.to(cardRef.current, {
        y: -12,
        boxShadow: "0 25px 50px rgba(37, 99, 235, 0.15)",
        duration: 0.3,
        ease: "power2.out",
      });

      // Stagger badges on hover
      if (badgesRef.current) {
        gsap.from(badgesRef.current.children, {
          opacity: 0.6,
          scale: 0.95,
          duration: 0.2,
          stagger: 0.03,
          ease: "power1.out",
        });
      }
    });

    cardRef.current.addEventListener("mouseleave", () => {
      gsap.to(cardRef.current, {
        y: 0,
        boxShadow: featured
          ? "0 1px 3px rgba(0, 0, 0, 0.1)"
          : "0 1px 2px rgba(0, 0, 0, 0.05)",
        duration: 0.3,
        ease: "power2.out",
      });
    });

    // Magnetic cursor pull effect
    cardRef.current.addEventListener("mousemove", (e: MouseEvent) => {
      if (!cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distX = (e.clientX - centerX) * 0.15;
      const distY = (e.clientY - centerY) * 0.15;

      gsap.to(cardRef.current, {
        x: distX,
        y: -12 + distY * 0.1,
        duration: 0.4,
        ease: "power2.out",
        overwrite: "auto",
      });
    });

    cardRef.current.addEventListener("mouseleave", () => {
      gsap.to(cardRef.current, {
        x: 0,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
      });
    });
  }, [featured]);

  return (
    <Card
      ref={cardRef}
      className={cn(
        "group h-full overflow-hidden py-0 transition-none",
        featured && "border-primary/50 ring-1 ring-primary/20",
      )}
    >
      {/* Cover image with overlay */}
      <div className="relative aspect-video shrink-0 overflow-hidden bg-gradient-to-br from-secondary to-secondary/50">
        {cover ? (
          <Image
            src={cover}
            alt={`${title} project screenshot`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="flex size-full items-center justify-center">
            <ShieldCheck
              aria-hidden
              className="size-10 text-muted-foreground/40"
            />
          </div>
        )}

        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Featured badge */}
        {featured && (
          <span className="absolute top-3 right-3 inline-flex animate-pulse items-center gap-1 rounded-md bg-primary px-2 py-1 text-xs font-medium text-primary-foreground">
            <Star aria-hidden className="size-3" />
            Featured
          </span>
        )}
      </div>

      {/* Content */}
      <CardHeader className="pt-6">
        <h3 className="line-clamp-2 text-lg leading-none font-semibold tracking-tight transition-colors duration-300 group-hover:text-primary">
          {title}
        </h3>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-4 pb-6">
        <p className="line-clamp-3 text-sm text-muted-foreground transition-colors group-hover:text-muted-foreground/90">
          {description}
        </p>

        {/* Tech badges */}
        <ul ref={badgesRef} className="flex flex-wrap gap-2">
          {techStack.map((tech) => (
            <li key={tech}>
              <TechBadge label={tech} />
            </li>
          ))}
        </ul>

        {/* Action buttons */}
        <div className="mt-auto flex flex-wrap items-center gap-2 pt-2">
          {github && (
            <Button
              asChild
              variant="ghost"
              size="icon-sm"
              className="transition-all duration-300 hover:bg-primary/10 hover:text-primary"
            >
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
            <Button
              asChild
              variant="ghost"
              size="icon-sm"
              className="transition-all duration-300 hover:bg-primary/10 hover:text-primary"
            >
              <a
                href={live}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${title} live demo (opens in a new tab)`}
              >
                <SquareArrowOutUpRight aria-hidden className="size-4" />
              </a>
            </Button>
          )}
          <ProjectDetailTrigger project={project} />
        </div>
      </CardContent>
    </Card>
  );
}
