# Implementation Plan

## Phase 1

- Initialize Next.js
- Tailwind
- shadcn/ui

## Phase 2

- Navbar
- Hero
- Footer

## Phase 2.5 — Scene Engine & Capability Detection POC (new — required gate)

This phase exists specifically to de-risk the immersive direction
before committing to building all four scenarios. Do not proceed to
Phase 3 until this phase's exit criteria are met.

- Build capability detection module (`/lib/capability`)
- Build ONE full scenario end-to-end, both tiers: **Offensive Security**
  (chosen because it maps most directly to your strongest, most
  concrete work — pentesting/VAPT)
  - Full tier: `@react-three/fiber` scene + GSAP ScrollTrigger
    choreography + one interactive moment
  - Fallback tier: Framer Motion illustrated equivalent, same
    narrative beats, same interactive moment via tap
- Measure actual bundle size and Lighthouse score for both tiers
- **Exit criteria (must pass before Phase 3):**
  - Fallback tier: Lighthouse >95, <2s load
  - Full tier: no hard blank/broken state on any tested device,
    acceptable load behavior (loading state shown, not a frozen page)
  - Content parity verified: everything in the 3D scene also exists,
    identically, in the fallback and in the server-rendered DOM
- If exit criteria fail: fall back to Option 2 (adapt the concept
  without WebGL) for the remaining three scenarios rather than
  forcing a struggling pattern four more times

## Phase 3

- About
- Skills
- Timeline

## Phase 4

- Remaining three Scenarios (GRC & Compliance, AI-Secured Systems,
  Cloud & Infrastructure), built to the pattern validated in Phase 2.5
- Certifications
- (Legacy "Experience" and "Projects" flat sections are absorbed into
  Scenarios per revised Backend Schema — do not rebuild them as
  separate sections)

## Phase 5

- GitHub API
- Contact Form
- SEO (verify structured data / crawlability against the
  server-rendered DOM specifically, independent of which visual tier
  a given crawler-simulated request resolves to)

## Phase 6

- Testing (including reduced-motion path, keyboard-only path, and
  low-end-device fallback path as explicit, separate test passes —
  not just desktop-Chrome-full-tier testing)
- Lighthouse (both tiers, per PRD success metrics)
- Deployment

## Deferred / Backlog (explicitly not in v1 scope)

- Spatial/ambient audio design
- Light mode
- Custom cursor / free-camera exploration
