import { SectionHeading } from "@/components/shared/section-heading";

/**
 * Narrative content of About: heading, bio paragraphs, focus-area tags.
 * Split from About so the section shell (anchor id, container, motion
 * wrapper) stays uncluttered — this is the piece that will grow if About
 * later gains a portrait or stat row.
 */
export function AboutContent({
  aboutBio,
  focusAreas,
}: {
  aboutBio: string[];
  focusAreas: string[];
}) {
  return (
    <div className="flex flex-col gap-8">
      <SectionHeading id="about-heading" eyebrow="About" title="About Me" />
      <div className="flex flex-col gap-4">
        {aboutBio.map((paragraph) => (
          <p
            key={paragraph}
            className="max-w-3xl text-base text-muted-foreground sm:text-lg"
          >
            {paragraph}
          </p>
        ))}
      </div>
      <ul className="flex flex-wrap gap-2">
        {focusAreas.map((area) => (
          <li
            key={area}
            className="rounded-md border bg-accent/50 px-3 py-1 text-sm text-accent-foreground"
          >
            {area}
          </li>
        ))}
      </ul>
    </div>
  );
}
