"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

import { SocialLinks } from "@/components/shared/social-links";
import { Button } from "@/components/ui/button";
import type { Profile } from "@/lib/types";

interface HeroEliteProps {
  bio: string;
  socials: Profile["socials"];
  resumeUrl: string;
}

const STATS = [
  { value: "Top 2%", label: "TryHackMe" },
  { value: "9+", label: "Certifications" },
  { value: "175+", label: "Labs completed" },
  { value: "VAPT → GRC/AI", label: "Career trajectory" },
] as const;

/**
 * Hero — flat, high-contrast, editorial (Design System v2).
 * Oversized mixed-weight display headline with a single italic accent phrase,
 * a mono terminal role line, three stat counters, and two flat CTAs.
 * No grid, no glow, no blur, no gradient washes — confidence from type + space.
 * Motion: line-by-line headline reveal + staggered children, expo-out easing.
 */
export function HeroElite({ bio, socials, resumeUrl }: HeroEliteProps) {
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const roleLineRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const [typedText, setTypedText] = useState("");

  const typingLines = [
    "application security · web pentesting",
    "threat modeling · secure architecture",
    "ctf player · tryhackme top 5%",
  ];

  // Typing animation for the mono role line
  useEffect(() => {
    let lineIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeoutId: NodeJS.Timeout;

    const type = () => {
      const currentLine = typingLines[lineIndex];
      if (!currentLine) return;

      if (!isDeleting) {
        charIndex++;
        setTypedText(currentLine.slice(0, charIndex));
        if (charIndex === currentLine.length) {
          isDeleting = true;
          timeoutId = setTimeout(type, 1400);
          return;
        }
      } else {
        charIndex--;
        setTypedText(currentLine.slice(0, charIndex));
        if (charIndex === 0) {
          isDeleting = false;
          lineIndex = (lineIndex + 1) % typingLines.length;
        }
      }

      timeoutId = setTimeout(type, isDeleting ? 28 : 42);
    };

    type();
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Entrance timeline — expo.out ≈ ease-default cubic-bezier(0.16, 1, 0.3, 1)
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const tl = gsap.timeline();

    if (eyebrowRef.current) {
      tl.from(eyebrowRef.current, {
        opacity: 0,
        y: 12,
        duration: 0.5,
        ease: "expo.out",
      });
    }

    // Headline reveals line-by-line (v2 §5: line-by-line, not word-by-word)
    if (headingRef.current) {
      tl.from(
        Array.from(headingRef.current.children),
        {
          opacity: 0,
          y: 24,
          duration: 0.8,
          stagger: 0.09,
          ease: "expo.out",
        },
        0.1,
      );
    }

    for (const [ref, at] of [
      [roleLineRef, 0.5],
      [bioRef, 0.6],
    ] as const) {
      if (ref.current) {
        tl.from(
          ref.current,
          { opacity: 0, y: 16, duration: 0.5, ease: "expo.out" },
          at,
        );
      }
    }

    for (const ref of [ctaRef, statsRef]) {
      if (ref.current) {
        tl.from(
          Array.from(ref.current.children),
          {
            opacity: 0,
            y: 16,
            duration: 0.5,
            stagger: 0.08,
            ease: "expo.out",
          },
          ">-0.3",
        );
      }
    }

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section className="bg-bg-base relative flex min-h-dvh flex-col justify-center py-32">
      <div className="mx-auto w-full max-w-[1320px] px-6 sm:px-8 lg:px-12">
        {/* Eyebrow — uppercase, tracked-out, accent dot */}
        <div ref={eyebrowRef} className="mb-8 inline-flex items-center gap-2.5">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          <span className="text-text-muted font-mono text-xs font-medium tracking-[0.12em] uppercase">
            Cybersecurity · VAPT → GRC &amp; AI Security
          </span>
        </div>

        {/* Oversized mixed-weight display headline with italic accent phrase */}
        <h1 className="text-text-primary max-w-5xl text-4xl leading-[1.05] tracking-[-0.02em] sm:text-5xl lg:text-6xl">
          <span className="text-text-secondary block font-light">
            I spent two years finding
          </span>
          <span className="text-text-secondary block font-light">
            how systems break.
          </span>
          <span className="text-text-primary mt-4 block font-semibold">
            Now I build the{" "}
            <em className="font-normal text-accent italic">governance</em>
          </span>
          <span className="text-text-primary block font-semibold">
            that stops it from happening again.
          </span>
        </h1>

        {/* Mono terminal role line */}
        <div
          ref={roleLineRef}
          className="text-text-secondary mt-8 font-mono text-sm sm:text-base"
        >
          <span className="text-text-muted">&gt;</span>
          <span className="ml-2 text-accent">{typedText}</span>
          <span
            className="ml-0.5 inline-block h-4 w-[2px] bg-accent align-text-bottom"
            style={{ animation: "blink 1s step-end infinite" }}
          />
        </div>

        {/* Bio */}
        <p
          ref={bioRef}
          className="text-text-secondary mt-6 max-w-2xl text-base leading-relaxed sm:text-lg"
        >
          {bio}
        </p>

        {/* CTAs — flat, accent fill + outline, subtle hover */}
        <div ref={ctaRef} className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Button
            asChild
            className="text-bg-base hover:bg-accent-hover rounded-full bg-accent px-8 py-3 text-sm font-semibold transition-[background-color,transform] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.02]"
          >
            <a href="#projects">See my GRC &amp; AI Security work →</a>
          </Button>
          <Button
            asChild
            className="border-border-subtle text-text-primary rounded-full border bg-transparent px-8 py-3 text-sm font-semibold transition-[border-color,color,transform] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.02] hover:border-accent hover:text-accent"
          >
            <a href={resumeUrl} download>
              Download resume ↓
            </a>
          </Button>
        </div>

        {/* Stat counters — flat, accent numerals, hairline dividers */}
        <div
          ref={statsRef}
          className="border-border-subtle mt-20 grid max-w-3xl grid-cols-2 gap-px overflow-hidden border-y sm:grid-cols-4"
        >
          {STATS.map((stat) => (
            <div key={stat.label} className="bg-bg-base px-3 py-6">
              <div className="text-xl font-bold tracking-tight text-accent sm:text-2xl lg:text-3xl">
                {stat.value}
              </div>
              <div className="text-text-muted mt-2 text-xs tracking-[0.1em] uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Social links */}
        <div className="mt-16">
          <SocialLinks socials={socials} />
        </div>
      </div>

      <style>{`
        @keyframes blink {
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  );
}
