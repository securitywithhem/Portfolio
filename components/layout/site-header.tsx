import Link from "next/link";

import { Container } from "@/components/layout/container";
import { SiteNav } from "@/components/layout/site-nav";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { getNavSections, getProfile } from "@/lib/data";

/**
 * Sticky site header — server shell; all interactivity lives in the client
 * leaves it composes (SiteNav, ThemeToggle). `sticky` keeps the header in
 * normal flow, so it causes no layout shift; anchored sections clear it via
 * the global scroll-padding-top (see styles/globals.css and the anchor
 * contract in data/navigation.ts).
 *
 * The header row runs wider (max-w-6xl) than the max-w-5xl content column —
 * deliberate, Vercel-style: 11 nav links need the extra room, and a wider
 * frame around a narrower column is part of the enterprise idiom.
 */
export function SiteHeader() {
  const sections = getNavSections();
  const { name } = getProfile();

  return (
    <header className="sticky top-0 z-50 glass border-x-0 border-t-0">
      <a
        href="#main"
        className="sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:top-20 focus-visible:left-6 focus-visible:z-50 focus-visible:rounded-md focus-visible:bg-primary focus-visible:px-4 focus-visible:py-2 focus-visible:text-sm focus-visible:font-medium focus-visible:text-primary-foreground"
      >
        Skip to content
      </a>
      <Container className="flex h-16 max-w-6xl items-center justify-between gap-6">
        <Link
          href="/#hero"
          className="text-sm font-semibold tracking-tight whitespace-nowrap"
        >
          {name}
        </Link>
        <SiteNav sections={sections}>
          <ThemeToggle />
        </SiteNav>
      </Container>
    </header>
  );
}
