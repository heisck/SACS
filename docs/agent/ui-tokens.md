# UI Tokens

Single source of truth for design tokens. The project uses **Tailwind CSS v4**
(CSS-first config). Tokens are declared in `@theme` inside
`src/app/globals.css`, then consumed as Tailwind utilities. Update this file and
`globals.css` together — never hardcode raw hex/px in components.

> Status: the current `globals.css` only sets base body styles. The palette and
> scales below are the agreed baseline to implement when the design system lands.

## Color

| Token             | Light value | Usage                        |
| ----------------- | ----------- | ---------------------------- |
| `--color-bg`      | `#ffffff`   | Page background              |
| `--color-fg`      | `#111827`   | Primary text                 |
| `--color-muted`   | `#6b7280`   | Secondary text               |
| `--color-border`  | `#e5e7eb`   | Dividers, input borders      |
| `--color-primary` | `#1d4ed8`   | Primary actions / links      |
| `--color-success` | `#15803d`   | Success states               |
| `--color-warning` | `#b45309`   | Warnings                     |
| `--color-danger`  | `#b91c1c`   | Errors / destructive actions |

Define dark-mode equivalents under a `[data-theme="dark"]` / `prefers-color-scheme`
block when dark mode is introduced. `:root` currently pins `color-scheme: light`.

## Typography

- Font family: system stack (`Arial, Helvetica, sans-serif`) until a brand font
  is chosen.
- Scale (rem): `xs .75`, `sm .875`, `base 1`, `lg 1.125`, `xl 1.25`,
  `2xl 1.5`, `3xl 1.875`, `4xl 2.25`.
- Weights: 400 body, 500 medium, 600 semibold, 700 bold.
- Line height: `1.5` body, `1.2` headings.

## Spacing

4px base unit. Use Tailwind's default scale (`1`=4px … `8`=32px, `12`=48px,
`16`=64px). Do not invent off-scale values.

## Radius

`sm 4px`, `md 8px`, `lg 12px`, `full 9999px`. Default interactive radius: `md`.

## Shadow

`sm` subtle card, `md` raised, `lg` overlay/modal. Prefer borders over shadows
for flat surfaces.

## Breakpoints

Tailwind defaults: `sm 640`, `md 768`, `lg 1024`, `xl 1280`, `2xl 1536`.
Mobile-first.

## Z-Index

`base 0`, `dropdown 1000`, `sticky 1100`, `overlay 1200`, `modal 1300`,
`toast 1400`.

## Related Docs

- [ui-rules.md](ui-rules.md)
- [ui-registry.md](ui-registry.md)
