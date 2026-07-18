import { env } from "@/lib/env";

/**
 * GitHub API types — only fields the UI actually consumes.
 * Narrow schema guards against unexpected API shape changes.
 */
export interface GitHubRepo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
}

/**
 * Repo metadata for the UI — derived from GitHub API or static fallback.
 * Decouples the presentation layer from the GitHub API schema.
 */
export interface RepoMetadata {
  owner: string;
  repo: string;
  url: string;
  stars: number;
  forks: number;
  language: string | null;
  updated: string;
  description: string | null;
}

/**
 * Fetch a single repo from GitHub API. Uses the authenticated endpoint
 * (with GITHUB_TOKEN) to get higher rate limits (5000 req/hr vs 60), but
 * falls back gracefully if the token is missing or the API is down.
 *
 * Returns null on error so the caller can fall back to static data.
 */
export async function fetchGitHubRepo(
  owner: string,
  repo: string,
): Promise<GitHubRepo | null> {
  try {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github.v3+json",
    };
    if (env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${env.GITHUB_TOKEN}`;
    }

    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}`,
      {
        headers,
        // Cache for 1 hour (3600 seconds) — GitHub data updates are not
        // realtime, so ISR revalidation balances freshness and rate limits.
        // Vercel's edge cache will serve stale-while-revalidate beyond this.
        next: { revalidate: 3600 },
      },
    );

    if (!response.ok) {
      console.error(
        `GitHub API error for ${owner}/${repo}: ${response.status}`,
      );
      return null;
    }

    const data = (await response.json()) as unknown;
    return validateGitHubRepo(data);
  } catch (error) {
    console.error(`Failed to fetch GitHub repo ${owner}/${repo}:`, error);
    return null;
  }
}

/**
 * Validate and narrow GitHub API response to only the fields we use.
 * Guards against unexpected API schema changes or malformed responses.
 */
function validateGitHubRepo(data: unknown): GitHubRepo | null {
  if (
    typeof data !== "object" ||
    data === null ||
    !("id" in data) ||
    !("name" in data) ||
    !("html_url" in data) ||
    !("stargazers_count" in data) ||
    !("forks_count" in data)
  ) {
    console.error("Invalid GitHub API response shape");
    return null;
  }

  const repo = data as Record<string, unknown>;
  return {
    id: Number(repo.id),
    name: String(repo.name),
    html_url: String(repo.html_url),
    description: repo.description ? String(repo.description) : null,
    stargazers_count: Number(repo.stargazers_count),
    forks_count: Number(repo.forks_count),
    language: repo.language ? String(repo.language) : null,
    updated_at: String(repo.updated_at),
  };
}

/**
 * Transform GitHub API response into UI-friendly metadata.
 * Extracts owner/repo from URL for cleaner presentation.
 */
export function repoToMetadata(repo: GitHubRepo): RepoMetadata {
  const url = new URL(repo.html_url);
  const [, owner, repoName] = url.pathname.split("/");

  return {
    owner: owner || "unknown",
    repo: repoName || repo.name,
    url: repo.html_url,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    language: repo.language,
    updated: repo.updated_at,
    description: repo.description,
  };
}
