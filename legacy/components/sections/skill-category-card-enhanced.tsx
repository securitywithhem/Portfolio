"use client";

import { useEffect, useRef } from "react";
import { Bug, Code2, Network, Server, ShieldCheck } from "lucide-react";
import { gsap } from "gsap";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TechBadge } from "@/components/shared/tech-badge";
import type { SkillCategory } from "@/lib/types";

interface SkillCategoryCardEnhancedProps {
  category: SkillCategory;
}

const CATEGORY_ICON: Record<string, React.ElementType> = {
  "penetration-testing": Bug,
  "network-security": Network,
  "programming-scripting": Code2,
  "security-operations": ShieldCheck,
  systems: Server,
};

/**
 * Enhanced skill category card with premium interactions.
 * Animations:
 * - Hover: elevation + icon pulse
 * - Badges: stagger fade-in on hover
 * - Border glow effect on hover
 */
export function SkillCategoryCardEnhanced({
  category,
}: SkillCategoryCardEnhancedProps) {
  const Icon = CATEGORY_ICON[category.id] ?? ShieldCheck;
  const cardRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLSpanElement>(null);
  const badgesRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    if (!cardRef.current) return;

    // Hover elevation + glow
    cardRef.current.addEventListener("mouseenter", () => {
      gsap.to(cardRef.current, {
        y: -8,
        boxShadow:
          "0 20px 40px rgba(37, 99, 235, 0.1), 0 0 20px rgba(37, 99, 235, 0.05)",
        duration: 0.3,
        ease: "power2.out",
      });

      // Icon pulse
      if (iconRef.current) {
        gsap.to(iconRef.current, {
          scale: 1.15,
          duration: 0.3,
          ease: "elastic.out(1.2, 0.75)",
        });
      }

      // Badges stagger
      if (badgesRef.current) {
        gsap.from(badgesRef.current.children, {
          opacity: 0.6,
          scale: 0.9,
          y: 4,
          duration: 0.25,
          stagger: 0.04,
          ease: "power1.out",
        });
      }
    });

    cardRef.current.addEventListener("mouseleave", () => {
      gsap.to(cardRef.current, {
        y: 0,
        boxShadow:
          "0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)",
        duration: 0.3,
        ease: "power2.out",
      });

      if (iconRef.current) {
        gsap.to(iconRef.current, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    });
  }, []);

  return (
    <Card
      ref={cardRef}
      className="group transition-none duration-300 hover:border-primary/30"
    >
      <CardHeader className="flex flex-row items-center gap-3">
        <span
          ref={iconRef}
          className="flex size-9 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground transition-none will-change-transform"
        >
          <Icon aria-hidden className="size-4" />
        </span>
        <h3 className="text-lg leading-none font-semibold tracking-tight transition-colors duration-300 group-hover:text-primary">
          {category.title}
        </h3>
      </CardHeader>
      <CardContent>
        <ul ref={badgesRef} className="flex flex-wrap gap-2">
          {category.items.map((item) => (
            <li key={item.name}>
              <TechBadge label={item.name} />
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
