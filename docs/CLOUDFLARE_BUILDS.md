# Cloudflare Workers Builds delivery contract

This repository intentionally uses Cloudflare Workers Builds instead of self-hosted runners or a GitHub Actions deployment workflow.

## Branch model

| Git ref                | Cloudflare action                                       | Authority                     |
| ---------------------- | ------------------------------------------------------- | ----------------------------- |
| Pull request branch    | Run checks and `wrangler versions upload --env staging` | Preview only; no active route |
| `main`                 | Run checks and `wrangler deploy --env staging`          | Automatic staging             |
| protected `production` | Run the same checks and `wrangler deploy`               | Explicit production promotion |

The `production` branch is fast-forward only. Promote an exact SHA already on `main`; never rebuild from an unreviewed branch and never force push it.

## Required repository gate

Connect the `grid-platform-api-staging` Worker to this repository with the root directory set to `/`. It is the required all-repository check and must run for every pull request.

```text
Build command:
bun install --frozen-lockfile && bun run check

Production branch for the staging Worker:
main

Deploy command:
bun --cwd apps/api run deploy:staging

Non-production branch deploy command:
bun --cwd apps/api run deploy:preview

Build watch include paths:
*
```

Require the resulting Cloudflare check in GitHub branch protection for `main` and require pull requests. Cloudflare creates the check run from the connected Workers Build.

## Component builds

Connect each remaining Worker twice: a staging project whose production branch is `main`, and a production project whose production branch is `production`. Use root directory `/` so Bun workspace dependencies resolve.

| App                  | Workspace                      | Path                  |
| -------------------- | ------------------------------ | --------------------- |
| Website              | `@gridpower/www`               | `apps/www`            |
| Legacy GridPower web | `@gridpower/web`               | `apps/web`            |
| GridEnergy console   | `@gridpower/console-energy`    | `apps/console-energy` |
| GridCharge console   | `@gridpower/console-charge`    | `apps/console-charge` |
| GridOS portal        | `@grid-platform/portal-gridos` | `apps/portal-gridos`  |
| OCPP edge            | `@grid-platform/ocpp`          | `apps/ocpp`           |

Use this build command, substituting the last two values:

```text
bun install --frozen-lockfile && bun run check:worker <workspace> <path>
```

Staging deploy command:

```text
bun --cwd <path> run deploy:staging
```

Preview deploy command:

```text
bun --cwd <path> run deploy:preview
```

Production deploy command on the protected `production` branch:

```text
bun --cwd <path> run deploy:production
```

Configure build watch paths as `<path>/*, packages/*, package.json, bun.lock, turbo.json, tsconfig.base.json`.

## Promotion

1. Confirm the exact SHA is the current reviewed commit on `origin/main` and its required Cloudflare check succeeded.
2. Fast-forward the protected `production` branch to that SHA through an approved pull request or protected branch update.
3. Cloudflare reruns the same frozen install and checks, then deploys production.
4. Smoke-test the declared production URL and record the Worker version ID and Git SHA in DEV-50 or its successor issue.

## Rollback

Use Workers Versions and Deployments to roll back to the previous version, then verify the health endpoint and primary route. A code rollback does not undo database migrations, deleted bindings, or Durable Object migrations; those require a forward-compatible data plan.

## Provisioning gate

Before the first staging deployment, replace the placeholder Hyperdrive and KV IDs, create staging and production queues/R2 buckets, set runtime secrets in Cloudflare, and confirm custom-domain ownership. No credential belongs in Git.
