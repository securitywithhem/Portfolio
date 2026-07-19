# Product Requirements Document (PRD)

## Project

Hem Gabhawala — Cybersecurity Portfolio (Immersive Scenario Edition)

## Goal

Build a premium, recruiter-focused cybersecurity portfolio that uses
scroll-driven, scenario-based storytelling — inspired by Orano's
"Innovation" experience (Awwwards Developer Site of the Year 2018) —
to make technical work tangible instead of a static bullet list, while
remaining fast, accessible, and crawlable for a recruiter audience.

**Design philosophy for this revision:** the immersive layer is a
*progressive enhancement*, never a gate. Every scenario's content must
exist and be fully readable in the DOM without WebGL. Capable devices
get the full cinematic scene; everything else gets a fast, still-premium
fallback. This is the mechanism that lets us pursue Awwwards-tier craft
without sacrificing the PRD's original 30-second-credibility objective.

## Target Users

- Recruiters
- Hiring Managers
- Security Engineers
- Internship Coordinators

## Objectives

- Establish credibility in <30 seconds, even on the non-WebGL fallback path.
- Highlight practical cybersecurity work through interactive "scenarios"
  instead of flat lists.
- Showcase projects (VaultIQ, Dharma, Enterprise API Pentesting) as the
  narrative payoff of each scenario.
- Display certifications and TryHackMe achievements.
- Enable resume download and contact.
- Deliver at least one genuinely portfolio-differentiating interactive
  moment (the pentesting scenario) without compromising load performance.

## Core Pages / Experience Structure

- Home (Hero + entry into scenario flow)
- About
- **Scenarios** (replaces flat "Experience" + "Projects" split — see
  App Flow and Backend Schema for structure):
  1. Offensive Security (VAPT / Pentesting)
  2. GRC & Compliance (Dharma)
  3. AI-Secured Systems (VaultIQ)
  4. Cloud & Infrastructure (AWS)
- Certifications
- Skills
- Blog
- Contact

## Functional Requirements

- Responsive design, with an explicit non-WebGL/low-power/reduced-motion
  fallback path for every scenario (not just a graceful degrade — a
  designed, intentional alternate experience)
- Dark mode as the base UI (not a toggle — see UI/UX doc)
- Capability detection (WebGL support, device memory/GPU tier,
  `prefers-reduced-motion`) run once on load to select experience tier
- Resume download
- GitHub integration
- Contact form
- SEO (all scenario content must be server-rendered/crawlable regardless
  of which experience tier the visitor gets)
- Fast loading on the fallback tier; best-effort on the full 3D tier
- Accessibility (full keyboard + screen-reader path through every
  scenario's content, independent of the visual tier)

## Explicitly Out of Scope for v1

- Spatial/ambient audio design (deferred — high effort, low signal for
  this audience; revisit post-launch if desired)
- Custom cursor / drone-style free-camera exploration (Orano-specific;
  not relevant to a recruiter portfolio's goals)

## Success Metrics

- Lighthouse >95 on the **fallback tier** (this is the tier search
  crawlers and most recruiters on constrained networks/devices will hit)
- Lighthouse best-effort (target >80) on the **full 3D tier**
- <2s load time to first meaningful content, on either tier
- Mobile-first: mobile always gets the fallback tier by default
- Zero content that exists only inside the WebGL scene — 100% content
  parity between tiers, verified per scenario
