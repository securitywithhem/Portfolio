import { profile } from "@/data/profile";

/**
 * Colophon. Stays on the vermilion plate so the page ends drenched rather than
 * dribbling back out to a neutral strip — the contact section is the closing
 * statement and this is its last line, not a new section.
 *
 * Social links deliberately are not repeated here; they are directly above in
 * the contact plate, and a second copy three inches lower is filler.
 */
export function SiteFooter() {
  return (
    <footer className="bg-close px-6 pb-10 text-on-close md:px-10">
      <div className="mx-auto max-w-6xl border-t border-rule-on-close pt-8">
        <p className="type-data text-on-close-muted">
          {profile.name} · {profile.location}
        </p>
      </div>
    </footer>
  );
}
