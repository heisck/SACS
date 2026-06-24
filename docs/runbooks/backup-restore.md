# Backup and Restore Runbook

## Database

Production database backups are owned by Neon. Before launch:

- Confirm backup retention.
- Confirm point-in-time restore availability.
- Document restore permissions.
- Run a staging restore drill.

## Application Data

Document storage is not implemented yet. Before adding uploads, define:

- Storage provider.
- Encryption requirements.
- Malware scanning.
- Retention and deletion rules.
- Backup and restore procedure.

## Restore Drill

1. Create a staging database branch or restore target.
2. Restore from the selected backup point.
3. Run migrations if needed.
4. Run smoke tests.
5. Record restore duration and issues.
