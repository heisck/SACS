# Integrations Runbook

## Neon

Use Neon for production Postgres. Use preview branches for PR validation when
available. Keep pooled and unpooled URLs separate.

## Upstash Redis

Use Redis for cache, rate limiting, and lightweight coordination. Do not treat
Redis as the durable source of truth.

## Upstash QStash / Workflow

Use QStash or Workflow for background jobs, retries, webhook fanout, newsletter
jobs, SMS sends, WhatsApp sends, and bot escalation tasks.

## Google Auth

Use Google OAuth through the chosen auth library. Restrict domains only if the
client requests staff-only or organization-only access.

## Resend / Email

Use transactional email for account, lead, and admin notifications. Marketing
newsletters must include unsubscribe handling before launch.

## Arkesel SMS

Use Arkesel for OTPs, lead alerts, appointment reminders, and transactional SMS.
Rate-limit all send operations and log provider message IDs.

## WhatsApp

Use Meta WhatsApp Cloud API or Arkesel depending on the client's business setup.
Webhook handlers must verify signatures/tokens and be idempotent.

## Website Bot

The website bot should be implemented behind server adapters. Store conversation
state and escalation events in Postgres, not only in model/provider memory.
