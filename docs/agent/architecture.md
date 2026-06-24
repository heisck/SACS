# Architecture

Authoritative source for layout is
[docs/architecture/repo-blueprint.md](../architecture/repo-blueprint.md) and
[docs/architecture/folder-conventions.md](../architecture/folder-conventions.md).
This file is the agent-facing summary.

## Layers

| Layer            | Path                | Responsibility                                  |
| ---------------- | ------------------- | ----------------------------------------------- |
| Routes           | `src/app`           | App Router routes, route groups, handlers       |
| Features         | `src/features/*`    | Product modules (admissions, leads, admin, …)   |
| Server infra     | `src/server/*`      | auth, cache, db, integrations, jobs, logging    |
| Shared UI        | `src/components`    | Cross-feature presentational components          |
| Email            | `src/emails`        | React Email templates                            |
| Schema           | `db/`               | Drizzle schema, migrations, seeds               |

Route groups: `(public)` marketing, `(auth)` sign-in/OAuth, `(admin)` staff,
`api` handlers/webhooks/health.

## Boundary Rules (non-negotiable)

- Client components must **not** import from `src/server`.
- Route handlers and server actions **validate all external input** with Zod.
- Provider SDKs stay inside `src/server/integrations`; never pass raw clients
  around the app.
- Integrations expose narrow app-owned functions (`sendSms`,
  `sendTransactionalEmail`, `publishNewsletter`, `sendWhatsAppTemplate`,
  `verifyWhatsAppWebhook`, `enqueueJob`).
- Shared types live in `types/` only when genuinely cross-cutting.

## Feature Module Shape

```txt
src/features/<name>/
|-- components/   # feature UI
|-- data/         # data access (calls src/server)
|-- schemas/      # zod schemas
|-- actions/      # server actions (next-safe-action)
|-- tests/
`-- index.ts      # narrow public surface
```

Only add folders a feature actually needs.

## Request / Data Flow

1. Route or server action receives input.
2. Zod schema validates it (`next-safe-action` wraps actions).
3. Feature `data/` layer calls `src/server/*` infra.
4. Infra talks to Neon / Upstash / providers; results flow back up.
5. Side effects (email, SMS, jobs) go through `enqueueJob` / integration
   functions, never inline in the UI path.

## Cross-Cutting Concerns

- **Env:** validated in `src/server/env/schema.ts` (`@t3-oss/env-nextjs`).
- **Logging:** `src/server/logging/logger.ts` (Pino).
- **Telemetry:** `instrumentation.ts` (Sentry + OTel).
- **Security:** headers/middleware in `proxy.ts`; baseline in
  [docs/security/security-baseline.md](../security/security-baseline.md).

## Related Docs

- [project-overview.md](project-overview.md)
- [code-standards.md](code-standards.md)
- [library-docs.md](library-docs.md)
