import { ArrowUpRight, Star, GitFork } from "lucide-react";
import { fetchGitHubRepo, parseRepoUrl } from "@/lib/github";
import { projects } from "@/data/projects";
import { profile } from "@/data/profile";

/**
 * GitHub — live repo cards for projects with a repository, server-fetched and
 * ISR-cached (1h). Degrades gracefully: if the API is unavailable or a repo is
 * private, the card still renders from static project data with a link.
 */
export async function GitHubSection() {
  const withRepo = projects.flatMap((p) => (p.github ? [p] : []));
  const entries = await Promise.all(
    withRepo.map(async (p) => {
      const parsed = p.github ? parseRepoUrl(p.github) : null;
      const repo = parsed
        ? await fetchGitHubRepo(parsed.owner, parsed.repo)
        : null;
      return { project: p, repo };
    }),
  );

  const githubProfile = profile.socials.find((s) => s.label === "GitHub");

  return (
    <section
      id="github"
      aria-labelledby="github-title"
      className="border-t border-line py-24"
    >
      <div className="mx-auto max-w-6xl px-6">
        <p className="label-mono mb-3 flex items-center gap-3">
          <span aria-hidden className="h-4 w-1 rounded-[1px] bg-accent" />
          GITHUB
        </p>
        <h2
          id="github-title"
          className="max-w-3xl text-3xl font-extrabold tracking-[-0.02em] sm:text-4xl"
        >
          The code behind the claims.
        </h2>

        <ul className="mt-12 grid gap-px overflow-hidden rounded-[2px] border border-line bg-line md:grid-cols-2">
          {entries.map(({ project, repo }) => (
            <li key={project.id} className="flex flex-col gap-3 bg-surface p-6">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-mono text-sm font-medium tracking-tight text-fg">
                  {repo?.name ?? project.title}
                </h3>
                {repo?.language && (
                  <span className="label-mono">{repo.language}</span>
                )}
              </div>
              <p className="text-sm leading-relaxed text-fg-muted">
                {repo?.description ?? project.description}
              </p>
              <div className="mt-auto flex items-center justify-between pt-2">
                {repo ? (
                  <div className="flex items-center gap-4 text-fg-muted">
                    <span className="flex items-center gap-1.5 text-sm">
                      <Star size={13} aria-hidden />
                      {repo.stargazers_count}
                    </span>
                    <span className="flex items-center gap-1.5 text-sm">
                      <GitFork size={13} aria-hidden />
                      {repo.forks_count}
                    </span>
                  </div>
                ) : (
                  <span className="label-mono text-fg-dim">REPOSITORY</span>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-fg transition-colors hover:text-accent"
                  >
                    View
                    <ArrowUpRight size={13} aria-hidden />
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>

        {githubProfile && (
          <a
            href={githubProfile.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 text-sm text-fg transition-colors hover:text-accent"
          >
            View all repositories
            <ArrowUpRight size={14} aria-hidden />
          </a>
        )}
      </div>
    </section>
  );
}
