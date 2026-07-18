import { Container } from "@/components/layout/container";
import { GitHubCard } from "@/components/github/github-card";
import { GitHubGrid, GitHubGridItem } from "@/components/github/github-grid";
import { SectionHeading } from "@/components/shared/section-heading";
import { getProjects } from "@/lib/data";
import { pinnedRepos } from "@/data/github-repos";

/**
 * GitHub section — showcases GitHub repos linked from projects and/or
 * a curated pinned repos list. Fetches live metadata (stars, forks,
 * language, last updated) and renders with graceful fallback if API
 * is unavailable or rate-limited.
 *
 * Server Component: data fetching happens here; GitHubGrid owns the
 * animation boundary (client component with Framer Motion).
 *
 * Positioned after Certifications/TryHackMe in the App Flow (Section 9
 * per UI/UX), before Blog. This placement lets recruiters see real work
 * on GitHub after reviewing credentials.
 *
 * `id="github"` matches the anchor contract in data/navigation.ts.
 */
export async function GitHubSection() {
  const projects = getProjects();

  // Collect unique GitHub URLs from projects.
  const projectRepos = new Set(
    projects.filter((p) => p.github).map((p) => p.github as string),
  );

  // Combine project repos with pinned repos, removing duplicates.
  const allRepos = Array.from(new Set([...projectRepos, ...pinnedRepos]));

  if (allRepos.length === 0) {
    // No repos to display — show a placeholder or empty state.
    return null;
  }

  return (
    <section
      id="github"
      aria-labelledby="github-heading"
      className="py-24 sm:py-32"
    >
      <Container>
        <SectionHeading
          id="github-heading"
          eyebrow="GitHub"
          title="Open Source Work"
          className="mb-12"
        />
        <GitHubGrid>
          {allRepos.map((url) => (
            <GitHubGridItem key={url}>
              <GitHubCard url={url} />
            </GitHubGridItem>
          ))}
        </GitHubGrid>
      </Container>
    </section>
  );
}
