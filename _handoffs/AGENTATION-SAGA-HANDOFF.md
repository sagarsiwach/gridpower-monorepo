# Handoff — Agentation on GridEnergy staging (master server on SAGA)

**For:** a Codex (or Claude) session, run by Sagar.
**Goal:** Stand up a public **master Agentation server on SAGA**, expose it at
`https://feedback.gridenergy.co.in`, embed the Agentation toolbar on the
GridEnergy **staging** site only, and repoint the local Agentation MCP to read
the SAGA store — so annotations made on `staging.gridenergy.co.in` flow to an
agent's `agentation_watch_annotations` loop.

> Work the repo part in this worktree, NOT the main repo:
> `~/Developer/Work/gridenergy/gridenergy-website-wt/agentation/`
> Branch: `sagar/gridenergy-agentation-widget` (based on `sagar/gridenergy-cf-deploy`).
> MUST commit + push to that branch before ending. Remote:
> `github.com:sagarsiwach/gridpower-monorepo.git`. PRs target `main`.

---

## 0. Context you need (already true today, 2026-06-24)

**GridEnergy site is LIVE on Cloudflare Workers:**
- Repo: `~/Developer/Work/gridenergy/gridenergy-website`, app at `apps/www`.
  Stack: React Router 7.16 (SSR at edge via `@cloudflare/vite-plugin`), Vite 6,
  Tailwind v4. **Needs Node 22** — use `fnm`:
  `export PATH="/Users/sagardas/.local/share/fnm/node-versions/v22.22.3/installation/bin:$PATH"`.
- Live: `gridenergy.co.in` + `www.gridenergy.co.in` → worker `gridenergy-www`.
- Staging: `staging.gridenergy.co.in` → worker `gridenergy-www-staging`.
- Deploy: `cd apps/www && bun run deploy` (prod) / `bun run deploy:staging`.
- Server entry is custom for Workers: `apps/www/src/entry.server.tsx`
  (`renderToReadableStream`). Root is `apps/www/src/root.tsx`. Routes in
  `apps/www/src/routes.ts`. `appDirectory: "src"`.
- The bare **`gridenergy.in`** is a GoDaddy parked domain — NOT ours. Everything
  is on **`gridenergy.co.in`** (Cloudflare).

**Agentation, how it actually works (verified):**
- Server package: `agentation-mcp` v1.2.0 (`npx agentation-mcp server`). Runs TWO
  things from one process: an **HTTP server on `:4747`** (receives annotations
  from the browser toolbar, REST API) and an **MCP stdio server** (tools for the
  agent). Store = **SQLite** at `~/.agentation/store.db` (dep: `better-sqlite3`).
- Decoupling flags (this is the whole trick):
  - `--mcp-only` — run ONLY the MCP, no HTTP server.
  - `--http-url <url>` — MCP fetches sessions from a REMOTE HTTP server.
  - `--port <port>` — HTTP port (default 4747).
- Toolbar (browser overlay) = the **`agentation`** npm package, a React component
  `<Agentation endpoint={url} />`. It POSTs annotations to the HTTP server's
  REST API (`POST /sessions`, `POST /sessions/:id/annotations`, etc.).
- Env vars: `AGENTATION_STORE` (`sqlite`|`memory`, default sqlite),
  `AGENTATION_WEBHOOK_URL`, `AGENTATION_WEBHOOKS` (comma list),
  `AGENTATION_EVENT_RETENTION_DAYS` (default 7).
- A hosted cloud option exists (`agentation-mcp-cloud.vercel.app/api`) — IGNORE it,
  we self-host on SAGA per decision.

**Reference embed already in the codebase** (copy this pattern):
`~/Developer/kabira/km-website-nextjs/src/components/AgentationWidget.tsx`:
```tsx
'use client'
import { Agentation } from 'agentation'
const ENDPOINT = process.env.NEXT_PUBLIC_AGENTATION_URL ?? 'http://100.112.239.117:4747'
export function AgentationWidget() { return <Agentation endpoint={ENDPOINT} /> }
```
Mounted in `km-website-nextjs/src/app/(site)/layout.tsx` (line ~114).
`100.112.239.117` = **Sagar's Mac Tailscale IP** — the server runs there today,
which is why a public HTTPS site can't use it (mixed content + not internet-
reachable). Hence: move the master to SAGA.

---

## 1. Credentials — where everything lives

All in the Obsidian vault unless noted. **Do not paste secrets into git.**

