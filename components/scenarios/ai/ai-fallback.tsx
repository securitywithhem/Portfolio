"use client";

import { motion, useReducedMotion } from "motion/react";
import { FIELDS, gridCell } from "./vault";

const PANEL_W = 42;
const PANEL_H = 24;
const COL_X = [6, 52];
const ROW_Y = [6, 34, 62];

/**
 * Fallback-tier environment for SC-03 — a grid of encrypted vault fields (no
 * WebGL), same data as the 3D scene. Reacts to the active beat and the "reveal"
 * moment (client-side decryption). Reduced-motion safe at the call site.
 */
export function AiFallback({
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
      aria-label="Encrypted vault: document fields stored as ciphertext, decrypted client-side on reveal."
    >
      {FIELDS.map((field, i) => {
        const { col, row } = gridCell(i);
        const x = COL_X[col] ?? 6;
        const y = ROW_Y[row] ?? 6;
        const reached = field.stage <= activeBeat;
        const revealed = traced && reached;

        return (
          <g key={field.id}>
            <rect
              x={x}
              y={y}
              width={PANEL_W}
              height={PANEL_H}
              rx={1}
              fill={revealed ? "var(--accent-soft)" : "var(--surface-2)"}
              stroke={reached ? "var(--accent)" : "var(--line-strong)"}
              strokeWidth={0.4}
            />
            {/* Field label */}
            <text
              x={x + 3}
              y={y + 6}
              className="font-mono"
              fontSize={2.4}
              fill={reached ? "var(--fg-muted)" : "var(--fg-dim)"}
            >
              {field.label}
            </text>
            {/* Lock indicator */}
            <text
              x={x + PANEL_W - 5}
              y={y + 6}
              className="font-mono"
              fontSize={2.6}
              fill={revealed ? "var(--accent)" : "var(--fg-dim)"}
            >
              {revealed ? "○" : "●"}
            </text>
            {/* Value: ciphertext (locked) or plaintext (revealed) */}
            <motion.text
              key={revealed ? "plain" : "cipher"}
              x={x + 3}
              y={y + 15}
              className="font-mono"
              fontSize={revealed ? 3.4 : 3}
              fill={revealed ? "var(--fg)" : "var(--fg-muted)"}
              initial={reduce ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={reduce ? { duration: 0 } : { duration: 0.25 }}
            >
              {revealed ? field.plain : field.cipher}
            </motion.text>
            {/* Byte-hint row under locked ciphertext */}
            {!revealed && (
              <text
                x={x + 3}
                y={y + 20}
                className="font-mono"
                fontSize={2}
                fill="var(--fg-dim)"
              >
                AES-256 · client-side
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
