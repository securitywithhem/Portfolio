/** A work/internship entry (Backend Schema: Experience). */
export interface Experience {
  company: string;
  role: string;
  /** Month granularity, ISO 8601 (`YYYY-MM`). */
  startDate: string;
  /** `null` while the position is current ("Present"). */
  endDate: string | null;
  /** Bullet-point achievements, most impactful first. */
  achievements: string[];
}
