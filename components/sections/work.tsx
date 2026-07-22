import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import { profile } from "@/data/profile";
import { Reveal } from "@/components/shared/reveal";

const GITHUB_URL =
  profile.socials.find((s) => s.label === "GitHub")?.url ??
  "https://github.com/SecurityWithHem";

/**
 * Plate 3 — paper. Back to light after the ink plate.
 *
 * One project per fold. The previous version stacked three equal-weight rows,
 * which made three genuinely different systems read as an undifferentiated
 * list; giving each one the full width and the display scale lets them land
 * separately. No cards, no nested panels, no pill tags — the projects are the
 * content, and boxing them adds a frame nobody asked for.
 *
 * Each entry leads with the one outcome a recruiter should retain (`highlight`),
 * then what it is and how it is built. The "why it matters" argument already ran
 * on the ink plate and is not repeated here.
 *
 * A real but private repo (Dharma) shows `sourceNote` instead of a link — a dead
 * "view source" reads worse than none.
 */
function WorkEntry({ project }: { project: (typeof projects)[number] }) {
  return (
    <Reveal inView delay={0.05}>
      <article className="grid gap-8 border-t border-rule pt-10 md:grid-cols-[1fr_1.4fr] md:gap-16 md:pt-14">
        <div>
          <h3 className="type-sub">{project.title}</h3>
          <p className="type-data mt-4 text-ink-dim">
            {project.techStack.join(" · ")}
          </p>

          {project.github ? (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-1.5 text-[0.9rem] font-medium text-ink transition-colors hover:text-accent"
            >
              <span className="link-underline">View source</span>
              <ArrowUpRight size={14} aria-hidden />
            </a>
          ) : (
            project.sourceNote && (
              <p className="type-data mt-6 text-ink-dim">
                {project.sourceNote}
              </p>
            )
          )}
        </div>

        <div>
          {project.highlight && (
            <p className="type-data font-medium text-accent">
              {project.highlight}
            </p>
          )}
          {/* The single most important line about the project, at reading
              scale rather than buried in a paragraph. */}
          <p className="mt-3 text-[clamp(1.15rem,2vw,1.5rem)] leading-[1.3] font-medium">
            {project.tagline}
          </p>
          <p className="type-body mt-6 text-ink-muted">{project.technical}</p>
        </div>
      </article>
    </Reveal>
  );
}

export function Work() {
  return (
    <section
      id="work"
      className="bg-paper px-6 py-24 text-ink md:px-10 md:py-36"
    >
      <div className="mx-auto max-w-6xl">
        <h2 className="type-plate max-w-[14ch]">
          Three systems, built end to end.
        </h2>
        <p className="type-body mt-6 text-ink-muted">
          Two turn offensive knowledge into preventive architecture. The third
          is the offensive work they came from.
        </p>

        <div className="mt-16 flex flex-col gap-16 md:mt-24 md:gap-28">
          {projects.map((project) => (
            <WorkEntry key={project.id} project={project} />
          ))}
        </div>

        <Reveal inView>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-16 inline-flex items-center gap-1.5 text-[0.95rem] font-medium text-ink transition-colors hover:text-accent md:mt-24"
          >
            <span className="link-underline">More projects on GitHub</span>
            <ArrowUpRight size={15} aria-hidden />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
