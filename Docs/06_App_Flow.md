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
About  (absorbs Journey Timeline as a compact horizontal strip inside
        this section, not its own full-height stop)
  ↓
Scenarios  (all 4 as ONE sticky horizontal carousel section, not 4
            stacked full-height scenes — scroll pins the section and
            progresses the carousel horizontally within the pinned
            range; same order, regardless of tier)
  1. Offensive Security       → payoff: Enterprise API Pentesting project
  2. GRC & Compliance         → payoff: Dharma project
  3. AI-Secured Systems       → payoff: VaultIQ project
  4. Cloud & Infrastructure   → payoff: AWS-cert-backed skills
  ↓
Proof of Work  (tabbed: [Skills] [Certifications] [TryHackMe]
                [GitHub] — shared layout shell, one scroll stop)
  ↓
Contact  (includes Resume Download; Blog link relocates to
          footer/nav — Blog stays a real route, not a scroll stop)
```

Six primary scroll stops total: Hero, About, Scenarios, Proof of Work,
Contact — plus Landing/Capability Detection ahead of Hero.

## Navigation

- Persistent fast-jump side nav (desktop) / bottom sheet or hamburger
  (mobile), linking to all 6 stops
- Smooth scrolling
- Active-section state shown via `--accent` on the side nav
- Scenario carousel has its own progress indicator (which of 4
  scenarios is active), plus horizontal keyboard nav (arrow keys) and
  swipe on touch — this replaces the old vertical per-scenario nav
  highlight, adapted from vertical to horizontal
- Nav behavior is identical on both tiers — navigation is never part
  of the 3D scene itself, it stays as reliable server-rendered UI at
  all times; fallback tier gets the same 6-stop structure and
  carousel-via-tap pattern, no content fork, only a rendering fork

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
