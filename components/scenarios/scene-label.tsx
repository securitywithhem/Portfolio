"use client";

import { Html } from "@react-three/drei";
import type { Vector3 } from "three";

/**
 * A DOM-projected caption anchored to a 3D position (drei Html). Sits BELOW
 * the shape it labels (negative offsetY), not stamped on its face — reads as
 * an annotation, not a highlighter bar. Plain text with a shadow for
 * legibility (no background chip/border — that read as "redacted" against
 * bright surfaces). Uses the site's mono font, no asset, CSP-safe.
 */
export function SceneLabel({
  position,
  text,
  active,
  accent,
  offsetY,
}: {
  position: Vector3;
  text: string;
  active: boolean;
  accent: string;
  offsetY: number;
}) {
  return (
    <Html
      position={[position.x, position.y + offsetY, position.z]}
      center
      zIndexRange={[10, 0]}
      style={{ pointerEvents: "none" }}
    >
      <span
        style={{
          display: "inline-block",
          fontFamily: "var(--font-jetbrains-mono), monospace",
          fontSize: "10px",
          lineHeight: 1,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          whiteSpace: "nowrap",
          color: active ? accent : "#8a8a92",
          textShadow: "0 1px 3px rgba(0,0,0,0.9), 0 0 12px rgba(0,0,0,0.7)",
        }}
      >
        {text}
      </span>
    </Html>
  );
}
