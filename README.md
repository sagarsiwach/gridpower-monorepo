# GridEnergy Platform

One Bun and Turborepo workspace for the GridEnergy website, GridEnergy and GridCharge consoles, mobile shells, shared contracts, and the Cloudflare-first application spine.

## Runtime model

- Cloudflare Workers own public HTTP and application compute.
- Hono owns `/api/v1`; contracts and validation live in `packages/contracts`.
- Managed PostgreSQL remains the transactional and queryable telemetry store. Workers reach it through Hyperdrive.
- Queues and Cron Triggers own ingestion dispatch; Workflows own durable multi-step processes.
- Durable Objects own long-lived OCPP charger WebSockets.
- R2 stores reports and files, KV stores disposable cache data, and Analytics Engine records high-volume operational counters.
- Dedicated hosted services are an explicit exception for workloads that cannot fit Workers safely; they do not become an alternate API authority.

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) and [docs/CLOUDFLARE_BUILDS.md](docs/CLOUDFLARE_BUILDS.md).

## Workspace

```text
apps/
  www/                 gridenergy.co.in
  web/                 retained GridPower public surface
  console-energy/      GridEnergy operator console
  portal-gridos/       GridOS customer and fleet mock
  console-charge/      GridCharge operator console
  api/                 Hono Worker, queues, schedules and Workflows
  ocpp/                Durable Object WebSocket edge
  energy_app/          Flutter GridEnergy shell
  charge_app/          Flutter GridCharge shell
packages/
  contracts/ db/ env/ jobs/ observability/ security/
  tokens/ ui/ config/
services/
  pollers/             replaceable vendor adapter library
```

## Local commands

Requires Bun `1.3.14`.

### Pinned toolchain

This is the current compatible matrix verified on 15 July 2026. Versions are exact in the workspace manifests and lockfile so Cloudflare Builds and local development resolve the same graph.

| Layer | Version |
| --- | --- |
| Bun | `1.3.14` |
| Turborepo | `2.10.5` |
| Wrangler | `4.110.0` |
| Hono | `4.12.30` |
| React / React DOM | `19.2.7` |
| React Router | `7.18.1` |
| Vite | `8.1.4` |
| TypeScript | `6.0.3` |
| Vitest | `4.1.10` |
| Drizzle ORM / Kit | `0.45.2` / `0.31.10` |
| Postgres.js | `3.4.9` |
| Zod | `4.4.3` |
| Oxlint / Oxfmt | `1.74.0` / `0.59.0` |
| Playwright | `1.61.1` |

Major-version migrations are deliberate work, not automatic upgrades. In particular, React Router remains on its current framework-compatible v7 line.

```bash
bun install --frozen-lockfile
bun run dev
bun run check
```

Run one Worker:

```bash
bun --cwd apps/api dev
bun --cwd apps/ocpp dev
```

For local Hyperdrive, set `CLOUDFLARE_HYPERDRIVE_LOCAL_CONNECTION_STRING_HYPERDRIVE` from `.env.example`. The checked-in resource IDs are non-secret provisioning placeholders and must be replaced before the first staging deployment.

## Delivery contract

Cloudflare Workers Builds is the build and deployment runner. Pull requests upload preview versions, `main` deploys staging, and the protected `production` branch promotes the exact already-reviewed commit to production. No self-hosted runner or GitHub Actions deployment workflow is required.
