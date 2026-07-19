import { cn } from "@/lib/utils";

/**
 * Eyebrow + heading pair for page sections below the Hero (About, Journey,
 * Skills, …). Server Component — extracted here rather than duplicated per
 * section, since every section past Hero needs the same pattern: a small
 * accent-colored label over an `h2` that anchors the section's
 * `aria-labelledby`.
 *
 * `id` must match the `aria-labelledby` the parent `<section>` declares —
 * callers own that wiring, this component only renders the heading.
 */
export function SectionHeading({
  id,
  eyebrow,
  title,
  className,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {eyebrow && (
        <p className="text-sm font-medium tracking-wide text-primary uppercase">
          {eyebrow}
        </p>
      )}
      <h2 id={id} className="text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h2>
    </div>
  );
}
