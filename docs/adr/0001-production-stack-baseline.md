# ADR 0001: Production Stack Baseline

Status: Accepted

Date: 2026-06-24

## Context

The platform will serve study abroad leads, admin operations, messaging,
newsletters, SMS, WhatsApp, and a website bot. The repo needs to start with a
production shell before feature code is added.

## Decision

Use:

- Next.js 16 App Router with TypeScript for the web platform.
- Node.js 24 LTS with pnpm 11 for runtime and package management.
- Neon Postgres as the production relational database.
- Drizzle ORM for schema and migrations.
- Upstash Redis for caching and rate limiting.
- Upstash QStash / Workflow for background work and webhook retries.
- Better Auth for Google OAuth and future credential/session work.
- Resend and React Email for transactional email and newsletter foundations.
- Arkesel for SMS.
- Meta WhatsApp Cloud API or Arkesel as the WhatsApp provider.
- Sentry, OpenTelemetry, and Pino for errors, traces, metrics, and logs.
- Vitest, Playwright, axe, and Artillery for test coverage.
- GitHub Actions for CI, security checks, and Docker validation.

## Consequences

- Provider-specific code must live behind adapters under `src/server/integrations`.
- Feature code must not import secrets or provider SDKs directly from client code.
- All new external input must use schema validation.
- Admin and messaging actions must be audit-ready from the beginning.
- Production deployments must pass lint, typecheck, tests, build, and security checks.
