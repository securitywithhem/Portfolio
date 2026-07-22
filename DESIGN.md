# DESIGN.md — "Specimen"

> The live visual system. `styles/globals.css` is the implementation; this file
> explains the reasoning so the next change doesn't quietly undo it.
>
> Supersedes Design System v3 ("Industrial Telemetry"), which described a dark
> scenario-driven site that no longer exists.

## The one rule

**Surface separates sections. Nothing else needs to.**

The page runs `paper → ink → paper → paper-2 → paper-2 → oxblood`. Changing
the ground is what tells a visitor one section ended and another began.

This is load-bearing. An earlier version gave all six sections an identical
shell — same padding, same max-width, same alignment, one background — and
separated them with 1px rules. Nothing bifurcated; the page read as one
undifferentiated column. Every rule below follows from replacing hairlines with
surface.

## Banned, permanently

Not stylistic preferences. Each appeared in a previous version, and each is a
documented AI-generation tell:

- **Tiny uppercase tracked eyebrows above section headings.** Scaffolding you
  reach for when the layout can't separate itself. The surface change replaced
  it.
- **Numbered section markers** (`01 ·`, `02 ·`). Numbers earn a place only when
  the content genuinely is an ordered sequence.
- **Coloured side-stripe borders** (`border-left` > 1px as an accent).
  Decoration standing in for emphasis; use scale or ground instead.
- **Gradient text** (`background-clip: text`).
- **Cards, nested panels, pill/chip tags.** Boxing content adds a frame nobody
  asked for. The only bordered shapes on the site are the capability
  schematic's panels, which are nodes in a real topology.
- **One uniform scroll-reveal on every block.** The uniform reflex is the tell,
  not motion itself.
- **Display serif + small mono labels + ruled separators.** The
  "editorial-typographic" lane — the second-order AI reflex, and where v1
  landed.

## Type — one family, three registers

**Archivo**, variable: `wdth 62–125`, `wght 100–900`. No second family, no mono.

Width is the hierarchy device, which is the concept doing real work: a type
specimen shows one family across its range. Expanded for display, normal for
reading, condensed for data.

| Utility           | Axis                 | Size                          |
| ----------------- | -------------------- | ----------------------------- |
| `.type-statement` | `wdth 118, wght 700` | `clamp(2.75rem, 7vw, 6rem)`   |
| `.type-plate`     | `wdth 112, wght 600` | `clamp(2rem, 5vw, 3.75rem)`   |
| `.type-sub`       | `wdth 100, wght 600` | `clamp(1.5rem, 3vw, 2.25rem)` |
| `.type-body`      | `wdth 100, wght 400` | `1.0625rem`, max `68ch`       |
| `.type-data`      | `wdth 78, wght 500`  | `0.8125rem`                   |

Steps are ≥1.25 apart. Display ceiling is 6rem — above that the page is
shouting. Tracking floor is `-0.04em` — tighter and letters touch.

## Colour — committed, not restrained

Values are fixed. What matters is that they cover **surface**, not just accents.

| Plate   | Ground    | Text ramp                                          |
| ------- | --------- | -------------------------------------------------- |
| Paper   | `#faf9f7` | `--ink` / `--ink-muted` / `--ink-dim`              |
| Paper-2 | `#f2f0ec` | same                                               |
| Ink     | `#14151a` | `--on-ink` / `--on-ink-muted` / `--accent-on-dark` |
| Oxblood | `#4a1811` | `--on-close` / `--on-close-muted`                  |

The accent `#b4331f` is a **redline** — correction, emphasis, one mark per
plate. It is never a ground.

The closing plate is that redline's own hue taken to depth: OKLCH hue **30**
against the accent's **32**, darkened (L 0.29 vs 0.52) and desaturated
(C 0.078 vs 0.169). Related by construction, not by repetition.

**This is a correction, and the reason matters.** The closing plate was
originally a full-strength `--accent` drench. At chroma 0.169 across a whole
ground it was the loudest thing on the site and did not sit with the rest of the
palette. It also squeezed the typography: only two tiers cleared AA (5.81 and
4.76, with a third measuring 4.39 and failing). The depth buys headroom —
`--on-close-muted` clears 6.81:1, so the muted tier is genuinely muted rather
than a near-white pressed against the limit.

