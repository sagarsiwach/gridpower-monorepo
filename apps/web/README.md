# @gridpower/web

GridPower website — React Router v7 SSR app.

## Local Dev

```bash
pnpm --filter @gridpower/web dev
```

## Build

```bash
pnpm --filter @gridpower/web build
```

## Production start (local)

```bash
pnpm --filter @gridpower/web start
```

## Typecheck

```bash
pnpm --filter @gridpower/web typecheck
```

## Deploy

Deploy target: **Cloudflare Pages** (manual step by Sagar, scheduled 2026-04-26).

### Build settings (Cloudflare Pages dashboard)

| Setting | Value |
|---|---|
| Build command | `pnpm --filter @gridpower/web build` |
| Build output directory | `apps/web/build/client` |
| Root directory | `/` |
| Node version | 20+ |
| Environment variables | (none currently) |

### After Cloudflare Pages project is linked

```bash
pnpm dlx wrangler pages deploy apps/web/build/client --project-name gridpower-web
```

### OG image note

`/og-default.svg` is a placeholder GridRed SVG. Replace with a real 1200x630 PNG at `apps/web/public/og-default.png` (and update meta exports from `.svg` to `.png`) before launch.
