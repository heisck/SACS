# Project Overview

## About SACS

**Study Abroad Consultancy Services (SACS)** is a specialized education
consultancy that provides comprehensive admissions, scholarship, and financial
planning support to Ghanaian students seeking **Master's and PhD opportunities
in Europe**. SACS offers end-to-end advisory services: university selection,
graduate school applications, scholarship identification and application
support, statement of purpose (SOP) development, interview preparation, visa
guidance, and pre-departure orientation.

SACS addresses a critical challenge faced by many talented Ghanaian graduates:
limited access to reliable information, professional guidance, and funding
opportunities for international education. By simplifying the application
process and increasing access to scholarships and affordable study options, the
company aims to improve educational outcomes and contribute to Ghana's human
capital development.

## Mission

To empower students to achieve their highest academic potential by providing
personalized guidance, comprehensive resources, and unwavering support
throughout their educational journey.

## Vision

To be the premier educational consultant that inspires and enables every
Ghanaian student to access international education without barriers.

## Services

We make the entire study abroad journey easy — from shortlisting universities
to getting a visa approved — so students can focus on building their future.

- Personalized university and course selection
- Scholarship and financial aid guidance
- Application preparation and submission
- Statement of purpose (SOP) development
- Visa documentation and interview coaching
- Pre-departure support and transition advice

## The Platform

This repository is the production-grade web platform that delivers those
services online. It captures and nurtures prospective-student leads, runs
admissions and application workflows, sends transactional email / SMS /
WhatsApp, publishes a newsletter, offers an AI assistant for student questions,
and gives SACS staff an admin surface to operate it all.

The repository is currently a **production shell**: infrastructure,
conventions, configuration, CI/CD, Docker, and security baselines are in place.
Product features (pages, schema, auth flows, provider clients, bot logic) are
intentionally not implemented yet.

## Goals

- Convert visitors into qualified admissions leads for Master's/PhD applicants.
- Guide students through university selection, scholarships, and applications.
- Keep applicants informed across email, SMS, and WhatsApp.
- Give SACS staff a reliable admin and operations surface.
- Stay secure, observable, and cheap to run on serverless infrastructure.

## Stack Baseline

- **Framework:** Next.js 16 App Router + TypeScript, React 19.
- **Runtime:** Node.js 24 LTS, pnpm 11 (via Corepack).
- **Data:** Neon Postgres + Drizzle ORM.
- **Cache / limits:** Upstash Redis + Ratelimit.
- **Jobs:** Upstash QStash / Workflow.
- **Auth:** Better Auth with Google OAuth.
- **Email:** Resend + React Email.
- **Messaging:** Arkesel (SMS) and WhatsApp (Meta Cloud API / Arkesel)
  placeholders.
- **AI:** Vercel AI SDK (`ai`, `@ai-sdk/openai`) for the bot feature.
- **UI:** Tailwind CSS v4, `class-variance-authority`, `clsx`,
  `tailwind-merge`, `lucide-react`.
- **Observability:** Sentry, OpenTelemetry, Pino.
- **Testing:** Vitest, Playwright, axe, Artillery, MSW.

## Product Domains (`src/features/*`)

`admissions`, `leads`, `admin`, `newsletter`, `sms`, `whatsapp`, `auth`, `bot`.

## Scope Boundary

Today the only runtime code is framework bootstrap plus a health endpoint at
`src/app/api/health/route.ts`. Treat any feature work as greenfield inside the
established conventions — do not assume implementations exist.

## Related Docs

- [architecture.md](architecture.md)
- [build-plan.md](build-plan.md)
- [progress-tracker.md](progress-tracker.md)
- [code-standards.md](code-standards.md)
