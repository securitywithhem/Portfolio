import { Container } from "@/components/layout/container";
import { ProjectExplorer } from "@/components/sections/project-explorer";
import { SectionHeading } from "@/components/shared/section-heading";
import { getProjects } from "@/lib/data";

/**
 * Projects — fifth section in the scroll flow (per UI/UX Section 5 and
 * App Flow: Experience → Projects → Project Details → Certifications).
 * Server Component: project data is fetched and typed here; ProjectExplorer
 * is the only client boundary (filtering + the per-card detail dialog).
 *
 * `id="projects"` matches the anchor contract in data/navigation.ts.
 */
export function Projects() {
  const projects = getProjects();

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="py-24 sm:py-32"
    >
      <Container>
        <SectionHeading
          id="projects-heading"
          eyebrow="Projects"
          title="What I've built"
          className="mb-12"
        />
        <ProjectExplorer projects={projects} />
      </Container>
    </section>
  );
}
