"use client";

import { motion, useReducedMotion } from "motion/react";
import { ENTRIES } from "./ledger";

const ROW_H = 15;
const GAP = 3;
const TOP = 6;

function rowY(index: number): number {
  return TOP + index * (ROW_H + GAP);
}

/**
 * Fallback-tier environment for SC-02 — a hash-chained audit ledger (no WebGL),
 * same data as the 3D scene. Reacts to the active beat and the "trace" moment
 * (verifying the chain top-to-bottom). Reduced-motion safe at the call site.
 */
export function GrcFallback({
  activeBeat,
  traced,
}: {
  activeBeat: number;
  traced: boolean;
}) {
  const reduce = useReducedMotion();

  return (
    <svg
      viewBox="0 0 100 100"
      className="h-full w-full"
      role="img"
      aria-label="Hash-chained audit ledger: each entry linked to the previous by cryptographic hash, verified top to bottom."
    >
      {ENTRIES.map((entry, i) => {
        const y = rowY(entry.index);
        const reached = entry.stage <= activeBeat;
        const verified = traced && reached;
        const link = entry.prevHash !== null;
        const prev = ENTRIES[i - 1];
        const linkReached =
          link && (reached || (prev ? prev.stage <= activeBeat : false));

        return (
          <g key={entry.id}>
            {/* Chain link to previous entry */}
            {link && (
              <line
                x1={16}
                y1={y - GAP}
                x2={16}
                y2={y}
                stroke={linkReached ? "var(--accent)" : "var(--line-strong)"}
                strokeWidth={0.6}
              />
            )}
            {/* Entry block */}
            <rect
              x={10}
              y={y}
              width={80}
              height={ROW_H}
              rx={1}
              fill={verified ? "var(--accent-soft)" : "var(--surface-2)"}
              stroke={reached ? "var(--accent)" : "var(--line-strong)"}
              strokeWidth={0.4}
            />
            {/* Hash chip */}
            <text
              x={14}
              y={y + 6}
              className="font-mono"
              fontSize={2.4}
              fill={reached ? "var(--accent)" : "var(--fg-dim)"}
            >
              #{entry.hash}
            </text>
            {/* Label */}
            <text
              x={14}
              y={y + 11}
              className="font-mono"
              fontSize={2.6}
              fill={reached ? "var(--fg)" : "var(--fg-muted)"}
            >
              {entry.label}
            </text>
            {/* Verify tick during trace */}
            {verified && (
              <motion.circle
                cx={84}
                cy={y + ROW_H / 2}
                r={1.6}
                fill="var(--accent)"
                initial={reduce ? { scale: 1 } : { scale: 0 }}
                animate={{ scale: 1 }}
                transition={
                  reduce
                    ? { duration: 0 }
                    : { delay: entry.index * 0.12, duration: 0.25 }
                }
              />
            )}
          </g>
        );
      })}
    </svg>
  );
}
