# Technical Requirements Document (TRD)

## Stack

### Core
- Next.js 15 (App Router, RSC by default)
- React 19
- TypeScript (strict mode)
- Tailwind CSS
- shadcn/ui
- Framer Motion (UI-level micro-interactions, page transitions,
  fallback-tier scenario animations)

### Immersive Scenario Layer (new)
- `@react-three/fiber` — Three.js as React components, keeps scenes
  composable and testable like the rest of the codebase
- `@react-three/drei` — helpers (loaders, controls, environment)
- `gsap` + `ScrollTrigger` — scroll-scrubbed scene choreography;
  Framer Motion alone cannot drive frame-by-frame 3D scene state off
  scroll position, GSAP is the right tool for this specific job
- `@react-three/postprocessing` — bloom / depth-of-field for the
  "sharp futuristic" visual target, used sparingly, per-scenario
- Draco + KTX2 compressed assets for any 3D geometry/textures, loaded
  through `useGLTF` with Suspense boundaries and explicit loading states

### Capability Detection (new — required, not optional)
A single client-side check run once on mount, before any 3D asset is
requested:
- WebGL2 support check
- `navigator.deviceMemory` / `hardwareConcurrency` heuristic for GPU/CPU
  tier (fallback if unavailable — assume low tier)
- `prefers-reduced-motion` media query — always forces fallback tier,
  no exceptions
- Viewport width — mobile (<768px) always forces fallback tier by
  default regardless of device capability, per PRD mobile-first mandate

Result of this check is stored once (React context) and determines
which component tree renders for each scenario: `<ScenarioScene3D />`
or `<ScenarioFallback />`. Both consume the *same* content data (see
Backend Schema) so there is no content fork, only a rendering fork.

### Explicitly excluded
- Howler.js / spatial audio (deferred per PRD — do not add as a
  dependency until this is revisited)
- Custom cursor libraries — adds complexity with limited payoff for a
  recruiter-facing site

## Deployment

- Vercel
- 3D assets (compressed .glb/.ktx2) served from Vercel's static
  asset pipeline or an edge-cached CDN bucket if they exceed
  reasonable repo size — decide per actual asset weight during
  Phase 2.5 POC

## APIs

- GitHub API
- EmailJS/Resend

## Folder Structure

```
/app
/components
  /ui              (shadcn primitives)
  /scenarios       (per-scenario 3D scene + fallback pairs)
  /shared
/data              (scenario, project, cert, experience JSON/TS)
/lib
  /capability      (device/WebGL detection)
/public
  /models          (compressed .glb/.ktx2)
/styles
```

## Performance

- SSR/RSC for all scenario content (text, structured data) regardless
  of rendering tier — the 3D scene is a client-only enhancement layered
  on top of server-rendered content, never a replacement for it
- Image optimization
- Lazy loading — 3D scene chunks load only when their scenario section
  approaches viewport (dynamic `import()`, not bundled into initial load)
- Code splitting per scenario — a visitor who never scrolls past
  Scenario 1 should never download Scenario 4's 3D assets
- Explicit bundle budget check in Phase 2.5 POC before building the
  remaining three scenarios: if one scene's JS+asset payload can't stay
  under an agreed threshold, the fallback tier becomes the default for
  more device classes, not just low-end ones

## Security

- CSP (note: relaxing CSP for any WebGL/shader inline scripts must be
  scoped as narrowly as possible — no blanket `unsafe-inline`)
- HTTPS
- Sanitized forms
- Rate limiting
