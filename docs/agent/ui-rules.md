# UI Rules

How UI is built in SACS. Read with [ui-tokens.md](ui-tokens.md) (values) and
[ui-registry.md](ui-registry.md) (inventory).

## Principles

- Server Components by default; `"use client"` only for interactivity.
- Compose small primitives; no monolithic page components.
- Tokens over literals — never hardcode color/spacing/size, use Tailwind
  utilities backed by `@theme` tokens.
- Accessible first, decorative second.

## Components

- Variants via `class-variance-authority`; merge classes with `clsx` +
  `tailwind-merge` (a `cn()` helper in `src/components`).
- Shared, cross-feature components live in `src/components`; feature-specific UI
  stays in `src/features/<name>/components`.
- Icons from `lucide-react` only; keep them `aria-hidden` unless interactive.
- Every new shared component gets an entry in
  [ui-registry.md](ui-registry.md).

## Accessibility (target: WCAG 2.2 AA)

- All interactive elements keyboard reachable with a visible focus ring.
- Real semantic elements (`button`, `a`, `nav`, `main`, headings in order).
- Labels for every input; errors linked via `aria-describedby`.
- Contrast ≥ 4.5:1 text, 3:1 large text / UI.
- Respect `prefers-reduced-motion`.
- Validated with `@axe-core/playwright` in e2e tests.

## Forms

- `react-hook-form` + Zod resolver; same Zod schema validates server-side.
- Inline, specific error messages; disable submit only while pending.
- Never block typing; validate on blur/submit, not every keystroke.

## State & Data

- Prefer server data + server actions over client fetching.
- Loading via `loading.tsx` / Suspense; errors via `error.tsx`.
- Optimistic UI only where the mutation is reliably reversible.

## Responsiveness

- Mobile-first; design at 360px up.
- No horizontal scroll; tap targets ≥ 44px.

## Performance

- `next/image` for images, `next/font` for fonts.
- Keep client bundles lean; push logic to the server.
- Avoid unnecessary re-renders; memoize only proven hotspots.

## Related Docs

- [ui-tokens.md](ui-tokens.md)
- [ui-registry.md](ui-registry.md)
- [code-standards.md](code-standards.md)
