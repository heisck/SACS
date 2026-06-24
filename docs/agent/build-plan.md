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

- `(public)` marketing pages and layout.
- Lead capture form → server action (`next-safe-action` + Zod) → `leads` table.
- Rate limiting via Upstash on public mutations.
- Confirmation email via Resend + React Email.

## Phase 3 — Auth + Admin

- Better Auth with Google OAuth in `src/server/auth`.
- `(auth)` sign-in / callback pages.
- `(admin)` shell with session guard.
- Admin leads list + detail.

## Phase 4 — Admissions

- Admissions data model and workflow states.
- Applicant-facing status views.
- Background jobs via QStash/Workflow for reminders and follow-ups.

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
