# UI / UX Specification

## Design Language (revised)

**Change from previous version:** glassmorphism + light "Apple/Vercel
SaaS" aesthetic is replaced with a dark, precision-industrial aesthetic
inspired by Orano's Innovation site — while keeping the typographic
restraint and spacing discipline that made the Apple/Vercel reference
worth citing in the first place. Glassmorphism reads as
software-product-marketing; this portfolio needs to read as
technical-precision instead.

- Dark base UI (not a toggle — dark is now the *only* mode, no
  light-mode toggle, ever)
- Precision-grid / wireframe motifs as structural background elements
  (thin linework, topographic-style contour patterns — restrained, not
  decorative clutter)
- **Strict 4-token palette, identical across every section (Revision
  2 — replaces the per-scenario accent system below):**
  ```css
  --bg:        #0A0E14;  /* page background, deepest layer */
  --primary:   #E6EDF3;  /* headings, body text, primary iconography */
  --secondary: #3D5A80;  /* borders, dividers, muted text, grid lines */
  --accent:    #22D3EE;  /* CTAs, active nav state, links, glow/highlight */
  ```
  Tints/shades of `--bg` for surface elevation (cards, panels) are
  permitted and do not count as a 5th color. `--accent` is reserved for
  CTAs, active/hover states, and the interactive-moment glow — never a
  large fill area.
  **Accepted exception:** the "not yet reached" node/edge state inside
  each scenario's WebGL scene is hardcoded neutral grays rather than a
  CSS custom property, since three.js material props read a JS value,
  not CSS — the same constraint that already makes `ACCENT_HEX` a raw
  constant in `lib/accents.ts` (see that file for the full rationale).
  Pre-existing, not part of Revision 2's drift surface.
- Scenarios differentiate via icon + line motif + monospace tag, not
  color:
  - Offensive Security → crosshair/node-trace icon, `network-topology`
    linework, tag `TRACE://`
  - GRC & Compliance → chain-link/ledger icon, `audit-ledger`
    linework, tag `LEDGER://`
  - AI-Secured Systems → lock/shard icon, `encrypted-vault` linework,
    tag `VAULT://`
  - Cloud & Infrastructure → node-mesh icon, `cloud-architecture`
    linework, tag `GRID://`
- Monospace type (e.g. `JetBrains Mono` or `Space Mono`) for technical
  labels, data readouts, code references — paired with a clean sans
  (e.g. `Inter`) for body/narrative text. Two-typeface system max.
- No heavy shadows, no gradients-as-decoration — depth comes from the
  3D scenes themselves and from layering/contrast, not from CSS effects
- Sharp corners or minimal radius (2–4px) — avoid the soft/rounded
  "SaaS card" look entirely; this is part of what separates "precision"
  from "friendly product marketing"

## Two-Tier Rendering Model (new — core to this revision)

Every scenario section has two presentations of **identical content**:

1. **Full tier** — `@react-three/fiber` scene, scroll-scrubbed via
   GSAP ScrollTrigger, camera/scene state tied to scroll position,
   equipment/tools represented as interactive nodes the user can
   hover/tap for detail
2. **Fallback tier** — static or lightly-animated (Framer Motion)
   illustrated equivalent of the same scene, same narrative beats,
   same interactive detail-on-hover/tap behavior, no WebGL dependency

Design each scenario's fallback FIRST, as its own complete artifact —
not as an afterthought "what if 3D fails" state. The fallback is what
most visitors (mobile, reduced-motion, low-end devices, search
crawlers) will actually see.

## Sections

1. Hero
2. About
3. Journey Timeline
4. **Scenarios** (replaces separate "Experience" + "Projects" sections)
   - Offensive Security (VAPT/Pentesting)
   - GRC & Compliance (Dharma)
   - AI-Secured Systems (VaultIQ)
   - Cloud & Infrastructure (AWS)
5. Skills
6. Certifications
7. TryHackMe
8. GitHub
9. Blog
10. Contact

## Scenario Interaction Pattern

Each scenario follows the same interaction template (consistency across
four different visual environments is what keeps this navigable rather
than four unrelated experiences bolted together):

- Scroll-in: environment establishes (network topology / audit ledger /
  encrypted vault / cloud architecture)
- Scroll-through: 2–4 narrative beats reveal in sequence, each tied to
  a real accomplishment (e.g. "recon → exploit → report" for offensive
  security), matching `narrativeBeats[]` in the Backend Schema
- Interactive moment: one hover/tap/press interaction per scenario that
  lets the visitor "do" something small and relevant (e.g. trace a hash
  chain link in GRC, reveal an encrypted field in AI-Secured Systems) —
  Orano's "long press" / gamified-drone pattern, scaled down to
  something achievable and tasteful, not a mini-game
- Payoff: scenario resolves into the linked project card (VaultIQ /
  Dharma / Enterprise API Pentesting) with a clear link to detail/GitHub

## Animations

- Framer Motion for fallback-tier scenario animation and all
  non-scenario UI (nav, hero, cards, page transitions)
- GSAP ScrollTrigger exclusively for full-tier 3D scene choreography
  (kept separate from Framer Motion's responsibilities to avoid two
  animation engines fighting over the same DOM nodes)
- Smooth scrolling
- Hover interactions
- All animation respects `prefers-reduced-motion` — this is a hard
  requirement, not a nice-to-have, and is the same signal that routes
  visitors to the fallback tier at the scene level

## Accessibility

- WCAG AA minimum, on both rendering tiers independently
- Keyboard navigation through every scenario's narrative beats and
  interactive moment, not just through nav/links
- High contrast — recompute WCAG AA specifically for `--primary` on
  `--bg` and `--accent` on `--bg` (Revision 2 hex values); do not
  assume the prior per-scenario accent ratios still pass
- All scenario content available to screen readers via the
  server-rendered DOM regardless of which visual tier is active
