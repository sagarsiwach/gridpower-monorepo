# GridPower Monorepo

Turborepo + pnpm workspace powering the GridPower marketing site and product consoles.

## Structure

```
apps/
  web/              # Marketing site (React Router v7 framework mode) — gridpower.co.in
  console-charge/   # GridCharge operator console (TanStack Start)
packages/
  tokens/           # Design tokens + self-hosted fonts (Clash Grotesk, Inter, Geist Mono)
  ui/               # Shared shadcn/ui components consuming @gridpower/tokens
  config/           # Shared TS/Biome/ESLint config
```

## Quick start

```bash
pnpm install
pnpm dev           # runs all apps in parallel
pnpm build         # production builds
pnpm lint          # biome lint
pnpm typecheck     # tsc --noEmit across workspaces
```

## Design system

- Canonical tokens: `packages/tokens/src/tokens.css` (sand/dark neutrals + GridRed + semantic aliases)
- Display font: Clash Grotesk (`--font-display`)
- Body font: Inter (`--font-sans`)
- Mono font: Geist Mono (`--font-mono`)
- Showcase route: `apps/web/src/routes/design-system.tsx`

## Development workflow

Every feature is a PR. One issue = one PR. See Linear project "GridPower / Website" for the issue queue.

Branches: `claude/<issue-id>-<short-desc>` or `codex/<issue-id>-<short-desc>`.

Base branch: `main`.

## History

`archive/nextjs-2026-01` branch preserves the original Next.js + Sanity exploration from January 2026.
