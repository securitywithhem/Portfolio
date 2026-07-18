export function AboutContent({
  aboutBio,
  focusAreas,
}: {
  aboutBio: string[];
  focusAreas: string[];
}) {
  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-4">
        {aboutBio.map((paragraph) => (
          <p
            key={paragraph}
            className="max-w-3xl text-lg leading-relaxed text-[#8B8D92] sm:text-xl"
          >
            {paragraph}
          </p>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        {focusAreas.map((area) => (
          <span
            key={area}
            className="inline-flex items-center gap-2 rounded-full border border-[rgba(94,234,212,0.25)] bg-[rgba(94,234,212,0.12)] px-4 py-2 text-sm font-medium text-[#5EEAD4]"
          >
            <span className="inline-block h-2 w-2 rounded-full bg-[#5EEAD4]" />
            {area}
          </span>
        ))}
      </div>
    </div>
  );
}
