# Contributing

## Workflow

1. Create a branch from `main`.
2. Keep changes focused.
3. Add tests for behavior changes.
4. Run `pnpm ci` before opening a pull request.
5. Document new environment variables in `.env.example` and `docs/env.md`.

## Code Standards

- Use TypeScript strict mode.
- Validate all external input.
- Keep provider code under `src/server/integrations`.
- Do not import server modules into client components.
- Prefer small, testable functions over broad utility modules.

## Commits

Use clear, imperative commit messages:

```txt
Add lead capture validation schema
```
