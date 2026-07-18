"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

import { SocialLinks } from "@/components/shared/social-links";
import { Button } from "@/components/ui/button";
import type { Profile } from "@/lib/types";

interface HeroEliteProps {
  socials: Profile["socials"];
  resumeUrl: string;
}

/**
 * Elite hacker aesthetic hero — refined dark theme with teal accent.
 * Features: Grid background, glow effect, typing animation, premium polish.
 * Motion tier: Complex (8/10) with smooth scroll reveals and stagger.
 */
export function HeroElite({ socials, resumeUrl }: HeroEliteProps) {
  const typedRef = useRef<HTMLSpanElement>(null);
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

  // Typing animation
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

  // GSAP animations
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const tl = gsap.timeline({ paused: false });

    // Eyebrow pulse
    if (eyebrowRef.current) {
      tl.from(eyebrowRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 0.5,
        ease: "back.out(1.7)",
      });
    }

    // Heading fade + scale
    if (headingRef.current) {
      tl.from(
        headingRef.current,
        {
          opacity: 0,
          scale: 0.95,
          y: 20,
          duration: 0.7,
          ease: "expo.out",
        },
        0.1,
      );
    }

    // Role line slide
    if (roleLineRef.current) {
      tl.from(
        roleLineRef.current,
        {
          opacity: 0,
          y: 12,
          duration: 0.5,
          ease: "power1.out",
        },
        0.25,
      );
    }

    // Bio fade
    if (bioRef.current) {
      tl.from(
        bioRef.current,
        {
          opacity: 0,
          y: 16,
          duration: 0.5,
          ease: "power1.out",
        },
        0.35,
      );
    }

    // CTA buttons stagger
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
        0.45,
      );
    }

    // Stats stagger
    if (statsRef.current) {
      tl.from(
        Array.from(statsRef.current.children),
        {
          opacity: 0,
          y: 8,
          duration: 0.3,
          stagger: 0.06,
          ease: "power1.out",
        },
        0.6,
      );
    }

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-[#0B0C0E] py-32">
      {/* Grid background */}
      <div className="pointer-events-none absolute inset-0 opacity-50">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage:
              "radial-gradient(ellipse 70% 60% at 50% 30%, black 20%, transparent 75%)",
          }}
        />
      </div>

      {/* Glow effect */}
      <div
        className="pointer-events-none absolute -top-1/4 left-1/2 h-[600px] w-[900px] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(94,234,212,0.10), transparent 65%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-3xl px-6 sm:px-8">
        {/* Eyebrow badge */}
        <div
          ref={eyebrowRef}
          className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-[rgba(94,234,212,0.25)] bg-[rgba(94,234,212,0.12)] px-4 py-2"
        >
          <span
            className="h-1.5 w-1.5 rounded-full bg-[#5EEAD4]"
            style={{
              boxShadow: "0 0 0 3px rgba(94,234,212,0.18)",
              animation: "pulse 2.4s ease-in-out infinite",
            }}
          />
          <span className="font-mono text-xs tracking-widest text-[#5EEAD4] uppercase">
            open to security engineering roles
          </span>
        </div>

        {/* Main heading */}
        <h1
          ref={headingRef}
          className="text-5xl lg:text-7xl max-w-4xl leading-[1.03] font-black tracking-tight sm:text-6xl"
          style={{
            color: "#EDEDEE",
            letterSpacing: "-0.03em",
          }}
        >
          Hem Gabhawala builds systems
          <br />
          <span className="text-[#5EEAD4]">
            attackers can&apos;t quietly break.
          </span>
        </h1>

        {/* Role line with typing */}
        <div
          ref={roleLineRef}
          className="mt-6 font-mono text-sm sm:text-base"
          style={{ color: "#8B8D92" }}
        >
          <span style={{ color: "#55575D" }}>&gt;</span>
          <span ref={typedRef} className="ml-2 text-[#5EEAD4]">
            {typedText}
          </span>
          <span
            className="ml-0.5 inline-block h-5 w-2 bg-[#5EEAD4] align-text-bottom"
            style={{
              animation: "blink 1s step-end infinite",
            }}
          />
        </div>

        {/* Bio */}
        <p
          ref={bioRef}
          className="mt-6 max-w-2xl text-base leading-relaxed sm:text-lg"
          style={{ color: "#8B8D92" }}
        >
          Cybersecurity engineer focused on offensive security, application
          penetration testing, and hardened system design &mdash; VaultIQ,
          Dharma, and API pentest work included below.
        </p>

        {/* CTA buttons */}
        <div ref={ctaRef} className="mt-11 flex flex-col gap-3 sm:flex-row">
          <Button
            asChild
            className="rounded-lg border border-white bg-white px-6 py-3 text-sm font-semibold text-[#0B0C0E] transition-all duration-200 hover:border-[#5EEAD4] hover:bg-[#5EEAD4] hover:text-[#04211C]"
          >
            <a href="#projects">View projects →</a>
          </Button>
          <Button
            asChild
            variant="outline"
            className="rounded-lg border border-[rgba(255,255,255,0.14)] bg-transparent px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:border-[#5EEAD4] hover:text-[#5EEAD4]"
          >
            <a href={resumeUrl} download>
              Download resume
            </a>
          </Button>
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className="mt-20 grid grid-cols-2 gap-8 border-t border-[rgba(255,255,255,0.08)] pt-8 sm:grid-cols-4 sm:gap-4"
        >
          <div className="font-mono">
            <div className="text-2xl font-semibold text-white">3</div>
            <div className="mt-1 text-xs tracking-wider text-[#55575D] uppercase">
              Featured Projects
            </div>
          </div>
          <div className="font-mono">
            <div className="text-2xl font-semibold text-white">Top 5%</div>
            <div className="mt-1 text-xs tracking-wider text-[#55575D] uppercase">
              TryHackMe Rank
            </div>
          </div>
          <div className="font-mono">
            <div className="text-2xl font-semibold text-white">12+</div>
            <div className="mt-1 text-xs tracking-wider text-[#55575D] uppercase">
              Certifications
            </div>
          </div>
          <div className="font-mono">
            <div className="text-2xl font-semibold text-white">24H</div>
            <div className="mt-1 text-xs tracking-wider text-[#55575D] uppercase">
              Response Time
            </div>
          </div>
        </div>

        {/* Social links */}
        <div className="mt-16">
          <SocialLinks socials={socials} />
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.35;
          }
        }
        @keyframes blink {
          50% {
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}
