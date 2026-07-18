# Component architecture — conventions

Established in Phase 1C. Every later phase composes against this structure;
inventing a new top-level component folder is a review-blocker.

## Folders

| Folder                  | Contents                                                            | Client/Server                |
| ----------------------- | ------------------------------------------------------------------- | ---------------------------- |
| `components/ui/`        | shadcn primitives — generated, minimally edited                     | As generated                 |
| `components/providers/` | App-wide context providers (theme, motion)                          | Client (isolated leaves)     |
| `components/shared/`    | Cross-section reusable pieces (theme toggle, icon wrappers)         | Client only when interactive |
| `components/layout/`    | Structural pieces: `Container` now; header/footer arrive in Phase 2 | Server by default            |
| `components/sections/`  | Page sections (Hero, About, Projects…) — Phases 2–4                 | Server by default            |

Rules:

- **Server Components by default.** `"use client"` only where interactivity
  demands it, and as far down the tree as possible — providers and the theme
  toggle are client leaves; layout and pages stay server.
- **Data access** goes through `lib/data/` accessors only — no component
  imports from `/data` directly.
- **Design values** come from tokens only — see
  [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md).
- **shadcn primitives are not customized in place** beyond token alignment;
  behavior changes wrap the primitive in `shared/` instead of editing `ui/`.

## Composition over large components

Sections are assembled from primitives + shared pieces; one file per
responsibility. Example — the Phase 2 navbar is not one 300-line file:

```
components/layout/site-header.tsx     — server shell: <header> + Container
components/layout/nav-links.tsx       — link list (server)
components/layout/mobile-nav.tsx      — client: Sheet + trigger
components/shared/theme-toggle.tsx    — client: reused as-is
```

If a component needs its own state *and* substantial markup, split logic
from presentation before it grows past ~150 lines.
