import { env } from "@/lib/env";

/** GitHub API fields the UI consumes (narrowed to guard against shape drift). */
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
 * Fetch a single repo. Uses GITHUB_TOKEN for higher rate limits when present,
 * ISR-caches for 1h, and returns null on any error so callers fall back
 * gracefully (never throws into the render).
 */
export async function fetchGitHubRepo(
  owner: string,
  repo: string,
): Promise<GitHubRepo | null> {
  try {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github.v3+json",
    };
    if (env.GITHUB_TOKEN) headers.Authorization = `Bearer ${env.GITHUB_TOKEN}`;

    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}`,
      { headers, next: { revalidate: 3600 } },
    );
    if (!response.ok) return null;

    return validateGitHubRepo((await response.json()) as unknown);
  } catch {
    return null;
  }
}

function validateGitHubRepo(data: unknown): GitHubRepo | null {
  if (
    typeof data !== "object" ||
    data === null ||
    !("id" in data) ||
    !("name" in data) ||
    !("html_url" in data)
  ) {
    return null;
  }
  const repo = data as Record<string, unknown>;
  return {
    id: Number(repo.id),
    name: String(repo.name),
    html_url: String(repo.html_url),
    description: repo.description ? String(repo.description) : null,
    stargazers_count: Number(repo.stargazers_count ?? 0),
    forks_count: Number(repo.forks_count ?? 0),
    language: repo.language ? String(repo.language) : null,
    updated_at: String(repo.updated_at ?? ""),
  };
}

/** Parse "https://github.com/owner/repo" → { owner, repo }, or null. */
export function parseRepoUrl(
  url: string,
): { owner: string; repo: string } | null {
  try {
    const { hostname, pathname } = new URL(url);
    if (hostname !== "github.com") return null;
    const [, owner, repo] = pathname.split("/");
    if (!owner || !repo) return null;
    return { owner, repo };
  } catch {
    return null;
  }
}
