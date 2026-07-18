import Link from "next/link";

import { BackToTop } from "@/components/layout/back-to-top";
import { Container } from "@/components/layout/container";
import { SocialLinks } from "@/components/shared/social-links";
import { Separator } from "@/components/ui/separator";
import { getNavSections, getProfile } from "@/lib/data";

/**
 * Closing section of the App Flow (…Contact → Resume Download → Footer).
 * Server Component — the only interactive piece (BackToTop) is isolated as
 * a client leaf. Sources nav links from `getNavSections()` (Part 2.1) and
 * socials from `getProfile()` (Part 2.2) — no new data file, so Footer and
 * Navbar can never drift apart.
 *
 * Calm by design per the UI/UX spec: no particle background here, only the
 * existing `.glass` surface treatment reused from the navbar, and hover-only
 * link transitions (no entrance animation on a section that's read, not
 * arrived at).
 */
export function Footer() {
  const sections = getNavSections();
  const { name, role, socials } = getProfile();
  const year = new Date().getFullYear();

  return (
    <footer className="glass border-t">
      <Container className="flex flex-col gap-8 py-12">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold tracking-tight">{name}</p>
            <p className="text-sm text-muted-foreground">{role}</p>
          </div>
          <div className="flex items-center gap-4">
            <SocialLinks socials={socials} />
            <BackToTop />
          </div>
        </div>

        <Separator />

        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {sections.map(({ id, label }) => (
              <li key={id}>
                <Link
                  href={`/#${id}`}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-1 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {name}. All rights reserved.
          </p>
          <p>Built with Next.js, Tailwind CSS, and shadcn/ui.</p>
        </div>
      </Container>
    </footer>
  );
}
