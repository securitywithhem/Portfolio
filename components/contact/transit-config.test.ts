import { describe, expect, it } from "vitest";
import { buildTransit, LIMITS, RAIL_COUNT } from "./transit-config";

describe("buildTransit", () => {
  it("is deterministic, so server and client markup cannot diverge", () => {
    expect(buildTransit()).toEqual(buildTransit());
  });

  it("lays every rail inside the band", () => {
    const { rails } = buildTransit();
    expect(rails).toHaveLength(RAIL_COUNT);
    for (const rail of rails) {
      expect(rail.x).toBeGreaterThan(0);
      expect(rail.x).toBeLessThan(100);
    }
  });

  it("keeps rails in order and never overlapping", () => {
    // The jitter is bounded so channels stay distinguishable; if it ever grows
    // enough for two rails to cross, the field stops reading as parallel
    // channels and becomes noise.
    const xs = buildTransit().rails.map((r) => r.x);
    for (let i = 1; i < xs.length; i++) {
      expect(xs[i] ?? 0).toBeGreaterThan(xs[i - 1] ?? 0);
    }
  });

  it("assigns every packet to a real rail", () => {
    const { packets, rails } = buildTransit();
    expect(packets.length).toBeGreaterThanOrEqual(
      RAIL_COUNT * LIMITS.MIN_PACKETS,
    );
    expect(packets.length).toBeLessThanOrEqual(RAIL_COUNT * LIMITS.MAX_PACKETS);
    for (const p of packets) {
      expect(rails[p.rail]).toBeDefined();
    }
  });

  it("keeps lengths and durations inside their declared ranges", () => {
    for (const p of buildTransit().packets) {
      expect(p.length).toBeGreaterThanOrEqual(LIMITS.MIN_LENGTH);
      expect(p.length).toBeLessThanOrEqual(LIMITS.MAX_LENGTH);
      expect(p.duration).toBeGreaterThanOrEqual(LIMITS.MIN_DURATION);
      expect(p.duration).toBeLessThanOrEqual(LIMITS.MAX_DURATION);
    }
  });

  it("starts every packet mid-flight", () => {
    // Offsets become negative animation-delays. If any were 0 or 1 the band
    // would visibly switch on instead of already running.
    for (const p of buildTransit().packets) {
      expect(p.offset).toBeGreaterThan(0);
      expect(p.offset).toBeLessThan(1);
    }
  });

  it("spreads durations so the field never pulses in unison", () => {
    // Identical or near-identical durations make every rail sync up into a
    // visible beat. A wide spread is what keeps it reading as traffic.
    const ds = buildTransit().packets.map((p) => p.duration);
    expect(Math.max(...ds) - Math.min(...ds)).toBeGreaterThan(5);
  });
});
