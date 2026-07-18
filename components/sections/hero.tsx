import { HeroElite } from "./hero-elite";
import { getProfile } from "@/lib/data";

/**
 * Hero — elite hacker aesthetic with refined dark theme + teal accent.
 * Premium animations: grid background, glow effect, typing animation, stagger reveals.
 * Motion tier: Complex (8/10) — smooth scroll reveals and premium polish.
 */
export function Hero() {
  const profile = getProfile();

  return (
    <section id="hero">
      <HeroElite socials={profile.socials} resumeUrl={profile.resumeUrl} />
    </section>
  );
}
