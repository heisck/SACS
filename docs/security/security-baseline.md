# Security Baseline

Target: OWASP ASVS Level 2.

## Platform Controls

- Enforce authentication and authorization on the server.
- Use role-based access control for admin and staff areas.
- Validate every API route, server action, webhook, and form payload.
- Rate-limit login, OTP, lead forms, search, newsletters, SMS, WhatsApp, and bot
  endpoints.
- Keep database access in server-only modules.
- Keep provider SDKs in server-only integration adapters.
- Use safe, generic error messages for users.
- Log enough context for investigations without logging secrets or sensitive
  documents.

## Headers

Configured in `next.config.ts`:

- `Content-Security-Policy-Report-Only`
- `Referrer-Policy`
- `X-Content-Type-Options`
- `X-Frame-Options`
- `X-DNS-Prefetch-Control`
- `Permissions-Policy`
- `Strict-Transport-Security` in production

CSP starts in report-only mode until all production domains are known. Move to
enforcement after image, analytics, bot, payment, email, and auth domains are
finalized and tested.

## Admin and Audit

Audit logs should cover:

- Admin login and logout.
- Role changes.
- Lead status changes.
- Application record changes.
- Email, SMS, and WhatsApp sends.
- Bot escalation events.
- Data export and deletion actions.

Audit logs must include actor, action, target, timestamp, request ID, and
outcome.

## Webhooks

Webhook endpoints must:

- Verify provider signatures or verification tokens.
- Reject stale timestamps when the provider supports timestamps.
- Be idempotent.
- Persist delivery attempts and outcomes.
- Never trust user-visible sender fields without provider verification.
