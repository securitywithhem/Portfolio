# Hem Gabhawala — Cybersecurity Portfolio

Production-grade portfolio built with Next.js 15 (App Router), React 19,
TypeScript (strict), Tailwind CSS, shadcn/ui, and Framer Motion. Deployed on
Vercel. Source-of-truth documentation lives in [Docs/](Docs/).

## Getting started

```bash
npm install
cp .env.local.example .env.local   # fill in values as features require them
npm run dev
```

## Commands

| Command              | Purpose                                     |
| -------------------- | ------------------------------------------- |
| `npm run dev`        | Dev server (Turbopack)                      |
| `npm run build`      | Production build                            |
| `npm run start`      | Serve the production build                  |
| `npm run lint`       | ESLint (next/core-web-vitals + ts strict)   |
| `npm run format`     | Prettier write (`format:check` in CI)       |
| `npm run type-check` | `tsc --noEmit`                              |
| `npm run test`       | Vitest (single run; `test:watch` for watch) |

## Folder structure

| Folder                 | Purpose                                                        |
| ---------------------- | -------------------------------------------------------------- |
| `app/`                 | Next.js App Router routes, layouts, metadata                   |
| `components/ui/`       | shadcn/ui primitives (added in Phase 0.2)                      |
| `components/sections/` | Page sections (Hero, About, … — Phases 2–4)                    |
| `data/`                | Static typed content (profile, projects, certs — Phase 0.3)    |
| `lib/types/`           | TypeScript entity interfaces                                   |
| `lib/validations/`     | Zod schemas (build-time data validation + runtime form checks) |
| `lib/data/`            | Data access layer — the only sanctioned way to read `data/`    |
| `lib/utils/`           | Shared utilities                                               |
| `public/`              | Static assets                                                  |
| `styles/`              | `globals.css` — Tailwind + design tokens                       |
| `Docs/`                | PRD, TRD, UI/UX spec, implementation plan, backend schema      |

## Conventions

- **Env vars**: never read `process.env` directly — import `env` from
  [lib/env.ts](lib/env.ts). Every variable is declared there (Zod-validated)
  and mirrored in `.env.local.example`. `.env.local` is gitignored; no secrets
  are ever committed.
- **Commits**: Conventional Commits, enforced by commitlint via a `commit-msg`
  hook. Pre-commit runs lint-staged (ESLint + Prettier on staged files) and a
  full type-check.
- **Security headers**: baseline CSP ships Report-Only from
  [next.config.ts](next.config.ts); it is tightened and enforced in Phase 5.

## Known advisories

- `npm audit` reports a moderate advisory in the postcss copy bundled inside
  `next` (GHSA-qx2v-qp2m-jg93). The advisory's auto-fix is a breaking Next
  downgrade; the real fix arrives via a Next patch release (Dependabot is
  configured to pick it up).
