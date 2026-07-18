/** A social/profile link (GitHub, LinkedIn, TryHackMe, …). */
export interface SocialLink {
  /** Display label, e.g. "GitHub". */
  label: string;
  /** Absolute URL to the profile. */
  url: string;
}

/** Site owner identity — rendered in the Hero, About, and Footer sections. */
export interface Profile {
  name: string;
  /** Professional headline, e.g. "Cybersecurity Engineer". */
  role: string;
  /** Short third-person or first-person bio for the About section. */
  bio: string;
  socials: SocialLink[];
  /**
   * Site-relative path to the downloadable resume in /public
   * (e.g. "/Hem-Gabhawala-Resume.pdf"). Extension to the Backend Schema's
   * Profile entity (name/role/bio/socials), added in Phase 2.2 for the
   * Hero's "Download Resume" CTA.
   */
  resumeUrl: string;
}
