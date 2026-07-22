import { describe, expect, it } from "vitest";
import { buildLattice, GRID, POINT_COUNT, MAX_DELAY } from "./lattice-geometry";

describe("buildLattice", () => {
  it("produces matching buffers for both states", () => {
    const { scatter, lattice, delays } = buildLattice();
    expect(scatter).toHaveLength(POINT_COUNT * 3);
    expect(lattice).toHaveLength(POINT_COUNT * 3);
    expect(delays).toHaveLength(POINT_COUNT);
  });

  it("is deterministic, so the scatter cannot differ across hydration", () => {
    const a = buildLattice();
    const b = buildLattice();
    expect(Array.from(a.scatter)).toEqual(Array.from(b.scatter));
  });

  it("keeps every delay inside the window the morph budgets for", () => {
    // The canvas divides by (1 - MAX_DELAY); a delay at or past that bound
    // would leave points that never finish resolving at progress 1.
    const { delays } = buildLattice();
    for (const d of delays) {
      expect(d).toBeGreaterThanOrEqual(0);
      expect(d).toBeLessThan(MAX_DELAY);
    }
  });

  it("emits in-range edge indices only", () => {
    const { edges } = buildLattice();
    expect(edges.length % 2).toBe(0);
    for (const i of edges) expect(i).toBeLessThan(POINT_COUNT);
  });

  it("connects the lattice with the expected axis-aligned edge count", () => {
    const { edges } = buildLattice();
    const expected =
      (GRID.x - 1) * GRID.y * GRID.z +
      GRID.x * (GRID.y - 1) * GRID.z +
      GRID.x * GRID.y * (GRID.z - 1);
    expect(edges.length / 2).toBe(expected);
  });

  it("centres the resolved lattice on the origin", () => {
    // The camera looks at the origin, so an off-centre lattice would sit
    // visibly off-frame at the end of the scroll.
    const { lattice } = buildLattice();
    for (let axis = 0; axis < 3; axis++) {
      let sum = 0;
      for (let i = axis; i < lattice.length; i += 3) sum += lattice[i] ?? 0;
      expect(Math.abs(sum / POINT_COUNT)).toBeLessThan(1e-5);
    }
  });
});
