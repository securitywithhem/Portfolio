import { Container } from "@/components/layout/container";
import { HeroParticles } from "@/components/sections/hero-particles";
import { HeroClient } from "./hero-client";
import { getProfile } from "@/lib/data";

/**
 * Hero — the recruiter's first impression (PRD: credibility in <30s).
 * Server Component shell wrapping HeroClient for animation boundary.
 *
 * The h1 carries name + role — the page's primary keyword signal.
 * Animations: fade-in + slide-up with stagger for heading, bio, and CTA.
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
        <HeroClient
          name={name}
          role={role}
          bio={bio}
          socials={socials}
          resumeUrl={resumeUrl}
        />
      </Container>
    </section>
  );
}
