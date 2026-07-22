import { buildLattice } from "./lattice-geometry";

/**
 * Fallback tier: the same lattice, projected once to flat SVG at its resolved
 * end state. Reduced-motion, small-viewport and no-WebGL2 visitors get the
 * conclusion of the animation rather than a placeholder — the argument the
 * figure makes survives without WebGL.
 *
 * Built from the identical geometry module as the canvas, so the two tiers can
 * never drift apart.
 */

const VIEW = { w: 640, h: 420 };
const ROT_Y = 0.42;
const ROT_X = 0.1;
const SCALE = 44;

function project(x: number, y: number, z: number) {
  const cy = Math.cos(ROT_Y);
  const sy = Math.sin(ROT_Y);
  const rx = x * cy + z * sy;
  const rz = -x * sy + z * cy;
  const cx = Math.cos(ROT_X);
  const sx = Math.sin(ROT_X);
  const ry = y * cx - rz * sx;
  return {
    x: VIEW.w / 2 + rx * SCALE,
    // SVG y grows downward; negate so the lattice is not rendered upside down.
    y: VIEW.h / 2 - ry * SCALE,
  };
}

export function LatticeFallback() {
  const { lattice, edges } = buildLattice();

  const pts: { x: number; y: number }[] = [];
  for (let i = 0; i < lattice.length; i += 3) {
    pts.push(
      project(lattice[i] ?? 0, lattice[i + 1] ?? 0, lattice[i + 2] ?? 0),
    );
  }

  const segments: string[] = [];
  for (let e = 0; e < edges.length; e += 2) {
    const a = pts[edges[e] ?? 0];
    const b = pts[edges[e + 1] ?? 0];
    if (!a || !b) continue;
    segments.push(
      `M${a.x.toFixed(1)} ${a.y.toFixed(1)}L${b.x.toFixed(1)} ${b.y.toFixed(1)}`,
    );
  }

  return (
    <svg
      viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
      className="h-full w-full"
      aria-hidden
      focusable="false"
    >
      {/* Paper on the dark ink plate, at the same alphas the canvas tier uses —
          the two tiers are held in step by hand here as well as in geometry. */}
      <path
        d={segments.join("")}
        stroke="var(--paper)"
        strokeOpacity={0.16}
        strokeWidth={1}
        fill="none"
      />
      {pts.map((p, i) => (
        <circle
          key={i}
          cx={parseFloat(p.x.toFixed(1))}
          cy={parseFloat(p.y.toFixed(1))}
          r={1.6}
          fill="var(--paper)"
          fillOpacity={0.6}
        />
      ))}
    </svg>
  );
}
