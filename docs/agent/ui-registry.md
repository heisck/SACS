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

| Component                                             | File                                      | Status | Variants / Notes                               |
| ----------------------------------------------------- | ----------------------------------------- | ------ | ---------------------------------------------- |
| `cn()`                                                | `src/lib/cn.ts`                           | stable | clsx + tailwind-merge                          |
| `Button` / `buttonVariants`                           | `src/components/ui/button.tsx`            | stable | primary, gold, outline, ghost, link · sm/md/lg |
| `Container` / `Section`                               | `src/components/ui/container.tsx`         | stable | max-w gutter + vertical rhythm                 |
| `Eyebrow`                                             | `src/components/ui/eyebrow.tsx`           | stable | uppercase label with rule                      |
| `Input` / `Textarea` / `Select`                       | `src/components/ui/input.tsx`             | stable | forwardRef, RHF-ready, aria-invalid            |
| `Field`                                               | `src/components/ui/field.tsx`             | stable | label + control + error wrapper                |
| `Prose`                                               | `src/components/ui/prose.tsx`             | stable | long-form/legal text styling                   |
| `SmoothScroll`                                        | `src/components/motion/smooth-scroll.tsx` | stable | Lenis root; reduced-motion aware               |
| `Reveal`                                              | `src/components/motion/reveal.tsx`        | stable | GSAP fade-rise on scroll; `stagger`            |
| `Logo`                                                | `src/components/site/logo.tsx`            | stable | wordmark + split dot                           |
| `SiteHeader` / `SiteFooter`                           | `src/components/site/*`                   | stable | site chrome for `(public)`                     |
| Social glyphs                                         | `src/components/site/social-icons.tsx`    | stable | inline SVG (lucide has no brand icons)         |
| Sections (Hero, Services, Stats, CtaBand, PageHeader) | `src/components/sections/*`               | stable | marketing building blocks                      |

## Planned Primitives (next)

1. `Card` — surface container.
2. `Badge` — status pills.
3. `Alert` — inline success/warning/danger messaging.
4. `Spinner` / `Skeleton` — loading states.
5. `Modal` / `Dialog` — accessible overlay (admin + auth).
6. `Toast` — transient notifications.
7. `ImageCropper` — admin crop/rotate/zoom (react-easy-crop).

## How to Add an Entry

1. Implement the component to [ui-rules.md](ui-rules.md).
2. Add a row above with file path, status (`stable` / `wip`), and variants.
3. Cover it with a Vitest + Testing Library test (and axe if interactive).

## Related Docs

- [ui-tokens.md](ui-tokens.md)
- [ui-rules.md](ui-rules.md)
