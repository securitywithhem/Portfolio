import { Hero } from "@/components/sections/hero";
import { Approach } from "@/components/sections/approach";
import { Work } from "@/components/sections/work";
import { Capabilities } from "@/components/sections/capabilities";
import { Credentials } from "@/components/sections/credentials";
import { Contact } from "@/components/sections/contact";

/**
 * Recruiter-facing landing page, ordered as a hiring funnel:
 *
 *   who I am (Hero) → why I'm different (Approach, which carries the one 3D
 *   set piece) → what I built (Work) → breadth (Capabilities + Credentials) →
 *   the ask (Contact).
 *
 * Anchor ids are contracted in data/navigation.ts and observed by the header's
 * scroll-spy — see the note there before adding or reordering a section.
 */
export default function Home() {
  return (
    <main id="main">
      <Hero />
      <Approach />
      <Work />
      <Capabilities />
      <Credentials />
      <Contact />
    </main>
  );
}
