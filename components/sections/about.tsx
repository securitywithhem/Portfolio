import { AboutContent } from "@/components/sections/about-content";
import { Container } from "@/components/layout/container";
import { FadeInView } from "@/components/shared/fade-in-view";
import { getProfile } from "@/lib/data";

/**
 * About — second section in the scroll flow (Hero → About → Journey → …),
 * establishing the narrative credibility the Hero's one-liner doesn't have
 * room for. Server Component: content is in the initial HTML for crawlers;
 * FadeInView is the only client boundary, composed in rather than wrapping
 * this file in "use client" (About itself never touches the DOM directly).
 *
 * `id="about"` matches the anchor contract in data/navigation.ts — the
 * navbar's IntersectionObserver depends on this id existing unchanged.
 */
export function About() {
  const { aboutBio, focusAreas } = getProfile();

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="py-24 sm:py-32"
    >
      <Container>
        <FadeInView>
          <AboutContent aboutBio={aboutBio} focusAreas={focusAreas} />
        </FadeInView>
      </Container>
    </section>
  );
}
