import { Star, GitFork, Code, Clock } from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { fetchGitHubRepo, repoToMetadata } from "@/lib/github";

/**
 * One GitHub repo card — fetches live data server-side and falls back
 * gracefully if unavailable. Server Component since data-fetching is
 * inherently async and server-side only.
 *
 * Takes a full GitHub URL (e.g. https://github.com/user/repo) and extracts
 * the owner/repo to fetch metadata. If fetch fails, renders a fallback with
 * the URL still clickable so the recruiter can view the repo directly.
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
    <Card className="flex h-full flex-col overflow-hidden py-4 sm:py-6">
      <CardHeader className="pb-3 sm:pb-4">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-block"
          aria-label={`${repo} repository on GitHub (opens in a new tab)`}
        >
          <h3 className="text-base font-semibold tracking-tight transition-colors group-hover:text-primary sm:text-lg">
            {repo}
          </h3>
        </a>
        <p className="text-xs text-muted-foreground sm:text-sm">{owner}</p>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-4 pb-0">
        {metadata?.description && (
          <p className="line-clamp-2 text-sm text-muted-foreground sm:text-base">
            {metadata.description}
          </p>
        )}

        {metadata && (
          <div className="flex flex-wrap gap-3 text-xs text-muted-foreground sm:text-sm">
            <div className="flex items-center gap-1">
              <Star aria-hidden className="size-3.5" />
              <span>{formatCount(metadata.stars)}</span>
            </div>
            <div className="flex items-center gap-1">
              <GitFork aria-hidden className="size-3.5" />
              <span>{formatCount(metadata.forks)}</span>
            </div>
            {metadata.language && (
              <div className="flex items-center gap-1">
                <Code aria-hidden className="size-3.5" />
                <span>{metadata.language}</span>
              </div>
            )}
            {metadata.updated && (
              <div className="flex items-center gap-1">
                <Clock aria-hidden className="size-3.5" />
                <time dateTime={metadata.updated}>
                  {formatDate(metadata.updated)}
                </time>
              </div>
            )}
          </div>
        )}

        <div className="mt-auto pt-3">
          <Button asChild variant="outline" size="sm">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${repo} on GitHub (opens in a new tab)`}
            >
              View on GitHub
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
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
