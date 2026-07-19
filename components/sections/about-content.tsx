export function AboutContent({
  aboutBio,
  pullQuote,
  focusAreas,
}: {
  aboutBio: string[];
  pullQuote?: string;
  focusAreas: string[];
}) {
  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-4">
        {aboutBio.map((paragraph) => (
          <p
            key={paragraph}
            className="max-w-3xl text-lg leading-relaxed text-text-secondary sm:text-xl"
          >
            {paragraph}
          </p>
        ))}
      </div>

      {pullQuote && (
        <blockquote className="max-w-3xl border-l-2 border-accent pl-6 text-xl leading-snug font-medium text-text-primary italic sm:text-2xl">
          “{pullQuote}”
        </blockquote>
      )}

      <div className="flex flex-wrap gap-3">
        {focusAreas.map((area) => (
          <span
            key={area}
            className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-bg-surface px-4 py-2 text-sm font-medium text-text-secondary transition-colors duration-200 hover:border-accent hover:text-accent"
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
            {area}
          </span>
        ))}
      </div>
    </div>
  );
}
