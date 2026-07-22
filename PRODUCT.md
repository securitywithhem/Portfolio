# PRODUCT.md — Hem Gabhawala Portfolio

> Locked product context. `DESIGN.md` covers the visual system.
> Supersedes the "Immersive Scenario Edition" brief, which described a dark
> scenario-driven site that no longer exists.

## Register

**Brand** — design IS the product. This is a portfolio; a visitor's impression
is the thing being made. Not app UI, not a dashboard.

## Audience (in priority order)

1. **Recruiters / internship coordinators** — skim in under 40 seconds, often
   on a phone. They hit the fallback visual tier. Credibility must land without
   WebGL and without reading a paragraph.
2. **Hiring managers** — want concrete proof: real engagements, real systems,
   source where it exists.
3. **Security engineers** — judge technical taste. The measured contrast, the
   honest capability schematic and the absence of theatrics are for them.

## The one job

Get a recruiter from cold load to composing an email. Everything on the page is
either evidence for that or it is cut.

## Positioning

Offensive security (VAPT) practitioner moving into GRC and AI security. The
argument is the arc, not the inventory: an attacker's understanding of how
systems fail, applied to designing systems that don't. Three built platforms
are the proof it isn't theoretical.

## Brand lane

**Technical specimen.** Measured, precise, committed. One typeface shown across
its range; four surfaces; one accent used as a redline until it takes the whole
final plate.

Explicitly not: the dark-neon cyber portfolio (first-order cliché for this
field), and not the light editorial serif page (second-order cliché — display
serif + mono labels + hairline rules, which is where a previous version landed
and why it read as AI-made).

## Non-negotiables

- **WCAG AA on every plate**, contrast measured with `culori`, never estimated.
  Two real failures were caught this way; see DESIGN.md.
- **3D is progressive enhancement, never a gate.** Full content parity across
  the WebGL tier, the fallback tier and server-rendered DOM.
- `prefers-reduced-motion` is a hard override at the animation call site.
- Full keyboard path; the capability schematic carries a text description.
- Fast: `three` never enters the bundle for visitors who cannot use it.
- **No external resource requests.** Nothing hotlinked — an earlier version
  pulled its hero portrait from a template site, which CSP blocked in
  production anyway.

## Content rules

- `data/` is the single source of truth. Components import it directly; no
  component-local copies of skills, projects or credentials.
- Nothing on the page that isn't in `data/` or the résumé PDF.
- Two facts per project — what it is, how it's built. The "why it matters"
  argument runs once, on the Approach plate.

## Out of scope

Light/dark toggle · custom cursor · audio · blog · project detail pages ·
mini-game-scale interaction.
