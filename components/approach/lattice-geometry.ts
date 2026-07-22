/**
 * Geometry for the Approach set piece: a scattered node cloud that resolves
 * into an ordered lattice as the section scrolls.
 *
 * The two states share one edge list, defined by lattice adjacency. That is the
 * whole trick — in the scattered state those same edges read as an incoherent
 * tangle, and they resolve into clean structure without anything being added or
 * removed. Break and build are the same graph, differently arranged.
 *
 * All randomness is seeded so the scatter is identical on every render and on
 * both sides of hydration.
 */

export const GRID = { x: 9, y: 5, z: 4 } as const;
const SPACING = 1.45;
const SCATTER_RADIUS = 9.5;

export const POINT_COUNT = GRID.x * GRID.y * GRID.z;

/** Deterministic PRNG — same scatter every load, no hydration divergence. */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export interface LatticeData {
  /** Chaotic start state — xyz triples. */
  scatter: Float32Array;
  /** Ordered end state — xyz triples. */
  lattice: Float32Array;
  /** Edge index pairs, shared by both states. */
  edges: Uint16Array;
  /** Per-point morph delay in 0..MAX_DELAY, so structure resolves in a sweep. */
  delays: Float32Array;
}

export const MAX_DELAY = 0.42;

export function buildLattice(): LatticeData {
  const rand = mulberry32(0x5ec);
  const lattice = new Float32Array(POINT_COUNT * 3);
  const scatter = new Float32Array(POINT_COUNT * 3);
  const delays = new Float32Array(POINT_COUNT);

  const offX = ((GRID.x - 1) * SPACING) / 2;
  const offY = ((GRID.y - 1) * SPACING) / 2;
  const offZ = ((GRID.z - 1) * SPACING) / 2;

  const index = (ix: number, iy: number, iz: number) =>
    ix + iy * GRID.x + iz * GRID.x * GRID.y;

  for (let iz = 0; iz < GRID.z; iz++) {
    for (let iy = 0; iy < GRID.y; iy++) {
      for (let ix = 0; ix < GRID.x; ix++) {
        const i = index(ix, iy, iz);
        lattice[i * 3] = ix * SPACING - offX;
        lattice[i * 3 + 1] = iy * SPACING - offY;
        lattice[i * 3 + 2] = iz * SPACING - offZ;

        // Scatter: rejection-free spherical sampling, biased outward so the
        // start state reads as genuinely dispersed rather than a fuzzy ball.
        const theta = rand() * Math.PI * 2;
        const phi = Math.acos(2 * rand() - 1);
        const r = SCATTER_RADIUS * (0.35 + 0.65 * Math.cbrt(rand()));
        scatter[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        scatter[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6;
        scatter[i * 3 + 2] = r * Math.cos(phi) * 0.5;

        // Sweep left-to-right so the resolve has a direction the eye can read.
        delays[i] =
          (ix / (GRID.x - 1)) * MAX_DELAY * 0.8 + rand() * MAX_DELAY * 0.2;
      }
    }
  }

  const edgeList: number[] = [];
  for (let iz = 0; iz < GRID.z; iz++) {
    for (let iy = 0; iy < GRID.y; iy++) {
      for (let ix = 0; ix < GRID.x; ix++) {
        const i = index(ix, iy, iz);
        if (ix + 1 < GRID.x) edgeList.push(i, index(ix + 1, iy, iz));
        if (iy + 1 < GRID.y) edgeList.push(i, index(ix, iy + 1, iz));
        if (iz + 1 < GRID.z) edgeList.push(i, index(ix, iy, iz + 1));
      }
    }
  }

  return { scatter, lattice, edges: Uint16Array.from(edgeList), delays };
}
