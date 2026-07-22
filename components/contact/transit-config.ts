/**
 * Layout data for the closing plate's transit band: vertical channels with
 * short segments travelling down them, read as data in transit.
 *
 * There is deliberately no coordinate system here — no viewBox, no artwork
 * dimensions, only percentages and seconds. The motif this replaced was a
 * square rosette rendered into a tall narrow band, where `preserveAspectRatio`
 * scaled it to cover and cropped roughly two thirds of it away. Percentages
 * cannot mismatch their container, so that failure is impossible by
 * construction rather than by tuning.
 *
 * Values are seeded, matching the approach in `lattice-geometry.ts`, so server
 * and client render identical markup.
 */

/** Deterministic PRNG — identical rails on every render, no hydration drift. */
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

export const RAIL_COUNT = 9;

/** Packets per rail varies so the field never reads as a regular grid. */
const MIN_PACKETS = 2;
const MAX_PACKETS = 3;

/** Seconds for one traverse. Wide spread is what stops the field pulsing. */
const MIN_DURATION = 9;
const MAX_DURATION = 22;

/** Segment length as a percentage of band height. */
const MIN_LENGTH = 4;
const MAX_LENGTH = 11;

export interface Rail {
  /** Horizontal position across the band, 0–100. */
  x: number;
}

export interface Packet {
  /** Index into `rails`. */
  rail: number;
  /** Length as a percentage of band height. */
  length: number;
  /** Seconds for one full traverse. */
  duration: number;
  /**
   * Progress through the loop at first paint, 0–1.
   *
   * Applied as a NEGATIVE animation-delay so every segment is already in
   * flight when the band appears. Starting them all at zero would show the
   * band filling from empty — a visible "switching on" moment, which is the
   * same category of ugliness this component exists to remove. Under reduced
   * motion the same value places the segment statically.
   */
  offset: number;
}

export interface TransitConfig {
  rails: Rail[];
  packets: Packet[];
}

export function buildTransit(): TransitConfig {
  const rand = mulberry32(0x7ac);
  const rails: Rail[] = [];
  const packets: Packet[] = [];

  for (let i = 0; i < RAIL_COUNT; i++) {
    // Even spacing with a small jitter — a perfectly regular comb reads as a
    // texture swatch; slight irregularity reads as channels.
    const base = ((i + 0.5) / RAIL_COUNT) * 100;
    const jitter = (rand() - 0.5) * (100 / RAIL_COUNT) * 0.45;
    rails.push({ x: Number((base + jitter).toFixed(2)) });

    const count =
      MIN_PACKETS + Math.floor(rand() * (MAX_PACKETS - MIN_PACKETS + 1));
    for (let p = 0; p < count; p++) {
      packets.push({
        rail: i,
        length: Number(
          (MIN_LENGTH + rand() * (MAX_LENGTH - MIN_LENGTH)).toFixed(2),
        ),
        duration: Number(
          (MIN_DURATION + rand() * (MAX_DURATION - MIN_DURATION)).toFixed(2),
        ),
        offset: Number(rand().toFixed(4)),
      });
    }
  }

  return { rails, packets };
}

export const LIMITS = {
  MIN_PACKETS,
  MAX_PACKETS,
  MIN_DURATION,
  MAX_DURATION,
  MIN_LENGTH,
  MAX_LENGTH,
} as const;