Consequence to preserve: **a dark plate's header wash must be tinted from that
plate's own ground.** A neutral `bg-ink/80` over oxblood composites to `#1f1618`,
0.075 below the plate in OKLCH lightness — it reads as a bar laid on top rather
than the surface dimmed. See `DARK_PLATE_WASH` in
`components/layout/site-header.tsx`.

### Contrast is measured, never estimated

Every text/ground pair is verified with `culori`'s `wcagContrast` at ≥4.5:1.
Not ceremony — measuring caught two real failures that reasoning missed:

- `--ink-dim` was originally `#8a8c96` → **3.18:1, failed**. Now `#6b6d79`.
- `--accent` on the ink plate → **2.98:1, failed**. Hence `--accent-on-dark`
  (`#e0563c`, 4.83:1). **The paper accent must never be used on a dark plate.**
- On vermilion only two tiers survive: `#f2d4ce` measures 4.39:1 and fails.

Re-run the gate after any colour change.

## Motion

Per-plate, never uniform:

- **Hero** — one choreographed staggered load. Transform-only, opacity stays 1:
  the `<h1>` is the LCP element and fading it in delays the largest paint.
- **Approach** — the lattice's scroll-driven resolve.
- **Work** — per-project stagger on scroll.
- **Credentials** — none, deliberately. Something has to stay still.
- **Contact** — the transit band runs continuously; the closing content
  staggers in behind it.

`prefers-reduced-motion` is a hard override at the call site
(`components/shared/reveal.tsx`), not a tier decision.

## The two visuals

Text-only pages are a failure mode, so the page carries two real visuals:

1. **The lattice** (`components/approach/`) — a scattered node graph resolving
   into an ordered lattice on scroll. Both states share one edge list, so the
   same graph reads as tangle, then structure. Light line-art on the ink plate.
   Gated by `lib/capability`: reduced-motion, <768px and no-WebGL2 get an SSR'd
   SVG of the resolved end state, and `three` stays out of their bundle.
2. **The capability arc** (`components/capability/arc-diagram.tsx`) — a
   schematic of offensive base → GRC + AI security, on an engineering
   substrate. Resolves entirely from `data/skills.ts`. Full SVG ≥768px; a
   stacked HTML variant below, so labels never scale under 12px.
3. **The transit band** (`components/contact/`) — the closing plate's right 30%.
   Vertical channels with short segments travelling down them: data in flight.
   Distinct from the lattice on purpose — that one is topology, this one is
   flow, and repeating the node-and-edge language would weaken both.

### The band must never have a coordinate system

**Rule: the band is built from positioned elements and percentages. No `svg`,
no `viewBox`, no `preserveAspectRatio`.**

This is the scar tissue from a real failure, recorded so it is not repeated. The
band originally held a guilloche — a square, radially symmetric engraving — in a
container that is 30% of the viewport wide and a full section tall. With
`preserveAspectRatio="slice"` the browser scales artwork to _cover_, so it was
rendered at section height and its width overflowed the band:

| Viewport | Band  | Artwork rendered | Visible | Cropped |
| -------- | ----- | ---------------- | ------- | ------- |
| 1440     | 432px | 1300px           | 33%     | 868px   |
| 1920     | 576px | 1400px           | 41%     | 824px   |

A third of the motif reached the screen, and because it also rotated, lines
swept in and out of that slot and read as broken. **A square motif and a tall
band are incompatible shapes, and no tuning reconciles them.** Percentages
resize with their container and cannot disagree with it, which is why the
replacement is CSS-only.

Two further constraints that must survive edits:

- **The band is reserved, never overlaid.** The content container carries
  `lg:pr-[34%]` so text never sits on the pattern. Below `lg` the band is not
  rendered at all.
- **Segments start mid-flight.** Offsets are applied as _negative_
  `animation-delay`, so the band is never seen filling from empty. Travel runs
  `-15% → 115%` so a segment fully clears the view before it loops, keeping the
  repeat invisible; timing is `linear`, because easing makes every rail pulse in
  unison.

Config is seeded and deterministic (`transit-config.ts`, the same pattern as the
lattice), so server and client markup cannot diverge.

## Anti-drift

Before shipping any visual change:

1. `npm run type-check && npm run lint && npm run test && npm run build`
2. Contrast gate over every pair in the colour table — ≥4.5:1, no exceptions.
3. Ban sweep: `eyebrow`, `border-l-2`, `border-r-2`, `background-clip`,
   `01`/`02` markers. Nothing outside comments.
4. Scroll the page and confirm four distinct grounds are visible. A visitor
   should be able to say where a section ends without reading a word.
