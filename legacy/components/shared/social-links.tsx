import { Globe, Target } from "lucide-react";

import { Button } from "@/components/ui/button";
import { GitHubIcon } from "@/components/shared/brand-icons";
import type { SocialLink } from "@/lib/types";
import { cn } from "@/lib/utils";

/**
 * Icon links to external profiles, driven by Profile.socials — shared by
 * the Hero (2.2) and Footer (2.3) so the two can never drift. Server
 * Component.
 *
 * lucide-react v1 removed brand icons, so GitHub/LinkedIn marks come from
 * shared/brand-icons; TryHackMe has no standard mark here, so it gets a
 * target glyph; unmapped labels fall back to a globe. The Button primitive
 * auto-sizes any child svg to size-4.
 */

function LinkedInIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
    </svg>
  );
}

const ICONS: Record<string, React.ElementType> = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  tryhackme: Target,
};

export function SocialLinks({
  socials,
  className,
}: {
  socials: SocialLink[];
  className?: string;
}) {
  return (
    <ul className={cn("flex items-center gap-1", className)}>
      {socials.map(({ label, url }) => {
        const Icon = ICONS[label.toLowerCase()] ?? Globe;
        return (
          <li key={url}>
            <Button
              asChild
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
            >
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${label} profile (opens in a new tab)`}
              >
                <Icon aria-hidden />
              </a>
            </Button>
          </li>
        );
      })}
    </ul>
  );
}
