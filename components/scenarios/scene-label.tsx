"use client";

import { Html } from "@react-three/drei";
import type { Vector3 } from "three";

/**
 * A DOM-projected label anchored to a 3D position (drei Html). Uses the site's
 * mono font — no font asset, CSP-safe — so 3D-tier viewers can read what each
 * node/block/panel is, matching the labels in the 2D fallback. Non-interactive
 * (pointerEvents: none) so it never blocks the scene's controls.
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
          fontFamily: "var(--font-jetbrains-mono), monospace",
          fontSize: "11px",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          whiteSpace: "nowrap",
          color: active ? accent : "#9a9aa2",
          textShadow: "0 1px 6px rgba(0,0,0,0.9)",
        }}
      >
        {text}
      </span>
    </Html>
  );
}
