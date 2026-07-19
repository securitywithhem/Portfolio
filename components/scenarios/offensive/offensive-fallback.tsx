"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  NODES,
  EDGES,
  KILL_CHAIN,
  nodeById,
  edgeKey,
  KILL_CHAIN_EDGES,
} from "./topology";

/**
 * Fallback-tier environment for SC-01 — a 2D network topology (no WebGL). Same
 * graph as the 3D scene (shared topology.ts). Reacts to the active narrative
 * beat and to the "trace" interactive moment. Honors reduced-motion at the call
 * site: when reduced, states are shown statically with no draw/pulse.
 */
export function OffensiveFallback({
  activeBeat,
  traced,
}: {
  activeBeat: number;
  traced: boolean;
}) {
  const reduce = useReducedMotion();

  const killPoints = KILL_CHAIN.map((id) => {
    const n = nodeById.get(id);
    return n ? `${n.x},${n.y}` : "";
  }).join(" ");

  return (
    <svg
      viewBox="0 8 100 84"
      className="h-full w-full"
      role="img"
      aria-label="Network topology: recon foothold traced through an exploited node to a reported fix."
    >
      {/* Structural edges */}
      {EDGES.map((e) => {
        const a = nodeById.get(e.from);
        const b = nodeById.get(e.to);
        if (!a || !b) return null;
        const isKill = KILL_CHAIN_EDGES.has(edgeKey(e.from, e.to));
        const reached =
          isKill && (b.stage <= activeBeat || a.stage <= activeBeat);
        return (
          <line
            key={`${e.from}-${e.to}`}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke={reached ? "var(--accent)" : "var(--line-strong)"}
            strokeWidth={reached ? 0.5 : 0.3}
            opacity={reached ? 0.9 : 0.5}
          />
        );
      })}

      {/* Trace overlay — the interactive "kill chain" path */}
      {traced && (
        <motion.polyline
          points={killPoints}
          fill="none"
          stroke="var(--accent)"
          strokeWidth={0.9}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={
            reduce ? { duration: 0 } : { duration: 1, ease: "easeInOut" }
          }
        />
      )}

      {/* Nodes */}
      {NODES.map((n) => {
        const reached = n.stage <= activeBeat;
        const onChain = KILL_CHAIN.includes(n.id);
        const highlight = traced && onChain;
        const isCurrent = n.stage === activeBeat;
        return (
          <g key={n.id}>
            <motion.circle
              cx={n.x}
              cy={n.y}
              r={2.2}
              fill={highlight ? "var(--accent-soft)" : "var(--surface)"}
              stroke={reached ? "var(--accent)" : "var(--line-strong)"}
              strokeWidth={0.4}
              animate={
                reduce || !isCurrent ? { scale: 1 } : { scale: [1, 1.25, 1] }
              }
              transition={
                reduce || !isCurrent
                  ? undefined
                  : { duration: 1.6, repeat: Infinity, ease: "easeInOut" }
              }
              style={{
                transformOrigin: `${n.x}px ${n.y}px`,
                transformBox: "fill-box",
              }}
            />
            <text
              x={n.x}
              y={n.y - 3.4}
              textAnchor="middle"
              className="font-mono"
              fontSize={2.1}
              letterSpacing={0.2}
              fill={reached ? "var(--fg)" : "var(--fg-muted)"}
            >
              {n.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
