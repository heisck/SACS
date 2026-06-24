# Repo Blueprint

```txt
.
|-- .github/
|   |-- workflows/
|   |-- ISSUE_TEMPLATE/
|   `-- pull_request_template.md
|-- db/
|   |-- schema/
|   |-- migrations/
|   `-- seeds/
|-- docs/
|   |-- adr/
|   |-- architecture/
|   |-- security/
|   `-- runbooks/
|-- docker/
|-- public/
|-- scripts/
|-- src/
|   |-- app/
|   |-- components/
|   |-- config/
|   |-- emails/
|   |-- features/
|   `-- server/
|-- tests/
|-- types/
|-- Dockerfile
|-- compose.yaml
|-- next.config.ts
|-- proxy.ts
`-- instrumentation.ts
```

## Application Layers

`src/app` contains App Router routes, route groups, metadata, route handlers,
and framework boundaries.

`src/features` contains product-owned modules such as admissions, leads, admin,
newsletter, SMS, WhatsApp, auth, and bot workflows.

`src/server` contains server-only infrastructure: auth, cache, database,
integrations, jobs, logging, security, and validation.

`src/components` contains shared UI components only after a design system is
chosen.

`src/emails` contains React Email templates and email-specific components.

`db` contains Drizzle schema, generated migrations, and seed scripts.

`tests` separates unit, integration, end-to-end, load, and security tests.

## Boundary Rules

- Client components must not import from `src/server`.
- Route handlers and server actions validate all external input.
- Provider SDKs stay inside `src/server/integrations`.
- Shared types live in `types` only when they are truly cross-cutting.
- Feature modules may expose narrow server APIs, not raw provider clients.
