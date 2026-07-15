# GridEnergy repository instructions

Follow the user's global instructions and the active Notion Development Issue. This file locks the repository-specific architecture and commands.

## Architecture

- Cloudflare Workers are the parent application compute plane.
- `apps/api` is the sole first-party HTTP API and write boundary.
- `packages/contracts` owns shared request, response, event and job contracts.
- Managed PostgreSQL is reached from Workers through Hyperdrive. Clients never connect directly.
- Use Queues and Cron Triggers for bounded ingestion, Workflows for durable orchestration, Durable Objects for OCPP WebSockets, R2 for artifacts, KV for disposable cache, and Analytics Engine for operational counters.
- A dedicated hosted service is an exception for a measured Worker incompatibility. It stays behind Cloudflare and does not introduce a second client-facing API.
- Keep mock data visibly labelled until it is backed by an authoritative source.

## Toolchain and checks

- Use Bun and Turborepo. Do not add pnpm or npm lockfiles.
- Keep exact versions in manifests and commit `bun.lock`.
- Before committing, run `bun run check`, `bun run cf:dry-run`, `git diff --check`, and the relevant local smoke test.
- Run `bun run mobile:check` when Flutter surfaces change and Flutter is available.
- Stage only intentional files in this monorepo.

## Delivery

- Cloudflare Workers Builds is the build and deployment runner. Do not add self-hosted runners or a GitHub Actions deployment workflow without an explicit architecture decision.
- Pull-request branches upload preview versions, `main` deploys staging, and the protected fast-forward-only `production` branch promotes the reviewed SHA.
- Never deploy production without explicit user authority.
- Placeholder Cloudflare resource IDs must be provisioned before the first staging deployment; credentials and connection strings never belong in Git.

## Product boundaries

- GridEnergy is the public brand at `gridenergy.co.in`.
- Preserve the existing website and operator-console design systems unless the active issue explicitly changes them.
- Do not fabricate customer, charger, tariff, generation, financial or device specifications.
