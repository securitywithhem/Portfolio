import { skillGroups, skillById } from "@/data/skills";

/** Skills — narrative-grouped catalogue. Grouping is the signal (no scores). */
export function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-title"
      className="border-t border-line py-24"
    >
      <div className="mx-auto max-w-6xl px-6">
        <p className="label-mono mb-3 flex items-center gap-3">
          <span aria-hidden className="h-4 w-1 rounded-[1px] bg-accent" />
          SKILLS
        </p>
        <h2
          id="skills-title"
          className="max-w-3xl text-3xl font-extrabold tracking-[-0.02em] sm:text-4xl"
        >
          Grounded in what attackers actually do.
        </h2>

        <div className="mt-14 space-y-12">
          {skillGroups.map((group) => (
            <div
              key={group.id}
              className="grid gap-6 border-t border-line pt-8 md:grid-cols-[1fr_2fr]"
            >
              <h3 className="text-sm font-semibold tracking-tight text-fg">
                {group.title}
              </h3>
              <ul className="flex flex-wrap gap-2 self-start">
                {group.skillIds.map((id) => {
                  const skill = skillById.get(id);
                  if (!skill) return null;
                  return (
                    <li
                      key={id}
                      title={skill.proficiencyNote}
                      className="rounded-[2px] border border-line bg-surface px-3 py-1.5 text-sm text-fg-muted transition-colors hover:border-line-strong hover:text-fg"
                    >
                      {skill.name}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
