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
        title="Two projects that prove the trajectory."
        titleAccent="One that proves the offense behind it."
        subtitle="Dharma (GRC) and VaultIQ (AI Security), grounded in the offensive API work below."
      />
      <ProjectExplorer projects={projects} />
    </SectionPremium>
  );
}
