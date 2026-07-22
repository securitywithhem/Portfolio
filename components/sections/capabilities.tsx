import { CapabilityArcDiagram } from "@/components/capability/arc-diagram";

/**
 * Plate 4 — paper-2. The recessed tier, finally earning its place.
 *
 * This was six columns of bulleted skill names, which was the weakest possible
 * presentation of the strongest content: a list says what the skills are but
 * not how they relate, and the relation is the entire argument — an offensive
 * base feeding into GRC and AI security, all of it standing on engineering.
 * The diagram makes that argument directly.
 *
 * Everything in it resolves from data/skills.ts, so the drawing and the data
 * cannot drift apart.
 */
export function Capabilities() {
  return (
    <section
      id="capabilities"
      className="bg-paper-2 px-6 py-24 text-ink md:px-10 md:py-36"
    >
      <div className="mx-auto max-w-6xl">
        <h2 className="type-plate max-w-[16ch]">
          What I can do, and where it is heading.
        </h2>
        <p className="type-body mt-6 text-ink-muted">
          Not a list of tools. The offensive base is where I started; GRC and AI
          security are where it is going; the engineering underneath is what
          lets me build these systems rather than only test them.
        </p>

        <div className="mt-16 md:mt-24">
          <CapabilityArcDiagram />
        </div>
      </div>
    </section>
  );
}
