# UI Registry

Inventory of shared UI components in `src/components`. Add a row whenever you
create or change a shared component so agents reuse instead of duplicating.
Build to the rules in [ui-rules.md](ui-rules.md) using tokens from
[ui-tokens.md](ui-tokens.md).

## Conventions

- One component per file, PascalCase, in `src/components`.
- Variants via `class-variance-authority`; export the `props` type.
- Feature-only components stay in `src/features/<name>/components` and are
  **not** listed here.

## Registry

| Component | File | Status | Variants / Notes |
| --------- | ---- | ------ | ---------------- |
| _none yet_ | — | — | `src/components` only has `.gitkeep` |

## Planned Primitives (build order)

1. `cn()` utility — `clsx` + `tailwind-merge`.
2. `Button` — variants: primary, secondary, ghost, destructive; sizes sm/md/lg.
3. `Input`, `Textarea`, `Select`, `Checkbox` — form controls with label + error.
4. `Field` — label + control + error wrapper for `react-hook-form`.
5. `Card` — surface container.
6. `Badge` — status pills.
7. `Alert` — inline success/warning/danger messaging.
8. `Spinner` / `Skeleton` — loading states.
9. `Modal` / `Dialog` — accessible overlay.
10. `Toast` — transient notifications.

## How to Add an Entry

1. Implement the component to [ui-rules.md](ui-rules.md).
2. Add a row above with file path, status (`stable` / `wip`), and variants.
3. Cover it with a Vitest + Testing Library test (and axe if interactive).

## Related Docs

- [ui-tokens.md](ui-tokens.md)
- [ui-rules.md](ui-rules.md)
