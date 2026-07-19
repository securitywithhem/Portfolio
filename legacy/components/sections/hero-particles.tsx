"use client";

import * as React from "react";

/**
 * Ambient particle field behind the Hero — decorative only (aria-hidden).
 *
 * Custom canvas instead of a particle library: the effect is ~60 slowly
 * drifting dots, which costs ~100 lines here versus tens of kilobytes of
 * client JS for tsparticles — the PRD's Lighthouse >95 target rules out a
 * heavy dependency for a background texture.
 *
 * Performance / accessibility contract:
 * - mounts after hydration (useEffect), so it can never block LCP;
 * - the rAF loop pauses when the tab is hidden, the hero is scrolled out
 *   of view, or the user prefers reduced motion — in the reduced-motion
 *   case a single static frame is drawn (texture without movement);
 * - dot color derives from the --primary token and is re-read when the
 *   theme class flips, so it stays on-system in both themes.
 */

const AREA_PER_PARTICLE = 22_000; // px² per dot — keeps the field sparse
const MAX_PARTICLES = 70;
const MAX_DRIFT = 0.25; // px per frame — ambient, not busy

interface Particle {
  x: number;
  y: number;
  dx: number;
  dy: number;
  r: number;
  alpha: number;
}

export function HeroParticles() {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let particles: Particle[] = [];
    let color = "";
    let frame = 0;
    let inView = true;
    let seededWidth = 0;

    const readColor = () => {
      color = getComputedStyle(document.documentElement)
        .getPropertyValue("--primary")
        .trim();
    };

    const drawFrame = () => {
      const { width, height } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = color;
      for (const p of particles) {
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Reseed only on real width changes — mobile browsers fire resize as
      // the URL bar collapses (height-only), and reseeding then would make
      // the whole field visibly jump mid-scroll.
      if (width !== seededWidth) {
        seededWidth = width;
        const count = Math.min(
          MAX_PARTICLES,
          Math.round((width * height) / AREA_PER_PARTICLE),
        );
        particles = Array.from({ length: count }, () => ({
          x: Math.random() * width,
          y: Math.random() * height,
          dx: (Math.random() - 0.5) * MAX_DRIFT * 2,
          dy: (Math.random() - 0.5) * MAX_DRIFT * 2,
          r: 0.8 + Math.random() * 1.2,
          alpha: 0.12 + Math.random() * 0.25,
        }));
      }
      drawFrame();
    };

    const step = () => {
      const { width, height } = canvas.getBoundingClientRect();
      for (const p of particles) {
        p.x = (p.x + p.dx + width) % width;
        p.y = (p.y + p.dy + height) % height;
      }
      drawFrame();
      frame = requestAnimationFrame(step);
    };

    const sync = () => {
      cancelAnimationFrame(frame);
      if (!document.hidden && inView && !reducedMotion.matches) {
        frame = requestAnimationFrame(step);
      } else {
        drawFrame();
      }
    };

    readColor();
    resize();
    sync();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    const intersection = new IntersectionObserver((entries) => {
      inView = entries[0]?.isIntersecting ?? true;
      sync();
    });
    intersection.observe(canvas);

    const themeObserver = new MutationObserver(() => {
      readColor();
      drawFrame();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    document.addEventListener("visibilitychange", sync);
    reducedMotion.addEventListener("change", sync);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersection.disconnect();
      themeObserver.disconnect();
      document.removeEventListener("visibilitychange", sync);
      reducedMotion.removeEventListener("change", sync);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 size-full"
    />
  );
}
