import { NextRequest, NextResponse } from "next/server";

import { fetchGitHubRepo, repoToMetadata } from "@/lib/github";

/**
 * GET /api/github?owner=...&repo=...
 *
 * Server-side proxy to GitHub API. Accepts owner/repo query params and
 * returns sanitized repo metadata (stars, forks, language, updated, description).
 *
 * - Authentication (GITHUB_TOKEN) happens server-side only, never exposed to client.
 * - Caching is handled by fetchGitHubRepo via next: { revalidate: 3600 }.
 * - Error responses don't leak internal details — client falls back to static data.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const owner = searchParams.get("owner");
  const repo = searchParams.get("repo");

  if (!owner || !repo) {
    return NextResponse.json(
      { error: "Missing owner or repo query parameter" },
      { status: 400 },
    );
  }

  // Validate inputs to prevent injection or abuse — allow only alphanumeric + hyphens.
  if (!/^[a-zA-Z0-9_-]+$/.test(owner) || !/^[a-zA-Z0-9_.-]+$/.test(repo)) {
    return NextResponse.json(
      { error: "Invalid owner or repo format" },
      { status: 400 },
    );
  }

  const repoData = await fetchGitHubRepo(owner, repo);

  if (!repoData) {
    // Return 404 so the client knows to use fallback data, not retry.
    return NextResponse.json(
      { error: "Repository not found or API unreachable" },
      { status: 404 },
    );
  }

  const metadata = repoToMetadata(repoData);

  // Cache successful responses for 1 hour (same as the internal fetch).
  // CDN caches via Cache-Control header; Vercel edge cache respects this.
  return NextResponse.json(metadata, {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
