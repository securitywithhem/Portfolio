import {
  SectionPremium,
  SectionHeader,
} from "@/components/layout/section-premium";
import { GitHubCard } from "@/components/github/github-card";
import { GitHubGrid, GitHubGridItem } from "@/components/github/github-grid";
import { getProfile, getProjects } from "@/lib/data";
import { pinnedRepos } from "@/data/github-repos";

export async function GitHubSection() {
  const projects = getProjects();
  const githubUrl = getProfile().socials.find((s) => s.label === "GitHub")?.url;

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
        title="The systems behind the claims —"
        titleAccent="built, not just studied."
        subtitle="Dharma and VaultIQ aren't case studies — they're real repositories with real architecture decisions."
      />

      <p className="mx-auto mb-12 max-w-3xl text-center text-lg leading-relaxed text-text-secondary">
        If you&apos;re hiring for GRC or AI Security, this is the fastest way to
        see how I actually think about audit integrity and secure-by-design AI
        systems&nbsp;&mdash; not just how I describe it.
      </p>

      <GitHubGrid>
        {allRepos.map((url) => (
          <GitHubGridItem key={url}>
            <GitHubCard url={url} />
          </GitHubGridItem>
        ))}
      </GitHubGrid>

      {githubUrl && (
        <div className="mt-10 text-center">
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-sm font-medium text-accent transition-colors duration-200 hover:text-accent-hover"
          >
            github.com/SecurityWithHem →
          </a>
        </div>
      )}
    </SectionPremium>
  );
}
