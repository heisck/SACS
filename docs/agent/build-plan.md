# Build Plan

Phased roadmap from the current shell to a working platform. Each phase is
shippable and gated by `pnpm ci`. Track live status in
[progress-tracker.md](progress-tracker.md).

## Phase 0 — Shell (done)

Infrastructure, conventions, CI/CD, Docker, security baseline, env contract,
health endpoint. No product features.

## Phase 1 — Foundations

- Validate and wire env schema for required services.
- Neon connection + Drizzle setup in `src/server/db`.
- First `db/schema` tables: `leads`, `users`.
- Logger + Sentry/OTel confirmed working end to end.
- UI primitives: `cn()`, `Button`, form controls, `Field` (see
  [ui-registry.md](ui-registry.md)).

## Phase 2 — Public + Leads

- `(public)` marketing site: home, about (mission/vision), services
  (university selection, scholarships, applications, SOP, visa coaching,
  pre-departure), and contact.
- Lead/consultation request form → server action (`next-safe-action` + Zod) →
  `leads` table (capture intended degree: Master's/PhD, field, target country).
- Rate limiting via Upstash on public mutations.
- Confirmation email via Resend + React Email.

## Phase 3 — Auth + Admin

- Better Auth with Google OAuth in `src/server/auth`.
- `(auth)` sign-in / callback pages.
- `(admin)` shell with session guard for SACS counselors/staff.
- Admin leads list + detail (assign counselor, track status).

## Phase 4 — Admissions & Advisory

- Admissions data model and workflow states reflecting the SACS service
  pipeline: enquiry → university shortlist → application prep → SOP review →
  scholarship applications → interview prep → visa → pre-departure.
- Applicant-facing status views so students see where they are in the journey.
- Document handling for SOPs and application materials.
- Background jobs via QStash/Workflow for deadline reminders and follow-ups.

## Phase 5 — Messaging

- SMS via Arkesel integration (`sendSms`).
- WhatsApp via Meta Cloud API / Arkesel (`sendWhatsAppTemplate`,
  `verifyWhatsAppWebhook`).
- Newsletter publish flow.

## Phase 6 — Bot

- AI assistant using the Vercel AI SDK in `src/features/bot`.
- Guardrails, rate limits, and logging on all model calls.

## Phase 7 — Hardening

- e2e (Playwright) + a11y (axe) coverage on critical flows.
- Load tests (Artillery) on public + webhook endpoints.
- OWASP ASVS L2 checklist pass; dead-code (knip) clean.

## Working Rules

- One phase area per branch/PR; keep changes small.
- Respect boundaries in [architecture.md](architecture.md).
- Update [progress-tracker.md](progress-tracker.md) as items move.

## Related Docs

- [project-overview.md](project-overview.md)
- [progress-tracker.md](progress-tracker.md)
- [architecture.md](architecture.md)
