/**
 * Shared encrypted-vault fields for SC-03 (AI-Secured Systems / VaultIQ). Both
 * tiers render THIS data. Each field is stored as ciphertext; the "reveal"
 * interactive moment decrypts it client-side — reinforcing that the platform
 * itself never held the plaintext (zero-knowledge). `stage` ties a field to a
 * beat (0 encrypt · 1 classify · 2 zero-knowledge).
 */
export interface VaultField {
  id: string;
  label: string;
  /** Ciphertext shown while locked. */
  cipher: string;
  /** Plaintext shown only after client-side reveal. */
  plain: string;
  stage: 0 | 1 | 2;
}

export const FIELDS: VaultField[] = [
  {
    id: "f0",
    label: "doc.title",
    cipher: "8a3f9c2e",
    plain: "Q3 Financials",
    stage: 0,
  },
  {
    id: "f1",
    label: "doc.class",
    cipher: "b1d47e90",
    plain: "CONFIDENTIAL",
    stage: 0,
  },
  {
    id: "f2",
    label: "doc.owner",
    cipher: "5c2a11bd",
    plain: "finance-team",
    stage: 1,
  },
  {
    id: "f3",
    label: "doc.region",
    cipher: "9e07f3a4",
    plain: "eu-west-1",
    stage: 1,
  },
  {
    id: "f4",
    label: "doc.retention",
    cipher: "3f6b8d05",
    plain: "7 years",
    stage: 2,
  },
  {
    id: "f5",
    label: "doc.status",
    cipher: "c290ab7f",
    plain: "ai-classified",
    stage: 2,
  },
];

/** 2-column grid geometry (shared by both tiers so layout matches). */
export const GRID_COLS = 2;

export function gridCell(index: number): { col: number; row: number } {
  return { col: index % GRID_COLS, row: Math.floor(index / GRID_COLS) };
}
