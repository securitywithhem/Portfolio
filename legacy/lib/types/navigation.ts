/** One in-page section reachable from the site navigation. */
export interface NavSection {
  /** Anchor id of the target `<section>` — see data/navigation.ts for the contract. */
  id: string;
  /** Human-readable label shown in nav links. */
  label: string;
}