| Need | Location |
|---|---|
| Cloudflare master token, account ID, zone IDs | `~/Documents/0. Obsidian/_Credentials/cloud/cloudflare.md` |
| ↳ Account ID | `46b24d64e78fa92cb6db28a0170732de` |
| ↳ `gridenergy.co.in` zone ID | `27b2b88468e9483c5db04530fa3e134a` |
| ↳ Master API token (Workers, account-level) | in that file — "Master Token - Sagar Siwach". CAN deploy workers + attach custom domains via `PUT /accounts/{acct}/workers/domains`. CANNOT write zone Workers-routes or read zone DNS. |
| ↳ DNS zone token (read/write DNS) | in that file — "classicgroup.asia DNS Edit", scope Zone>DNS>Edit, confirmed for gridenergy.co.in. Use THIS for DNS reads/writes. |
| ↳ Cloudflare Tunnel run tokens | in `cloudflare.md` (the `eyJ...` run-token rows) |
| SAGA Coolify API token | on SAGA host at `/opt/coolify-api-token.txt` |
| SAGA SSH login | **Sagar provides** — IP is `100.92.248.89` (Tailscale). `ssh sagardas@…` and `ssh sagar@…` BOTH FAIL ("failed to look up local user"). Get the correct user from Sagar before step 2. |

The gridenergy Cloudflare **Tunnel ID** is `9b42c596-12f5-4ccf-a0ac-2d46917b793c`
(today it backs `app.gridenergy.co.in` and `mcp.gridenergy.co.in`, both
`CNAME → 9b42c596-…cfargotunnel.com`, proxied). **Confirm which host runs this
tunnel's `cloudflared`** — the Agentation server must be reachable from that host
(ideally co-located). If that tunnel is NOT on SAGA, either (a) run the Agentation
server on whatever host runs the tunnel, or (b) add a NEW tunnel on SAGA for
`feedback.gridenergy.co.in`.

---

## 2. SAGA — run the master Agentation server (needs SAGA SSH)

SSH: `ssh <user>@100.92.248.89` (user from Sagar). SAGA is a Docker host running
Coolify. Pick ONE of these:

**Option A — plain Docker (simplest, recommended):**
```bash
# on SAGA
mkdir -p /opt/agentation/data
docker run -d --name agentation --restart unless-stopped \
  -p 127.0.0.1:4747:4747 \
  -v /opt/agentation/data:/root/.agentation \
  -e AGENTATION_STORE=sqlite \
  node:22-alpine sh -c "npx -y agentation-mcp@1.2.0 server --port 4747"
# verify
curl -s http://127.0.0.1:4747/status   # -> {"mode":"local",...}
```
(Bind to `127.0.0.1` so only the tunnel reaches it; the public edge is Cloudflare.)

**Option B — Coolify app:** create a Docker service, command
`npx -y agentation-mcp@1.2.0 server --port 4747`, persistent volume mounted at
`/root/.agentation`, internal port 4747. Coolify API token at
`/opt/coolify-api-token.txt`.

### 2b. Expose via Cloudflare Tunnel → `feedback.gridenergy.co.in`
If the `9b42c596` tunnel runs on SAGA, add an ingress rule (config-file tunnels:
edit `/etc/cloudflared/config.yml` or the dir cloudflared uses; or set via the
Cloudflare Zero Trust dashboard for dashboard-managed tunnels):
```yaml
ingress:
  - hostname: feedback.gridenergy.co.in
    service: http://localhost:4747
  # ...existing rules (app, mcp)...
  - service: http_status:404
```
Then add the DNS route (uses tunnel ID, proxied CNAME):
```bash
cloudflared tunnel route dns 9b42c596-12f5-4ccf-a0ac-2d46917b793c feedback.gridenergy.co.in
# OR create the proxied CNAME via API with the DNS zone token:
#   CNAME feedback -> 9b42c596-12f5-4ccf-a0ac-2d46917b793c.cfargotunnel.com (proxied=true)
```
Restart cloudflared if it's a config-file tunnel.

### 2c. CORS (critical)
The toolbar runs on `https://staging.gridenergy.co.in` and calls
`https://feedback.gridenergy.co.in`. Confirm the Agentation HTTP server returns
permissive CORS (`Access-Control-Allow-Origin`). Test:
```bash
curl -si https://feedback.gridenergy.co.in/status \
  -H 'Origin: https://staging.gridenergy.co.in' | grep -i access-control
```
If headers are missing, front it with a tiny CORS shim (Caddy/nginx) or a
Cloudflare Transform/Workers rule adding the header for that hostname. Don't skip
this — without it the browser silently blocks the POSTs.

**Verify step 2 done:**
`curl -s https://feedback.gridenergy.co.in/status` returns JSON over HTTPS.

---

## 3. Repo — staging-only Agentation widget (do this in the worktree)

Worktree: `~/Developer/Work/gridenergy/gridenergy-website-wt/agentation/`,
app `apps/www`. Use Node 22 (fnm path above) and `bun`.

```bash
cd ~/Developer/Work/gridenergy/gridenergy-website-wt/agentation/apps/www
bun add agentation
```

