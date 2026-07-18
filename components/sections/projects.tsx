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
        index="05"
        title="What I've"
        titleAccent="built"
        subtitle="Security projects, tools, and pentesting work"
      />
      <ProjectExplorer projects={projects} />
    </SectionPremium>
  );
}
