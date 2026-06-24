# Deployment Runbook

## Environments

- Pull requests: preview deployment.
- `main`: staging deployment after CI.
- Production: manually approved deployment from a tagged or approved release.

## Pre-Deploy Checks

- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm build`
- Dependency review
- Secret scan
- Database migration review

## Database Migrations

1. Generate migrations from Drizzle schema changes.
2. Review generated SQL.
3. Run migrations against preview or staging.
4. Validate rollback or forward-fix plan.
5. Run production migrations before or during deployment depending on risk.

## Rollback

- Prefer application rollback first.
- If a migration is backward compatible, roll back the app only.
- If a migration is destructive, use a forward-fix unless a tested restore plan
  exists.

## Post-Deploy

- Check health endpoint.
- Check error rate.
- Check logs and traces.
- Check critical flows: auth, lead submit, admin access, email/SMS/WhatsApp send
  in staging or production-safe mode.
