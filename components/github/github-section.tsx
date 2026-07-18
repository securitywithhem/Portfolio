import {
  SectionPremium,
  SectionHeader,
  SectionGrid,
} from "@/components/layout/section-premium";
import { GitHubCard } from "@/components/github/github-card";
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
        title="Open Source Work"
        subtitle="Security projects and tools on GitHub"
      />
      <SectionGrid columns={3} gap="normal">
        {allRepos.map((url) => (
          <GitHubCard key={url} url={url} />
        ))}
      </SectionGrid>
    </SectionPremium>
  );
}
