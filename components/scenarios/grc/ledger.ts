/**
 * Shared hash-chained audit ledger for SC-02 (GRC & Compliance / Dharma). Both
 * tiers render THIS data. Each entry links to the previous by hash — the
 * tamper-evident chain. `stage` ties an entry to a beat (0 capture · 1 chain ·
 * 2 verify); the "trace" interactive moment verifies the chain top-to-bottom.
 *
 * `label` is the log-style entry name (2D fallback); `short` is a concise,
 * meaningful label used for the 3D floating tag (avoids overlap/clutter).
 */
export interface LedgerEntry {
  id: string;
  index: number;
  label: string;
  short: string;
  /** Short display hash. */
  hash: string;
  /** Hash of the previous entry (chain link); null for the genesis entry. */
  prevHash: string | null;
  stage: 0 | 1 | 2;
}

export const ENTRIES: LedgerEntry[] = [
  {
    id: "e0",
    index: 0,
    label: "policy.access.updated",
    short: "Access policy",
    hash: "a1f3",
    prevHash: null,
    stage: 0,
  },
  {
    id: "e1",
    index: 1,
    label: "control.mfa.enabled",
    short: "MFA enabled",
    hash: "7c2e",
    prevHash: "a1f3",
    stage: 0,
  },
  {
    id: "e2",
    index: 2,
    label: "evidence.scan.attached",
    short: "Scan evidence",
    hash: "b904",
    prevHash: "7c2e",
    stage: 1,
  },
  {
    id: "e3",
    index: 3,
    label: "risk.reviewed",
    short: "Risk reviewed",
    hash: "3d5a",
    prevHash: "b904",
    stage: 1,
  },
  {
    id: "e4",
    index: 4,
    label: "audit.verified",
    short: "Audit verified",
    hash: "e820",
    prevHash: "3d5a",
    stage: 2,
  },
];

export const ENTRY_COUNT = ENTRIES.length;
