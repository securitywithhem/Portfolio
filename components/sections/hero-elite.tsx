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
    <section className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#0B0C0E] via-[#0B0C0E] to-[#0F1117] py-32">
      {/* Animated grid background */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(94,234,212,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(94,234,212,0.12) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
            maskImage:
              "radial-gradient(ellipse 80% 50% at 50% 40%, black 0%, transparent 80%)",
          }}
        />
      </div>

      {/* Multiple glow layers for depth */}
      <div
        className="pointer-events-none absolute -top-1/3 left-1/2 h-[800px] w-[1000px] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(94,234,212,0.15), transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="pointer-events-none absolute top-1/4 right-0 h-[600px] w-[600px]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(94,234,212,0.08), transparent 60%)",
          filter: "blur(60px)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-3xl px-6 sm:px-8">
        {/* Eyebrow badge - glassmorphic */}
        <div
          ref={eyebrowRef}
          className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-[rgba(94,234,212,0.3)] bg-gradient-to-r from-[rgba(94,234,212,0.1)] to-[rgba(94,234,212,0.05)] px-4 py-2 backdrop-blur-sm"
          style={{
            boxShadow:
              "0 0 20px rgba(94,234,212,0.15), inset 0 1px 0 rgba(255,255,255,0.1)",
          }}
        >
          <span
            className="h-2 w-2 rounded-full bg-[#5EEAD4]"
            style={{
              boxShadow:
                "0 0 8px rgba(94,234,212,0.6), 0 0 12px rgba(94,234,212,0.3)",
              animation: "pulse 2.4s ease-in-out infinite",
            }}
          />
          <span className="bg-gradient-to-r from-[#5EEAD4] to-[#7FFCE8] bg-clip-text font-mono text-xs tracking-widest text-transparent uppercase">
            open to security engineering roles
          </span>
        </div>

        {/* Main heading - gradient text */}
        <h1
          ref={headingRef}
          className="text-5xl lg:text-7xl max-w-4xl leading-[1.03] font-black tracking-tight sm:text-6xl"
          style={{
            letterSpacing: "-0.03em",
            background:
              "linear-gradient(135deg, #EDEDEE 0%, #5EEAD4 50%, #7FFCE8 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundSize: "200% 200%",
            backgroundPosition: "0% 50%",
          }}
        >
          Hem Gabhawala builds systems
          <br />
          <span style={{ opacity: 0.95 }}>
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

        {/* CTA buttons - premium hover effects */}
        <div ref={ctaRef} className="mt-11 flex flex-col gap-4 sm:flex-row">
          <Button
            asChild
            className="group relative rounded-lg border border-[#5EEAD4] bg-gradient-to-r from-[#5EEAD4] to-[#7FFCE8] px-8 py-3 text-sm font-semibold text-[#04211C] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(94,234,212,0.4)] active:scale-95"
          >
            <a href="#projects">View projects →</a>
          </Button>
          <Button
            asChild
            className="group relative rounded-lg border border-[rgba(94,234,212,0.3)] bg-gradient-to-r from-[rgba(94,234,212,0.05)] to-[rgba(94,234,212,0.02)] px-8 py-3 text-sm font-semibold text-[#5EEAD4] backdrop-blur-sm transition-all duration-300 hover:border-[#5EEAD4] hover:bg-[rgba(94,234,212,0.1)] hover:shadow-[0_0_20px_rgba(94,234,212,0.25)]"
          >
            <a href={resumeUrl} download>
              Download resume
            </a>
          </Button>
        </div>

        {/* Stats - glassmorphic cards */}
        <div
          ref={statsRef}
          className="mt-20 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-3"
        >
          <div className="group rounded-lg border border-[rgba(94,234,212,0.15)] bg-gradient-to-br from-[rgba(94,234,212,0.08)] to-[rgba(94,234,212,0.02)] p-4 backdrop-blur-sm transition-all duration-300 hover:border-[rgba(94,234,212,0.3)] hover:bg-[rgba(94,234,212,0.1)] hover:shadow-[0_0_15px_rgba(94,234,212,0.2)]">
            <div className="bg-gradient-to-r from-[#5EEAD4] to-[#7FFCE8] bg-clip-text text-2xl font-bold text-transparent">
              3
            </div>
            <div className="mt-2 text-xs tracking-wider text-[#8B8D92] uppercase">
              Featured Projects
            </div>
          </div>
          <div className="group rounded-lg border border-[rgba(94,234,212,0.15)] bg-gradient-to-br from-[rgba(94,234,212,0.08)] to-[rgba(94,234,212,0.02)] p-4 backdrop-blur-sm transition-all duration-300 hover:border-[rgba(94,234,212,0.3)] hover:bg-[rgba(94,234,212,0.1)] hover:shadow-[0_0_15px_rgba(94,234,212,0.2)]">
            <div className="bg-gradient-to-r from-[#5EEAD4] to-[#7FFCE8] bg-clip-text text-2xl font-bold text-transparent">
              Top 5%
            </div>
            <div className="mt-2 text-xs tracking-wider text-[#8B8D92] uppercase">
              TryHackMe Rank
            </div>
          </div>
          <div className="group rounded-lg border border-[rgba(94,234,212,0.15)] bg-gradient-to-br from-[rgba(94,234,212,0.08)] to-[rgba(94,234,212,0.02)] p-4 backdrop-blur-sm transition-all duration-300 hover:border-[rgba(94,234,212,0.3)] hover:bg-[rgba(94,234,212,0.1)] hover:shadow-[0_0_15px_rgba(94,234,212,0.2)]">
            <div className="bg-gradient-to-r from-[#5EEAD4] to-[#7FFCE8] bg-clip-text text-2xl font-bold text-transparent">
              12+
            </div>
            <div className="mt-2 text-xs tracking-wider text-[#8B8D92] uppercase">
              Certifications
            </div>
          </div>
          <div className="group rounded-lg border border-[rgba(94,234,212,0.15)] bg-gradient-to-br from-[rgba(94,234,212,0.08)] to-[rgba(94,234,212,0.02)] p-4 backdrop-blur-sm transition-all duration-300 hover:border-[rgba(94,234,212,0.3)] hover:bg-[rgba(94,234,212,0.1)] hover:shadow-[0_0_15px_rgba(94,234,212,0.2)]">
            <div className="bg-gradient-to-r from-[#5EEAD4] to-[#7FFCE8] bg-clip-text text-2xl font-bold text-transparent">
              24H
            </div>
            <div className="mt-2 text-xs tracking-wider text-[#8B8D92] uppercase">
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
