import {
  SectionPremium,
  SectionHeader,
} from "@/components/layout/section-premium";
import { ProjectExplorer } from "@/components/sections/project-explorer";
import { getProjects } from "@/lib/data";

export function Projects() {
  const projects = getProjects();

  return (
    <SectionPremium id="projects" spacing="normal" accentLine="top">
      <SectionHeader
        eyebrow="Portfolio"
        title="What I've built"
        subtitle="Security projects, tools, and pentesting work"
      />
      <ProjectExplorer projects={projects} />
    </SectionPremium>
  );
}
