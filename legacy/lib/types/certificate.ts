/** A certification or completed course (Backend Schema: Certificates). */
export interface Certificate {
  /** Stable unique identifier. */
  id: string;
  title: string;
  /** Issuing organization, e.g. "TryHackMe", "Google". */
  issuer: string;
  /** Issue date, ISO 8601 (`YYYY-MM-DD`). */
  date: string;
  /** Public verification URL, if the issuer provides one. */
  credentialUrl: string | null;
}
