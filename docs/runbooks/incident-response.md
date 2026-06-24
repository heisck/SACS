# Incident Response Runbook

## Severity

- Sev 1: site unavailable, data exposure, auth bypass, or provider credential leak.
- Sev 2: major feature unavailable, message delivery outage, elevated error rate.
- Sev 3: degraded performance or non-critical workflow failure.

## First 15 Minutes

1. Assign incident lead.
2. Freeze deploys unless rollback is required.
3. Capture timeline, symptoms, and affected users.
4. Check Sentry, logs, traces, provider status, and recent deploys.
5. Decide rollback, provider failover, or mitigation.

## Data or Secret Exposure

1. Rotate affected secrets.
2. Disable exposed integration credentials.
3. Preserve logs for investigation.
4. Identify affected records and users.
5. Follow client notification and legal process.

## After Resolution

- Write a post-incident review.
- Add regression tests or monitoring.
- Update runbooks and alert thresholds.
