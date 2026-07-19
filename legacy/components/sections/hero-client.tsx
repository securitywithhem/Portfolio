"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Download } from "lucide-react";
import { gsap } from "gsap";

import { SocialLinks } from "@/components/shared/social-links";
import { Button } from "@/components/ui/button";
import type { Profile } from "@/lib/types";

interface HeroClientProps {
  name: string;
  role: string;
  bio: string;
  socials: Profile["socials"];
  resumeUrl: string;
}

/**
 * Hero client component — handles premium animations.
 * Motion tier: Complex (8/10)
 *
 * Animations:
 * 1. Heading: fade-in + scale-up (600ms)
 * 2. Bio: fade-in + slide-up (600ms, 100ms delay)
 * 3. CTA buttons: stagger fade-in (300ms each, 50ms stagger)
 * 4. Socials: fade-in pulse (400ms, 300ms delay)
 */
export function HeroClient({
  name,
  role,
  bio,
  socials,
  resumeUrl,
}: HeroClientProps) {
  const headingRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    // Create animation timeline
    const tl = gsap.timeline({ paused: false });

    // Heading: scale-up + fade-in
    tl.from(
      headingRef.current,
      {
        opacity: 0,
        scale: 0.95,
        y: 20,
        duration: 0.6,
        ease: "expo.out",
      },
      0,
    );

    // Bio: fade-in + slide-up
    tl.from(
      bioRef.current,
      {
        opacity: 0,
        y: 12,
        duration: 0.5,
        ease: "power1.out",
      },
      0.1,
    );

    // CTA buttons: stagger
    if (ctaRef.current) {
      tl.from(
        Array.from(ctaRef.current.children),
        {
          opacity: 0,
          y: 16,
          duration: 0.4,
          stagger: 0.08,
          ease: "power1.out",
        },
        0.2,
      );
    }

    // Socials: fade-in with pulse
    tl.from(
      socialsRef.current,
      {
        opacity: 0,
        scale: 0.9,
        duration: 0.4,
        ease: "back.out(1.7)",
      },
      0.35,
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-6 py-24 text-center">
      {/* Heading with gradient text effect */}
      <div ref={headingRef} className="space-y-2">
        <h1 className="bg-gradient-to-br from-foreground via-foreground to-foreground/70 bg-clip-text text-4xl font-semibold tracking-tight text-balance text-transparent sm:text-6xl">
          {name}
        </h1>
        <p className="text-xl font-normal text-primary sm:text-2xl">{role}</p>
      </div>

      {/* Bio text */}
      <p
        ref={bioRef}
        className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
      >
        {bio}
      </p>

      {/* CTA Buttons with hover animations */}
      <div
        ref={ctaRef}
        className="mt-2 flex flex-col items-center gap-3 sm:flex-row"
      >
        <Button
          asChild
          size="lg"
          className="group relative overflow-hidden transition-all duration-300 hover:shadow-[0_20px_40px_rgba(37,99,235,0.2)]"
        >
          <a href={resumeUrl} download>
            <span className="relative z-10 flex items-center gap-2">
              <Download aria-hidden className="size-4" /> Download Resume
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </a>
        </Button>

        <Button
          asChild
          size="lg"
          variant="outline"
          className="group transition-all duration-300 hover:border-primary hover:bg-primary/5"
        >
          <Link href="/#contact">
            <span className="text-foreground transition-colors group-hover:text-primary">
              Get in Touch
            </span>
          </Link>
        </Button>
      </div>

      {/* Social links with stagger */}
      <div ref={socialsRef}>
        <SocialLinks socials={socials} className="mt-2" />
      </div>
    </div>
  );
}
