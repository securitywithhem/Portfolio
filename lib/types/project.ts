/** A portfolio project (Backend Schema: Projects). */
export interface Project {
  /** Stable unique identifier — never reused, never renumbered. */
  id: string;
  title: string;
  /** URL segment for the project detail page; unique across all projects. */
  slug: string;
  description: string;
  techStack: string[];
  /** Paths under /public (e.g. "/images/projects/vaultiq-1.png"). */
  images: string[];
  /** GitHub repository URL, if public. */
  github: string | null;
  /** Live deployment URL, if any. */
  live: string | null;
  /** Featured projects surface on the Home page's project highlight section. */
  featured: boolean;
}
