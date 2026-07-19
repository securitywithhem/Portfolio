# Application Flow

## Entry & Tier Selection (new — happens before any scenario renders)

```
Landing
  ↓
Capability Detection (WebGL support, device tier,
                       prefers-reduced-motion, viewport width)
  ↓
Tier Decision: Full 3D  |  Fallback
  (decision is made once, cached for the session — not re-evaluated
   per scenario, to avoid a jarring tier switch mid-scroll)
  ↓
Hero
  ↓
About
  ↓
Journey Timeline
  ↓
Scenarios (4, in sequence — same order regardless of tier)
  1. Offensive Security       → payoff: Enterprise API Pentesting project
  2. GRC & Compliance         → payoff: Dharma project
  3. AI-Secured Systems       → payoff: VaultIQ project
  4. Cloud & Infrastructure   → payoff: AWS-cert-backed skills
  ↓
Skills
  ↓
Certifications
  ↓
TryHackMe
  ↓
GitHub
  ↓
Blog
  ↓
Contact
  ↓
Resume Download
```

## Navigation

- Sticky navbar
- Smooth scrolling
- Active section highlight, including per-scenario highlight (nav
  should indicate which of the 4 scenarios is currently in view, not
  just "Scenarios" as one lump section)
- Nav behavior is identical on both tiers — navigation is never part
  of the 3D scene itself, it stays as reliable server-rendered UI at
  all times

## User Journey

Recruiter lands → capability check silently selects experience tier →
views hero → scrolls through scenario narrative (recon → exploit →
report, or equivalent per scenario) → reaches project payoff card →
validates via GitHub/live link → checks certifications → downloads
resume → contacts candidate.

## Fallback-Tier User Journey (explicit, not assumed)

Same sequence, same content, same interactive moments (via tap instead
of hover/scroll-scrub) — the only difference is the environment is a
static/lightly-animated illustration instead of a scroll-scrubbed 3D
scene. A recruiter on this path should not perceive the site as a
"lesser version" — it should read as a deliberate, complete design,
not a degraded one.
