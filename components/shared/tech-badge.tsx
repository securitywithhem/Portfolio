/**
 * A single named tag (skill, tech-stack entry), plain text only — no
 * per-item icon. Shared by Skills (Phase 3C) and Projects (Phase 4A) so the
 * two never drift into near-duplicate badge markup. See SkillBadge's
 * original rationale: a branded icon per tool/framework would need a second
 * icon source beyond lucide-react for purely decorative gain, and the text
 * label is already the accessible name.
 */
export function TechBadge({ label }: { label: string }) {
  return (
    <li className="rounded-md border bg-secondary px-3 py-1.5 text-sm text-secondary-foreground">
      {label}
    </li>
  );
}
