# Grid Platform

The DeltaEV platform monorepo for GridEnergy, GridOS and GridCharge. It follows the proven Satlok workspace shape: Bun, Turborepo, contract-first TypeScript packages, Hono, Drizzle/Postgres, Vitest and separate Flutter apps.

## Start locally

```bash
bun install
docker compose -f infra/docker-compose.yml up -d
bun run dev
```

Primary mocks:

- GridEnergy operations: `http://localhost:5174`
- GridOS customer portal: `http://localhost:5175`
- API health: `http://localhost:14780/api/v1/health`
- OCPP adapter health: `http://localhost:14781/health`

All checked-in readings and commercial records are demonstration data. See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for service boundaries and decisions.

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
