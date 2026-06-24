# Project Overview

## What SACS Is

SACS Study Abroad is a production-grade web platform for a study abroad
agency. It captures and nurtures leads, runs admissions workflows, sends
transactional email / SMS / WhatsApp, publishes a newsletter, and gives staff
an admin surface to operate it all.

The repository is currently a **production shell**: infrastructure,
conventions, configuration, CI/CD, Docker, and security baselines are in place.
Product features (pages, schema, auth flows, provider clients, bot logic) are
intentionally not implemented yet.

## Goals

- Convert visitors into qualified admissions leads.
- Keep applicants informed across email, SMS, and WhatsApp.
- Give staff a reliable admin and operations surface.
- Stay secure, observable, and cheap to run on serverless infrastructure.

## Stack Baseline

- **Framework:** Next.js 16 App Router + TypeScript, React 19.
- **Runtime:** Node.js 24 LTS, pnpm 11 (via Corepack).
- **Data:** Neon Postgres + Drizzle ORM.
- **Cache / limits:** Upstash Redis + Ratelimit.
- **Jobs:** Upstash QStash / Workflow.
- **Auth:** Better Auth with Google OAuth.
- **Email:** Resend + React Email.
- **Messaging:** Arkesel (SMS) and WhatsApp (Meta Cloud API / Arkesel)
  placeholders.
- **AI:** Vercel AI SDK (`ai`, `@ai-sdk/openai`) for the bot feature.
- **UI:** Tailwind CSS v4, `class-variance-authority`, `clsx`,
  `tailwind-merge`, `lucide-react`.
- **Observability:** Sentry, OpenTelemetry, Pino.
- **Testing:** Vitest, Playwright, axe, Artillery, MSW.

## Product Domains (`src/features/*`)

`admissions`, `leads`, `admin`, `newsletter`, `sms`, `whatsapp`, `auth`, `bot`.

## Scope Boundary

Today the only runtime code is framework bootstrap plus a health endpoint at
`src/app/api/health/route.ts`. Treat any feature work as greenfield inside the
established conventions — do not assume implementations exist.

## Related Docs

- [architecture.md](architecture.md)
- [build-plan.md](build-plan.md)
- [progress-tracker.md](progress-tracker.md)
- [code-standards.md](code-standards.md)
