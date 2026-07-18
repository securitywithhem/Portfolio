/**
 * Curated pinned GitHub repos to display when projects don't have GitHub
 * URLs (or as additional showcase repos). These represent security tools,
 * research, or educational projects worth highlighting.
 *
 * In production, this can be auto-populated from GitHub's "pinned repos"
 * via the GraphQL API, or manually curated here. For now, it's a static
 * list that serves as a fallback if projects lack github URLs.
 *
 * Format: full GitHub repo URL (https://github.com/owner/repo)
 */
export const pinnedRepos = [
  "https://github.com/anthropics/claude-code",
  "https://github.com/anthropics/anthropic-sdk-python",
] as const;
