# Progress Tracker

Living status of the build. Keep in sync with
[build-plan.md](build-plan.md). Update the row whenever work moves.

Legend: ✅ done · 🟡 in progress · ⬜ not started

_Last updated: 2026-06-24_

## Phase 0 — Shell

| Item                                     | Status |
| ---------------------------------------- | ------ |
| Repo conventions + folder structure      | ✅     |
| CI/CD (lint, typecheck, test, build)     | ✅     |
| Docker + compose                         | ✅     |
| Security baseline + ASVS checklist docs  | ✅     |
| Env contract docs                        | ✅     |
| Health endpoint                          | ✅     |
| Agent docs (`docs/agent/*`, `AGENTS.md`) | ✅     |

## Phase 1 — Foundations

| Item                                                   | Status |
| ------------------------------------------------------ | ------ |
| Design system: tokens (Editorial Split), fonts, grain  | ✅     |
| Motion infra (Lenis smooth-scroll + GSAP Reveal)       | ✅     |
| UI primitives (`cn`, `Button`, form controls, `Field`) | ✅     |
| Env schema wired for required services                 | ⬜     |
| Neon + Drizzle connection                              | ⬜     |
| `leads` / `users` schema                               | ⬜     |
| Logger + Sentry/OTel verified                          | ⬜     |

## Phase 2 — Public + Leads

| Item                                          | Status |
| --------------------------------------------- | ------ |
| `(public)` layout + site header/footer        | ✅     |
| Landing page (hero, stats, services, CTA)     | ✅     |
| Pages: about, services, universities, contact | ✅     |
| Legal pages: privacy, terms                   | ✅     |
| Contact form + `/api/contact` (validate+log)  | ✅     |
| Lead capture action → DB                      | ⬜     |
| Rate limiting on public mutations             | ⬜     |
| Confirmation email                            | ⬜     |

## Phase 3 — Auth + Admin

| Item                            | Status |
| ------------------------------- | ------ |
| Better Auth + Google OAuth      | ⬜     |
| `(auth)` pages                  | ⬜     |
| `(admin)` shell + session guard | ⬜     |
| Admin leads list/detail         | ⬜     |

## Phase 4 — Admissions

| Item                              | Status |
| --------------------------------- | ------ |
| Admissions model + workflow       | ⬜     |
| Applicant status views            | ⬜     |
| Background jobs (QStash/Workflow) | ⬜     |

## Phase 5 — Messaging

| Item                    | Status |
| ----------------------- | ------ |
| SMS (Arkesel)           | ⬜     |
| WhatsApp (Meta/Arkesel) | ⬜     |
| Newsletter publish      | ⬜     |

## Phase 6 — Bot

| Item                               | Status |
| ---------------------------------- | ------ |
| AI assistant (Vercel AI SDK)       | ⬜     |
| Guardrails + rate limits + logging | ⬜     |

## Phase 7 — Hardening

| Item                      | Status |
| ------------------------- | ------ |
| e2e + a11y coverage       | ⬜     |
| Load tests                | ⬜     |
| ASVS L2 pass + knip clean | ⬜     |

## Decision Log

- 2026-06-24 — Pinned `eslint` to 9.39.4 (ESLint 10 breaks the React plugin
  pulled by `eslint-config-next`); keeps CI reproducible until the plugin
  ecosystem catches up.
- 2026-06-24 — `.agents/` and `skills-lock.json` gitignored (local agent
  tooling, not app scaffold). Committed agent docs live in `docs/agent/`.
- 2026-06-24 — Upgraded system Node from 22.15.0 to **24.18.0 LTS**
  (`OpenJS.NodeJS.LTS` via winget) to match `engines`, `.nvmrc`, and Docker.
  pnpm 11.9.0 is run via Corepack (`corepack pnpm …`); shims are not installed
  to Program Files (no admin), which is expected.
- 2026-06-24 — Removed deprecated `baseUrl` from `tsconfig.json` (TS 6 errors on
  it; `paths` still resolve under `moduleResolution: "bundler"`).
- 2026-06-24 — `playwright.config.ts`: replaced `webServer`/`workers` ternaries
  that assigned `undefined` with conditional spreads, required by
  `exactOptionalPropertyTypes`.
- 2026-06-24 — Verified full toolchain green on Node 24: `format:check`, `lint`,
  `typecheck`, `test`, `build` all pass, and `/api/health` returns
  `200 {"ok":true,"service":"sacs-study-abroad"}`.

## Related Docs

- [build-plan.md](build-plan.md)
- [project-overview.md](project-overview.md)
