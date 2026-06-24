# SACS Study Abroad

Production-grade Next.js shell for a study abroad platform.

This repo currently contains infrastructure, project conventions, configuration,
CI/CD, Docker, security baseline docs, and integration placeholders. It does not
contain product feature implementation yet.

## Stack Baseline

- Next.js 16 App Router with TypeScript
- Node.js 24 LTS and pnpm 11
- Neon Postgres with Drizzle ORM
- Upstash Redis for cache and rate limits
- Upstash QStash / Workflow for background jobs
- Better Auth with Google OAuth
- Resend and React Email for transactional email/newsletter foundations
- Arkesel SMS integration placeholder
- WhatsApp provider placeholder for Meta Cloud API or Arkesel
- Sentry, OpenTelemetry, and Pino for observability
- Vitest, Playwright, axe, and Artillery for testing

## Commands

```bash
pnpm dev
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm ci
```

## Local Setup

1. Install Node.js 24 and enable Corepack.
2. Run `corepack prepare pnpm@11.9.0 --activate`.
3. Run `pnpm install`.
4. Copy `.env.example` to `.env.local` and fill only the services you need.
5. Run `pnpm dev`.

Docker local services are available through:

```bash
docker compose up --build
```

Production uses Neon and Upstash. The local Postgres and Redis services in
Compose are for development and integration testing only.

## Documentation

- [Architecture Blueprint](docs/architecture/repo-blueprint.md)
- [Folder Conventions](docs/architecture/folder-conventions.md)
- [Environment Contract](docs/env.md)
- [Security Baseline](docs/security/security-baseline.md)
- [OWASP ASVS Level 2 Checklist](docs/security/owasp-asvs-l2-checklist.md)
- [Deployment Runbook](docs/runbooks/deployment.md)
- [Incident Response Runbook](docs/runbooks/incident-response.md)
- [Backup and Restore Runbook](docs/runbooks/backup-restore.md)
- [Integrations Runbook](docs/runbooks/integrations.md)

## Current Scope

The only runtime files are framework bootstrap files and a health endpoint so
CI, Docker, and deployment checks can validate the shell. Product pages, admin
screens, bot logic, database schema, auth flows, and provider clients are still
intentionally empty.
