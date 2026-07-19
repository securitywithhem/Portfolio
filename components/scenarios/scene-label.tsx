"use client";

import { Html } from "@react-three/drei";
import type { Vector3 } from "three";

/**
 * A DOM-projected label anchored to a 3D position (drei Html). Uses the site's
 * mono font — no font asset, CSP-safe — so 3D-tier viewers can read what each
 * element is, matching the 2D fallback. A subtle background chip keeps labels
 * legible (and individually readable when they crowd). Non-interactive.
 */
export function SceneLabel({
  position,
  text,
  active,
  accent,
  offsetY = 0.62,
}: {
  position: Vector3;
  text: string;
  active: boolean;
  accent: string;
  offsetY?: number;
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
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          whiteSpace: "nowrap",
          color: active ? accent : "#c4c4cc",
          background: "rgba(10,10,11,0.72)",
          border: `1px solid ${active ? accent : "rgba(255,255,255,0.1)"}`,
          borderRadius: "2px",
          padding: "3px 6px",
        }}
      >
        {text}
      </span>
    </Html>
  );
}
