# DESIGN.md — Design System v3 (Industrial Telemetry)

> Locked visual system for the scenario rebuild. Direction set with
> `taste-skill:brutalist-skill` (Tactical Telemetry / dark archetype), tempered
> by the typographic + spacing restraint the docs inherit from Apple/Linear/
> Vercel. Where the skill and `/Docs/03_UI_UX.md` conflict, **the docs win** —
> divergences are noted explicitly below.

## Archetype

**Tactical Telemetry (dark).** Deactivated-CRT substrate, white-phosphor
foreground, monospace telemetry, blueprint grid, visible 1px compartmentalization.
Restraint over theatrics — the precision grid is _structure_, not decoration.

## Deliberate divergences from the brutalist skill (docs override)

1. **Four per-scenario accents**, not the skill's single-red rule
   (`03_UI_UX.md` mandates one accent per scenario).
2. **2px radius ceiling**, not the skill's absolute 90° corners
   (`03_UI_UX.md` allows 2–4px).
3. **Whisper-level analog effects** — no CRT scanline wash, no heavy grain,
   no ASCII clutter as decoration. Docs forbid Matrix clichés / animation spam.

## Color (dark substrate — the only mode at launch)

| Token           | Value     | Use                                       |
| --------------- | --------- | ----------------------------------------- |
| `--bg`          | `#0A0A0B` | Base (deactivated CRT — never pure black) |
| `--surface`     | `#111113` | Raised compartments / cards               |
| `--surface-2`   | `#17171A` | Nested / hover surface                    |
| `--fg`          | `#EAEAEA` | Primary text (white phosphor)             |
| `--fg-muted`    | `#8A8A90` | Metadata, secondary                       |
| `--fg-dim`      | `#5A5A60` | Tertiary / disabled                       |
| `--line`        | `#232327` | Hairline borders / grid                   |
| `--line-strong` | `#333338` | Emphasized dividers                       |

### Per-scenario accents (WCAG-AA checked on `--bg` in Phase where each ships)

| Scenario               | Slug        | Accent           | Hex (base) |
| ---------------------- | ----------- | ---------------- | ---------- |
| Offensive Security     | `red-amber` | hazard red-amber | `#FF5A1F`  |
| GRC & Compliance       | `blue`      | signal blue      | `#3B9EFF`  |
| AI-Secured Systems     | `violet`    | violet           | `#9B7BFF`  |
| Cloud & Infrastructure | `teal`      | teal             | `#2DD4BF`  |

Global default accent = **red-amber** (offensive security is the flagship / first
scenario and Hem's strongest work). Each accent also needs a
`-on` foreground pair and a low-alpha `-soft` fill; locked per scenario when it
ships, against WCAG AA — **not** assumed here.

## Typography (two-typeface max)

- **Inter** (`--font-sans`) — narrative body, headings. Weights 400/500/600/800.
- **JetBrains Mono** (`--font-mono`) — technical labels, data readouts, nav,
  metadata, coordinates, unit IDs. Uppercase + generous tracking for metadata.

Scale: fluid `clamp()` for macro display type; fixed small (0.72–0.875rem) for
mono telemetry. Tight tracking (−0.02 to −0.04em) + compressed leading on
display; generous tracking (0.06–0.1em) uppercase on mono metadata.

## Geometry & depth

- Radius: **2px** ceiling (`--radius`). No soft SaaS cards.
- Depth from **layering + 1px hairlines + contrast**, not shadows or gradients.
- Blueprint grid: thin `--line` linework, `+` crosshairs at intersections used
  sparingly as structural markers.

## Motion (Framer Motion for UI; GSAP ScrollTrigger for 3D only)

- Entrances ease-out, exits ease-in, ease-in-out only for on-screen A→B moves.
- **Never linear** on UI. Micro-interactions ≤300ms. Scroll-scrubbed scene
  choreography is exempt (position-driven, not timed).
- `prefers-reduced-motion` disables at the call site, everywhere.

## Reference bar (spacing/typography/polish only — do not copy layouts)

Apple · Stripe · Linear · Vercel · Raycast · Arc.
