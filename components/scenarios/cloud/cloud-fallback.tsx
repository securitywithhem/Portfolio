"use client";

import { motion, useReducedMotion } from "motion/react";
import { NODES, EDGES, nodeById, inspectNode } from "./architecture";

const NODE_W = 18;
const NODE_H = 9;

/**
 * Fallback-tier environment for SC-04 — a cloud-architecture diagram (no WebGL),
 * same data as the 3D scene. Reacts to the active beat and the "inspect" moment
 * (focus the security node + surface its detail). Reduced-motion safe.
 */
export function CloudFallback({
  activeBeat,
  traced,
}: {
  activeBeat: number;
  traced: boolean;
}) {
  const reduce = useReducedMotion();
  const inspecting = traced;

  return (
    <svg
      viewBox="0 0 100 100"
      className="h-full w-full"
      role="img"
      aria-label="Cloud architecture: containerized services deployed on AWS behind least-privilege IAM."
    >
      {/* Edges */}
      {EDGES.map((e) => {
        const a = nodeById.get(e.from);
        const b = nodeById.get(e.to);
        if (!a || !b) return null;
        const reached = a.stage <= activeBeat && b.stage <= activeBeat;
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

      {/* Nodes */}
      {NODES.map((n) => {
        const reached = n.stage <= activeBeat;
        const isFocus = inspecting && n.inspect;
        return (
          <g key={n.id}>
            <rect
              x={n.x - NODE_W / 2}
              y={n.y - NODE_H / 2}
              width={NODE_W}
              height={NODE_H}
              rx={1}
              fill={isFocus ? "var(--accent-soft)" : "var(--surface-2)"}
              stroke={
                isFocus || reached ? "var(--accent)" : "var(--line-strong)"
              }
              strokeWidth={isFocus ? 0.7 : 0.4}
            />
            <text
              x={n.x}
              y={n.y + 1}
              textAnchor="middle"
              className="font-mono"
              fontSize={2.6}
              fill={reached ? "var(--fg)" : "var(--fg-muted)"}
            >
              {n.label}
            </text>
          </g>
        );
      })}

      {/* Inspect detail callout */}
      {inspecting && (
        <motion.g
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 2 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduce ? { duration: 0 } : { duration: 0.25 }}
        >
          <rect
            x={30}
            y={80}
            width={64}
            height={14}
            rx={1}
            fill="var(--surface)"
            stroke="var(--accent)"
            strokeWidth={0.4}
          />
          <text
            x={33}
            y={85.5}
            className="font-mono"
            fontSize={2.4}
            fill="var(--accent)"
          >
            INSPECT · {inspectNode.label}
          </text>
          <text
            x={33}
            y={90}
            className="font-mono"
            fontSize={2.2}
            fill="var(--fg-muted)"
          >
            {inspectNode.detail}
          </text>
        </motion.g>
      )}
    </svg>
  );
}
