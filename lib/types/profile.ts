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
  /** Short bio for the Hero — one to two sentences, sets the tone at a glance. */
  bio: string;
  socials: SocialLink[];
  /**
   * Site-relative path to the downloadable resume in /public
   * (e.g. "/Hem-Gabhawala-Resume.pdf"). Extension to the Backend Schema's
   * Profile entity (name/role/bio/socials), added in Phase 2.2 for the
   * Hero's "Download Resume" CTA.
   */
  resumeUrl: string;
  /** Public contact email, shown in the Contact section's direct-contact block. */
  email?: string;
  /** Location string (e.g. "Vadodara, Gujarat, India") for the Contact block. */
  location?: string;
  /**
   * Extended narrative for the About section, one entry per paragraph.
   * Extension to the Backend Schema's Profile entity, added in Phase 3A —
   * the Hero's `bio` is deliberately short, and About needs more room to
   * establish credibility without repeating the Hero verbatim.
   */
  aboutBio: string[];
  /** Optional pull-quote rendered as an emphasis line in the About section. */
  aboutPullQuote?: string;
  /** Short focus-area tags shown in About, bridging into the Skills section. */
  focusAreas: string[];
}
