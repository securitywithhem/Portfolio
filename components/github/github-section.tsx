import {
  SectionPremium,
  SectionHeader,
} from "@/components/layout/section-premium";
import { GitHubCard } from "@/components/github/github-card";
import { GitHubGrid, GitHubGridItem } from "@/components/github/github-grid";
import { getProjects } from "@/lib/data";
import { pinnedRepos } from "@/data/github-repos";

export async function GitHubSection() {
  const projects = getProjects();

  const projectRepos = new Set(
    projects.filter((p) => p.github).map((p) => p.github as string),
  );

  const allRepos = Array.from(new Set([...projectRepos, ...pinnedRepos]));

  if (allRepos.length === 0) {
    return null;
  }

  return (
    <SectionPremium id="github" spacing="normal" accentLine="top">
      <SectionHeader
        eyebrow="GitHub"
        index="08"
        title="Open source"
        titleAccent="work"
        subtitle="Security projects and tools on GitHub"
      />
      <GitHubGrid>
        {allRepos.map((url) => (
          <GitHubGridItem key={url}>
            <GitHubCard url={url} />
          </GitHubGridItem>
        ))}
      </GitHubGrid>
    </SectionPremium>
  );
}
