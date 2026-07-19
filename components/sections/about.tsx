import { getProfile } from "@/lib/data";

/** About — narrative bio, pull quote, focus areas. Fully server-rendered. */
export function About() {
  const profile = getProfile();

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="border-t border-line py-24"
    >
      <div className="mx-auto max-w-6xl px-6">
        <p className="label-mono mb-3 flex items-center gap-3">
          <span aria-hidden className="h-4 w-1 rounded-[1px] bg-accent" />
          ABOUT
        </p>
        <h2
          id="about-title"
          className="max-w-3xl text-3xl font-extrabold tracking-[-0.02em] sm:text-4xl"
        >
          Starting from the other side of the vulnerability.
        </h2>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1.6fr_1fr]">
          <div className="space-y-5">
            {profile.aboutBio.map((para, i) => (
              <p key={i} className="text-base leading-relaxed text-fg-muted">
                {para}
              </p>
            ))}
          </div>

          <aside className="lg:pt-2">
            <blockquote className="border-l-2 border-accent pl-5">
              <p className="text-lg leading-snug font-medium text-fg">
                {profile.aboutPullQuote}
              </p>
            </blockquote>

            <div className="mt-10 border-t border-line pt-6">
              <p className="label-mono mb-4">FOCUS AREAS</p>
              <ul className="space-y-2">
                {profile.focusAreas.map((area) => (
                  <li
                    key={area}
                    className="flex items-center gap-3 text-sm text-fg"
                  >
                    <span
                      aria-hidden
                      className="h-1 w-1 shrink-0 rounded-full bg-accent"
                    />
                    {area}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
