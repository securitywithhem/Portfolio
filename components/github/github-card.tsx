import { Star, GitFork, Code, Clock, ArrowUpRight } from "lucide-react";

import { fetchGitHubRepo, repoToMetadata } from "@/lib/github";

/**
 * One GitHub repo cell — fetches live data server-side and falls back
 * gracefully if unavailable. Server Component since data-fetching is
 * inherently async and server-side only.
 *
 * Flat editorial cell (Design System v2) consistent with the credential wall:
 * the whole cell links out, owner reads as a tracked-out mono label, repo is
 * the primary type and turns accent on hover, with a live stats row beneath.
 * Takes a full GitHub URL; if the fetch fails the cell still links to the repo.
 */
export async function GitHubCard({ url }: { url: string }) {
  const { owner, repo } = parseGitHubUrl(url);

  let metadata = null;
  if (owner && repo) {
    const repoData = await fetchGitHubRepo(owner, repo);
    if (repoData) {
      metadata = repoToMetadata(repoData);
    }
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${repo} repository on GitHub (opens in a new tab)`}
      className="group flex h-full flex-col gap-4 bg-bg-base p-6 transition-colors duration-200 hover:bg-bg-surface sm:p-8"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          {owner && (
            <span className="font-mono text-[11px] font-medium tracking-[0.12em] text-text-muted uppercase">
              {owner}
            </span>
          )}
          <h3 className="mt-2 truncate text-base font-semibold tracking-tight text-text-primary transition-colors duration-200 group-hover:text-accent sm:text-lg">
            {repo}
          </h3>
        </div>
        <ArrowUpRight
          aria-hidden
          className="size-4 shrink-0 text-text-muted opacity-0 transition-all duration-200 group-hover:text-accent group-hover:opacity-100"
        />
      </div>

      {metadata?.description && (
        <p className="line-clamp-2 text-sm leading-relaxed text-text-secondary">
          {metadata.description}
        </p>
      )}

      {metadata && (
        <div className="mt-auto flex flex-wrap gap-4 pt-2 text-xs text-text-muted">
          <span className="flex items-center gap-1.5">
            <Star aria-hidden className="size-3.5" />
            {formatCount(metadata.stars)}
          </span>
          <span className="flex items-center gap-1.5">
            <GitFork aria-hidden className="size-3.5" />
            {formatCount(metadata.forks)}
          </span>
          {metadata.language && (
            <span className="flex items-center gap-1.5">
              <Code aria-hidden className="size-3.5" />
              {metadata.language}
            </span>
          )}
          {metadata.updated && (
            <span className="flex items-center gap-1.5">
              <Clock aria-hidden className="size-3.5" />
              <time dateTime={metadata.updated}>
                {formatDate(metadata.updated)}
              </time>
            </span>
          )}
        </div>
      )}
    </a>
  );
}

/**
 * Parse a GitHub URL to extract owner/repo.
 * Handles: https://github.com/owner/repo or variations.
 */
function parseGitHubUrl(url: string): {
  owner: string | null;
  repo: string | null;
} {
  try {
    const pathname = new URL(url).pathname;
    const [, owner, repo] = pathname.split("/");
    return { owner: owner || null, repo: repo || null };
  } catch {
    return { owner: null, repo: null };
  }
}

/**
 * Format large numbers for display: 1000 → "1K", 500 → "500".
 */
function formatCount(count: number): string {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
}

/**
 * Format ISO date to human-readable form: "2025-06-15" → "Jun 15, 2025"
 * (or "2 weeks ago" style with more complex logic, but we keep it simple).
 */
function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "Unknown";
  }
}
