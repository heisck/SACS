# Environment Contract

`.env.example` is the source of truth for expected variables. `.env.local` and
all real environment files must remain uncommitted.

## Environments

- `development`: local machine and Docker Compose.
- `test`: automated tests.
- `staging`: pre-production validation.
- `production`: live client system.

## Secret Rules

- Never expose server secrets through `NEXT_PUBLIC_`.
- Keep OAuth, SMS, WhatsApp, database, Redis, and Sentry tokens in environment
  managers, not in source control.
- Rotate webhook signing secrets after exposure or team member offboarding.
- Use separate provider credentials for staging and production.

## Required Before Production

- `APP_URL`
- `DATABASE_URL`
- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`
- `BETTER_AUTH_SECRET`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `RESEND_API_KEY`
- `ARKESEL_API_KEY`
- WhatsApp provider credentials
- `SENTRY_DSN`

## DNS and Email

Transactional email and newsletter sending must not go live until SPF, DKIM,
DMARC, and bounce handling are configured for the sending domain.
