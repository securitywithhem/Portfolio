# Design System — tokens, rules, and enforcement

Source of truth for every visual decision. Built in Phase 0.2, documented here
per Phase 1B. **Rule zero: never invent a value.** If a color, size, radius,
or duration isn't a token below, it doesn't ship — extend the token system
first, in a reviewed change.

## Where tokens live

| What                             | File                                             |
| -------------------------------- | ------------------------------------------------ |
| Colors, type scale, radii, glass | [styles/globals.css](../styles/globals.css)      |
| Motion presets (durations/easing)| [lib/motion.ts](../lib/motion.ts)                |
| Measured contrast ratios         | [styles/CONTRAST.md](../styles/CONTRAST.md)      |

Note: this project uses **Tailwind v4**, which is CSS-first — there is no
`tailwind.config.ts`. The `@theme` block in `globals.css` is the v4
equivalent; earlier planning docs that mention `tailwind.config.ts` are
superseded by this.

## Color tokens (oklch, theme-aware)

Semantic tokens defined for `:root` (light) and `.dark`. Components use the
semantic utility (`bg-background`, `text-primary`, `border-border`) — never a
raw hex/oklch value, never a raw Tailwind palette color (`bg-blue-600` is a
review-blocker).

| Token                     | Purpose                                        |
| ------------------------- | ---------------------------------------------- |
| `background / foreground` | Page surface and default text                  |
| `card / card-foreground`  | Elevated surfaces (also popover variants)      |
| `primary / primary-foreground` | Deep blue brand accent; CTAs, links, ring |
| `secondary / secondary-foreground` | Low-emphasis fills                    |
| `muted / muted-foreground`| Subdued surfaces and secondary text            |
| `accent / accent-foreground` | Hover washes, subtle highlights             |
| `destructive / destructive-foreground` | Errors, dangerous actions         |
| `border`, `input`, `ring` | Hairlines, form borders, focus ring            |

Why oklch: perceptually uniform lightness means dark-mode variants adjust one
axis predictably, and WCAG contrast tuning is deterministic rather than
guess-and-check (decision recorded in Phase 0.2).

**Contrast**: every foreground/surface pair passes WCAG AA (4.5:1+) in both
themes — measured ratios in [styles/CONTRAST.md](../styles/CONTRAST.md),
enforced continuously by `lib/design/contrast.test.ts`, which parses
`globals.css` in CI. Editing a token that breaks a pair fails the build.

## Typography

Geist Sans (display + body — single-family typography is the Apple/Vercel
idiom, and Geist is Vercel's own typeface) and Geist Mono for technical
accents. Both self-hosted via `next/font` (zero external requests, zero CLS).

Deliberate, limited scale — Tailwind defaults beyond it are removed:
`text-xs` `text-sm` `text-base` `text-lg` `text-xl` `text-2xl` `text-3xl`
`text-4xl` `text-6xl`. Intended roles are labeled on the
[/dev/tokens](../app/dev/tokens/page.tsx) showcase.

## Spacing & radius

- Spacing: Tailwind's default 4px modular scale (`--spacing: 0.25rem`) —
  deliberate decision, no custom steps; arbitrary values (`p-[13px]`) are
  banned.
- Radius: one scale from `--radius` (0.625rem): `rounded-sm|md|lg|xl`.

## Dark mode

Class strategy (`.dark` on `<html>`), toggled by next-themes with system
preference support and localStorage persistence; `suppressHydrationWarning` +
next-themes' inline script prevents flash of wrong theme.

## Glassmorphism

One utility: `.glass` (translucent card surface, 12px backdrop blur, soft
border). Reserved for floating surfaces — navbar, overlays. Not for every
card; no heavy shadows, no gradients, no neon (per 03_UI_UX.md and master
rules).

## Motion

Named presets only, from `lib/motion.ts`: `fadeUp`, `fadeIn`,
`staggerChildren`, `subtleHover` (+ `transitionBase`/`transitionFast`).
Inline variants or ad-hoc durations in components are a review-blocker.
Reduced motion is honored twice: `MotionConfig reducedMotion="user"` for
Framer Motion, and a global `prefers-reduced-motion` CSS rule for
CSS-driven animation.

## Accessibility

- Global `:focus-visible` ring from the `--ring` token (both themes);
  shadcn primitives render their own ring from the same token.
- All text/surface pairs AA-verified (see above).
- Keyboard operability is a per-component requirement checked at review.
