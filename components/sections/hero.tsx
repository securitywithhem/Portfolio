import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";
import { getProfile } from "@/lib/data";
import { firstScenarioMeta } from "@/data/scenarios";

/**
 * Hero — first meaningful content. Fully server-rendered (crawlable) with a
 * reduced-motion-aware entrance layered on top. No WebGL here; the immersive
 * layer begins at the scenarios. First scenario anchor drives the primary CTA.
 */
export function Hero() {
  const profile = getProfile();
  const firstScenario = firstScenarioMeta;

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-[calc(100dvh-4rem)] items-center overflow-hidden"
    >
      {/* Restrained blueprint grid, faded toward the edges. */}
      <div
        aria-hidden
        className="precision-grid pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]"
      />

      <div className="mx-auto w-full max-w-6xl px-6 py-20">
        {/* Telemetry status line */}
        <Reveal mode="slide">
          <div className="mb-8 flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="label-mono flex items-center gap-2 text-accent">
              <span
                aria-hidden
                className="h-1.5 w-1.5 rounded-full bg-accent"
              />
              CANDIDATE · AVAILABLE
            </span>
            <span className="label-mono">{profile.location}</span>
          </div>
        </Reveal>

        <Reveal delay={0.05} mode="slide">
          <p className="label-mono mb-5 text-fg">
            {profile.name} <span className="text-fg-dim">/</span> Cybersecurity
            Engineer
          </p>
        </Reveal>

        <Reveal delay={0.1} mode="slide">
          <h1
            id="hero-heading"
            className="max-w-4xl text-5xl leading-[0.95] font-extrabold tracking-[-0.03em] text-balance sm:text-6xl lg:text-7xl"
          >
            From breaking systems to{" "}
            <span className="text-accent">building the guardrails</span>.
          </h1>
        </Reveal>

        <Reveal delay={0.15} mode="slide">
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-fg-muted">
            I started in offensive security — VAPT, penetration testing, network
            reconnaissance — and I&apos;m turning that attacker&apos;s instinct
            into GRC and AI-security architecture. Explore the work as four
            interactive scenarios.
          </p>
        </Reveal>

        <Reveal delay={0.2} mode="slide">
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href={`#${firstScenario.id}`}
              className={cn(buttonVariants({ variant: "primary", size: "md" }))}
            >
              Enter the scenarios
              <ArrowRight size={16} aria-hidden />
            </a>
            <a
              href={profile.resumeUrl}
              download
              className={cn(buttonVariants({ variant: "outline", size: "md" }))}
            >
              Download resume
            </a>
          </div>
        </Reveal>

        {/* Focus areas — mono chips */}
        <Reveal delay={0.25} mode="slide">
          <ul className="mt-14 flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-6">
            {profile.focusAreas.map((area) => (
              <li key={area} className="label-mono text-fg-muted">
                {area}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
