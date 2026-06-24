# Code Standards

## Language & Types

- TypeScript strict mode. No `any`; use `unknown` + narrowing.
- No `@ts-ignore` / `@ts-expect-error` without a one-line justification comment.
- Prefer `type` for unions/shapes, `interface` for extensible object contracts.
- Validate every external boundary (requests, env, webhooks, forms) with Zod.

## Style & Size

- Functions under ~50 lines; files under ~300. Split into atomic modules above.
- Early returns over nested conditionals.
- `const` by default, `let` only when reassigned.
- No dead code, commented-out blocks, or unused imports — git is the history.
- No `console.log` in committed code; use the Pino logger
  (`src/server/logging/logger.ts`).

## Naming

- kebab-case: route folders, file names, docs.
- PascalCase: React components and types.
- camelCase: functions and variables.
- Explicit provider client names, e.g. `arkeselSmsClient`.

## React / Next.js

- Server Components by default; add `"use client"` only when needed.
- Client components never import `src/server`.
- Mutations go through server actions wrapped with `next-safe-action`.
- Forms use `react-hook-form` + `@hookform/resolvers` + Zod.
- Memoize genuinely expensive work; do not pre-optimize.

## Data & Backend

- All DB access through Drizzle in `src/server/db` / feature `data/` layers.
- No raw string SQL; use Drizzle query builder / parameterized queries.
- No N+1 queries — batch or join.
- Provider SDKs only inside `src/server/integrations`.

## Tooling Gates (must pass before done)

```bash
pnpm format:check   # prettier
pnpm lint           # eslint (flat config)
pnpm typecheck      # tsc --noEmit
pnpm test           # vitest
pnpm build          # next build
# or all at once:
pnpm ci
```

`pnpm check:dead-code` (knip) should stay clean.

## Commits & PRs

- One logical change per commit; message explains **what** and **why**.
- Conventional, imperative subject lines.
- Husky + lint-staged run prettier/eslint on staged files — do not bypass with
  `--no-verify`.
- Keep PRs small and reviewable.

## Security

- Never hardcode secrets; read from validated env only.
- Parameterized queries always.
- No secrets, tokens, or PII in logs.
- See [docs/security/security-baseline.md](../security/security-baseline.md) and
  the [OWASP ASVS L2 checklist](../security/owasp-asvs-l2-checklist.md).

## Related Docs

- [architecture.md](architecture.md)
- [ui-rules.md](ui-rules.md)
- [library-docs.md](library-docs.md)