Create `apps/www/src/components/AgentationWidget.tsx`:
```tsx
import { useEffect, useState } from "react";
import { Agentation } from "agentation";

// Staging-only visual feedback toolbar. Renders ONLY on the staging host (and
// localhost/tailnet for local testing) — never on the live site. Endpoint is the
// SAGA master server; override with VITE_AGENTATION_URL at build time.
const ENDPOINT =
  import.meta.env.VITE_AGENTATION_URL ?? "https://feedback.gridenergy.co.in";

const ALLOWED_HOSTS = new Set([
  "staging.gridenergy.co.in",
  "localhost",
  "127.0.0.1",
  "100.112.239.117", // Sagar's Mac (tailnet dev)
]);

export function AgentationWidget() {
  // Client-only: the site SSRs on Workers, so never render this during SSR.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  if (!ALLOWED_HOSTS.has(window.location.hostname)) return null;
  return <Agentation endpoint={ENDPOINT} />;
}
```

Mount it in `apps/www/src/root.tsx` — render `<AgentationWidget />` just before
`<Scripts />` inside the `<body>` of the `Layout` component (import at top:
`import { AgentationWidget } from "./components/AgentationWidget";`). Read the file
first; match its existing structure. Keep it inside `<body>` so it hydrates.

**Build + verify locally (real Workers runtime):**
```bash
export PATH="/Users/sagardas/.local/share/fnm/node-versions/v22.22.3/installation/bin:$PATH"
bun run build
./node_modules/.bin/wrangler dev --port 8799 --local &
curl -s http://localhost:8799/ | grep -i agentation   # widget script present
# Open http://localhost:8799/ in a browser on the tailnet; toolbar should appear
# (endpoint will hit the Mac server at :4747 unless VITE_AGENTATION_URL is set).
```

**Deploy staging:**
```bash
cd apps/www
export CLOUDFLARE_API_TOKEN="<master token from _Credentials/cloud/cloudflare.md>"
export CLOUDFLARE_ACCOUNT_ID="46b24d64e78fa92cb6db28a0170732de"
VITE_AGENTATION_URL="https://feedback.gridenergy.co.in" bun run deploy:staging
```
> IMPORTANT: only deploy `:staging` here. Do NOT `bun run deploy` (prod) with the
> widget unless Sagar explicitly wants the toolbar on the live site — the host
> guard already prevents it rendering on prod, but keep prod builds clean.

**Verify step 3 done:** load `https://staging.gridenergy.co.in`, the toolbar
renders; annotate an element; it appears via the REST API on the SAGA server
(`curl https://feedback.gridenergy.co.in/sessions`). Confirm `https://gridenergy.co.in`
(prod) does NOT show the toolbar.

Commit + push:
```bash
git add -A && git commit -m "feat(www): staging-only Agentation feedback toolbar"
git push -u origin sagar/gridenergy-agentation-widget
```
(No AI-attribution lines in commits.)

---

## 4. Repoint the Agentation MCP to the SAGA store

So the agent's `agentation_watch_annotations` reads SAGA (where staging
annotations land), not the Mac's local store.

Edit `~/.claude.json` →
`projects."/Users/sagardas/Documents/0. Obsidian".mcpServers.agentation`.
Change args from `["agentation-mcp","server"]` to:
```json
{ "type": "stdio", "command": "npx",
  "args": ["agentation-mcp", "server", "--mcp-only", "--http-url", "https://feedback.gridenergy.co.in"],
  "env": {} }
```
Restart the Claude Code session for it to take effect. Verify with
`agentation_list_sessions` (should show sessions created from staging).

> Trade-off Sagar already approved: after this, the MCP no longer reads the Mac's
> local `~/.agentation/store.db`. If you want BOTH local-dev and SAGA, keep two
> MCP entries (e.g. `agentation` → local, `agentation-saga` → `--http-url`).

---

## Definition of done
1. `https://feedback.gridenergy.co.in/status` → JSON over HTTPS (SAGA server, CORS OK).
2. `staging.gridenergy.co.in` shows the toolbar; annotations land on SAGA.
3. `gridenergy.co.in` (prod) shows NO toolbar.
4. MCP repointed; `agentation_list_sessions` shows staging sessions.
5. Branch `sagar/gridenergy-agentation-widget` pushed; PR to `main`.

## Gotchas (learned the hard way)
- Node 22 mandatory (wrangler 4). fnm path above.
- The vite-plugin `-e staging` flow does NOT make a separate worker — deploy uses
  `--name` (already baked into the `deploy`/`deploy:staging` scripts).
- The CF **master token cannot read zone DNS or write Workers routes** — use the
  **DNS zone token** for DNS, and the account-level `workers/domains` API for
  custom domains (already done for the site; you only need DNS for `feedback`).
- Widget must be client-only (SSR on Workers will crash on `window`); the
  `mounted` guard handles it.
- CORS is the most likely silent failure. Test it explicitly (step 2c).
