"use client";

import { useReducedMotion } from "motion/react";
import { buildTransit } from "./transit-config";

const { rails, packets } = buildTransit();

/**
 * The transit band down the right edge of the closing plate — vertical channels
 * with short segments moving down them, read as data in flight.
 *
 * Built from positioned elements and percentages, with NO svg, NO viewBox and
 * NO preserveAspectRatio. That is the whole design constraint, not an
 * implementation detail: the motif this replaced was square artwork scaled to
 * cover a tall narrow band, which cropped about two thirds of it off-screen.
 * Percentages resize with their container and cannot disagree with it, so the
 * band is correct at every width by construction.
 *
 * Everything animates on transform alone, and the segments are hard-edged
 * rather than gradient-faded — crisp dashes match the site's line-art language,
 * and the design system bans gradient-as-decoration.
 */
export function TransitRails() {
  const reduce = useReducedMotion();

  return (
    <div
      className="relative h-full w-full"
      style={{
        // Rails fade out at both ends instead of stopping dead against the
        // section edges. A mask, not a decorative gradient.
        maskImage:
          "linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)",
      }}
    >
      {rails.map((rail, i) => (
        <span
          key={i}
          className="absolute top-0 bottom-0 w-px bg-on-close opacity-[0.07]"
          style={{ left: `${rail.x}%` }}
        />
      ))}

      {packets.map((packet, i) => {
        const rail = rails[packet.rail];
        if (!rail) return null;

        return (
          /*
           * The travelling element is this FULL-HEIGHT carrier, not the segment
           * inside it. A percentage translateY resolves against the element's
           * own height, so animating the segment directly would move an
           * 8%-tall dash by 8% of itself — a few pixels. The carrier spans the
           * band, so its 100% is the band's height and the segment crosses the
           * whole thing.
           */
          <span
            key={i}
            className="absolute top-0 bottom-0 w-px"
            style={{
              left: `${rail.x}%`,
              ...(reduce
                ? // Still, but still composed: the same offset that drives the
                  // loop places the segment, so the field keeps its rhythm.
                  {
                    transform: `translateY(${(packet.offset * 100).toFixed(1)}%)`,
                  }
                : {
                    animation: `transit-fall ${packet.duration}s linear infinite`,
                    // Negative delay starts the loop already in progress, so
                    // the band is never seen filling up from empty.
                    animationDelay: `-${(packet.offset * packet.duration).toFixed(2)}s`,
                  }),
            }}
          >
            <span
              className="absolute top-0 left-0 w-px bg-on-close opacity-[0.26]"
              style={{ height: `${packet.length}%` }}
            />
          </span>
        );
      })}
    </div>
  );
}
