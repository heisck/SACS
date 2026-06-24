# OWASP ASVS Level 2 Checklist

This is the project checklist, not a complete copy of ASVS.

## Authentication

- [ ] Google OAuth is configured with least privilege scopes.
- [ ] Sessions are httpOnly, secure, sameSite-aware, and rotated when needed.
- [ ] Login and OAuth callback endpoints are rate-limited.
- [ ] Admin routes perform server-side session and role checks.

## Access Control

- [ ] Admin, staff, student, and public capabilities are documented.
- [ ] Authorization checks run in server code, not only in UI.
- [ ] Direct object reference checks exist for lead and application records.

## Input Validation

- [ ] All external input uses schemas.
- [ ] Webhooks validate signatures and payload shape.
- [ ] File upload rules are documented before uploads are implemented.

## Logging

- [ ] Request IDs are available for correlation.
- [ ] Sensitive data is redacted.
- [ ] Admin actions and message sends are audit logged.

## Data Protection

- [ ] Production database access is least privilege.
- [ ] Backups and restore drills are documented.
- [ ] Retention rules exist for leads, messages, and documents.

## Communications

- [ ] SPF, DKIM, and DMARC are configured before email launch.
- [ ] SMS and WhatsApp sends are rate-limited.
- [ ] Opt-out/unsubscribe rules are implemented for marketing messages.

## Deployment

- [ ] CI passes lint, typecheck, tests, and build.
- [ ] Dependency and secret scanning run in CI.
- [ ] Production deploys require approval.
- [ ] Rollback procedure is tested.
