# Tooling — apps/www/

> Toolchain decisions for the GridPower marketing prototype. Scoped to this
> app only. Rest of the monorepo stays on pnpm + turbo + biome.

## Stack

| Layer | Choice | Version |
|---|---|---|
| Runtime + pkg mgr | Bun | latest stable |
| Bundler | Vite | 8.x |
| Framework | React + React Router declarative | 19 + 7.9.4 |
| Styling | Tailwind | 4.3.x (CSS-first @theme) |
| Components | shadcn/ui (base-nova style) | latest |
| Motion | motion.dev | 12.x |
| Linter | oxlint | 0.16+ (pre-1.0, production-usable) |
| Formatter | oxfmt + Prettier fallback | early stage |
| Type checker | tsc via Bun |  |
| Dev orchestration | mprocs | TUI multi-process |

## Scripts

```bash
bun install        # install all dependencies
bun dev            # vite dev server on http://localhost:5173
bun build          # production build to dist/
bun preview        # serve production build
bun lint           # oxlint all src
bun fmt            # oxfmt with Prettier fallback
bun typecheck      # tsc --noEmit
```

## oxlint

Config: `.oxlintrc.json`. Pre-1.0 but production-usable. Runs ~50x faster
than ESLint on the same codebase. Limited rule coverage compared to ESLint
plugins. Document any rules we miss in this file when discovered.

## oxfmt

Earliest stage. The `bun fmt` script attempts `oxfmt .` and falls back to
`prettier --write src` for files oxfmt can not yet format. Drop the
fallback when oxfmt reaches sufficient coverage.

## Tailwind v4.3

No `tailwind.config.js`. All tokens live in `src/styles/globals.css` inside
`@theme { ... }`. Every value from `DESIGN.md` is reflected there.

Plugin wiring: `@tailwindcss/vite` in `vite.config.ts`. No PostCSS pipeline.

## shadcn — base-nova style

Style: `base-nova` (newer base-ui-backed shadcn variant, see `components.json`).
Components are added via:

```bash
bunx shadcn@latest add <component>
```

Then visually customized in `src/components/ui/` to match GridPower brand:
- Radii from DESIGN.md (`--radius-sm`, never pillowy)
- No drop shadows on cards
- GridRed as primary, neutral-100 as secondary
- Focus rings use GridRed at 50% opacity

## motion.dev

Re-exports + locked easings live in `src/lib/motion.ts`. Use the named
constants (`easings.outExpo`, `durations.hero`) rather than inline
cubic-bezier strings. This keeps the marketing-register motion language
consistent across the app.

## mprocs (dev)

For running Vite + watchers + ad-hoc shells side by side. Config TBD when
we have multiple long-running processes (currently just `bun dev`).

## SOPS (secrets, Phase 2)

When the Payload backend wires in (Phase 2), all env secrets live in
SOPS-encrypted YAML files with the GridPower age key. The age private key
location matches the project-wide pattern documented in vault `_System/`.

## What is intentionally NOT here

- No Storybook. Sections render directly in routes.
- No Playwright in this phase. E2E added once T1 polish ships.
- No bundle analyzer wired by default. `bunx vite-bundle-visualizer` on demand.
- No CSS-in-JS. Tailwind v4 + brand utility classes only.
