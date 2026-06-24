# Folder Conventions

## Route Groups

- `(public)` is for marketing and public content routes.
- `(auth)` is for sign-in, OAuth callback pages, and account recovery UI.
- `(admin)` is for staff and admin operations.
- `api` is for route handlers, webhooks, health checks, and integration endpoints.

## Feature Modules

Each feature should grow toward this shape when implementation begins:

```txt
src/features/example/
|-- components/
|-- data/
|-- schemas/
|-- actions/
|-- tests/
`-- index.ts
```

Only add folders when the feature needs them.

## Server Integrations

Provider integrations should expose small application-owned functions. Avoid
passing raw SDK clients around the app.

Examples:

- `sendSms`
- `sendTransactionalEmail`
- `publishNewsletter`
- `sendWhatsAppTemplate`
- `verifyWhatsAppWebhook`
- `enqueueJob`

## Naming

- Use kebab-case for route folders and docs.
- Use PascalCase for React components.
- Use camelCase for functions and variables.
- Use explicit names for provider clients, for example `arkeselSmsClient`.
