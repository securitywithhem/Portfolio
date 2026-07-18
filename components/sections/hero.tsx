import Link from "next/link";
import { Download } from "lucide-react";

import { Container } from "@/components/layout/container";
import { HeroParticles } from "@/components/sections/hero-particles";
import { SocialLinks } from "@/components/shared/social-links";
import { Button } from "@/components/ui/button";
import { getProfile } from "@/lib/data";

/**
 * Hero — the recruiter's first impression (PRD: credibility in <30s).
 * Server Component: all copy is in the initial HTML for SEO/LCP; the only
 * client leaf is the decorative particle canvas.
 *
 * Entrance is one CSS animation (tw-animate, same 500ms as the
 * transitionBase preset) instead of Framer Motion: it plays at first paint
 * without waiting for hydration, keeping the LCP element (the h1) visible
 * ~as early as possible. The global reduced-motion rule flattens it for
 * users who opt out. The h1 carries name + role — the page's primary
 * keyword signal — and is the document's only h1.
 */
export function Hero() {
  const { name, role, bio, socials, resumeUrl } = getProfile();

  return (
    <section
      id="hero"
      className="relative flex min-h-dvh items-center overflow-hidden"
    >
      <HeroParticles />
      <Container className="relative">
        <div className="flex animate-in flex-col items-center gap-6 py-24 text-center duration-500 fade-in slide-in-from-bottom-4">
          <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
            {name}
            <span className="mt-4 block text-xl font-normal text-muted-foreground sm:text-2xl">
              {role}
            </span>
          </h1>
          <p className="max-w-2xl text-base text-muted-foreground sm:text-lg">
            {bio}
          </p>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <a href={resumeUrl} download>
                <Download aria-hidden /> Download Resume
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/#contact">Contact</Link>
            </Button>
          </div>
          <SocialLinks socials={socials} className="mt-2" />
        </div>
      </Container>
    </section>
  );
}
