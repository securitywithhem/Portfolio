# PRODUCT.md — Hem Gabhawala Portfolio (Immersive Scenario Edition)

> Locked decisions for the scenario rebuild. Equivalent of `/impeccable init`'s
> PRODUCT.md, authored directly because the impeccable command-suite is not
> installed in this environment (only the single `impeccable:impeccable` skill).
> Source of truth remains `/Docs/01–06`. This file summarizes, it does not
> override.

## Audience (in priority order)

1. **Recruiters / internship coordinators** — skim in <30s, often on mobile or
   constrained networks. They hit the **fallback tier**. Credibility must land
   without WebGL.
2. **Hiring managers** — want proof of real, concrete work (VAPT, GRC, AI
   security, cloud). Scenario payoff = linked project + GitHub/live.
3. **Security engineers** — will judge technical taste and precision. The
   industrial-telemetry aesthetic and honest data readouts are for them.

## Brand lane

**Technical-precision, not product-marketing.** Reads as a declassified
engineering console / aerospace telemetry, not a SaaS landing page. Explicitly
avoid: glassmorphism, gradient-as-decoration, soft rounded "friendly" cards,
hacker-movie/Matrix theatrics, animation spam.

## The one job

Make Hem's cybersecurity work **tangible** through scroll-driven scenario
storytelling — while staying fast, crawlable, and accessible on the fallback
tier that most of the audience actually sees.

## Non-negotiables (from PRD/TRD)

- Immersive 3D is **progressive enhancement, never a gate**. 100% content parity
  across 3D tier / fallback tier / server-rendered DOM.
- Lighthouse >95 on the fallback tier (SEO/A11y/Best-Practices target 100);
  best-effort >80 on the full 3D tier. <2s to first meaningful content.
- WCAG AA on **both** tiers independently, contrast-checked **per accent color**.
- Full keyboard + screen-reader path through every scenario's narrative beats
  **and** its interactive moment.
- `prefers-reduced-motion` is a hard override at the animation-call level, not
  just tier selection.

## Out of scope (v1)

Spatial/ambient audio · custom cursor / free-camera · light mode (Phase 6+ at
most) · any mini-game-scale interaction.
