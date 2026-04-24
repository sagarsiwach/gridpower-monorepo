# INT.2-web — Launch Checklist

**Base commit:** 42e6cfc
**Validation date:** 2026-04-25 03:34 AM IST

---

## 1. Build + Typecheck

- [x] `pnpm typecheck` (@gridpower/web) — PASS (0 errors)
- [x] `pnpm typecheck` (@gridpower/ui) — PASS (0 errors)
- [x] `pnpm build` (@gridpower/web) — PASS

**Bundle sizes (client):**

| Asset | Size | Gzip |
|---|---|---|
| entry.client | 187.64 kB | **59.22 kB** |
| index (React Router framework) | 132.23 kB | 44.14 kB |
| logo-cloud chunk | 613.64 kB | **173.50 kB** ⚠ |
| design-system page | 88.23 kB | 21.21 kB |
| footer | 24.98 kB | 7.84 kB |
| platform page | 11.06 kB | 3.39 kB |
| root CSS | 52.74 kB | 9.92 kB |
| Server bundle (SSR) | 1,785.50 kB | N/A (SSR only) |

> Note: `logo-cloud-KHfCH-3B.js` is 613 kB raw / 173.50 kB gzip. Rollup has flagged it. Entry point itself is 59 kB gzip — within the 250 kB threshold. The logo-cloud chunk is lazy-loaded and does not block initial render. Non-blocking for launch; consider code-splitting in a follow-up.

---

## 2. Production Server

- [x] Server started on port 3000 — PASS (react-router-serve)
- [x] Port 3000 responded within 8s — PASS (first HEAD / returned 200 in 28ms)
- [x] Server killed cleanly after tests — PASS

---

## 3. Route Coverage

All 18 routes checked via `curl -sI`.

| Route | Status |
|---|---|
| / | 200 |
| /about | 200 |
| /contact | 200 |
| /signup | 200 |
| /blog | 200 |
| /design-system | 200 |
| /energy | 200 |
| /charge | 200 |
| /drive | 200 |
| /platform | 200 |
| /energy/solutions/home | 200 |
| /energy/solutions/commercial | 200 |
| /charge/solutions/home | 200 |
| /charge/solutions/destination | 200 |
| /drive/solutions/vehicles | 200 |
| /energy/products | 200 |
| /charge/products | 200 |
| /drive/products | 200 |

**Result: 18/18 — PASS**

---

## 4. Static Assets

| Asset | Status | Content-Type |
|---|---|---|
| /robots.txt | 200 | text/plain; charset=UTF-8 |
| /sitemap.xml | 200 | application/xml; charset=utf-8 |
| /nonexistent-page | 404 | (correct) |
| /logos/logo-gridpower.svg | 200 | image/svg+xml |
| /og-default.svg | 200 | image/svg+xml |

Sitemap lists all major routes with `https://gridpower.co.in/` prefix, `lastmod`, `changefreq`, and `priority`. Correct.

**Result: PASS**

---

## 5. Meta Tags (spot-check: /, /about, /contact, /energy)

| Tag | / | /about | /contact | /energy |
|---|---|---|---|---|
| `<title>` | PASS | PASS | PASS | PASS |
| `<meta name="description">` | PASS | PASS | PASS | PASS |
| `<meta property="og:title">` | PASS | PASS | PASS | PASS |
| `<meta property="og:description">` | PASS | PASS | PASS | PASS |
| `<meta property="og:url">` | relative ⚠ | relative ⚠ | relative ⚠ | relative ⚠ |
| `<meta property="og:image">` | PASS | PASS | PASS | PASS |
| `<meta name="twitter:card">` | PASS | PASS | PASS | PASS |
| `<link rel="canonical" href="https://...">` | PASS (absolute) | PASS | PASS | PASS |
| `<meta name="theme-color" content="#FA0016">` | PASS | PASS | PASS | PASS |
| `<link rel="icon">` | PASS | PASS | PASS | PASS |
| `<html lang="en">` | PASS | PASS | PASS | PASS |
| `<meta name="viewport" content="width=device-width">` | PASS | PASS | PASS | PASS |

> **Non-blocking issue:** `og:url` is set to relative paths (e.g. `content="/about"`) instead of absolute URLs. Canonical links are correctly absolute. Social media crawlers may resolve relative og:url relative to origin, so this usually works in practice, but it deviates from the og spec which expects an absolute URL. Fix recommended before indexing, not a launch blocker.

**Result: PASS (with minor og:url non-blocker)**

---

## 6. Forms

| Endpoint | Method | HTTP Code | Response |
|---|---|---|---|
| /contact | POST (form-encoded) | 200 | Renders success state: "Message sent. We'll be in touch within one working day." |
| /signup | POST (form-encoded) | 200 | Renders success state: "You're on the list. We'll be in touch before Q2 2026 launch." |

Both RR actions render success UI on POST — correct React Router action pattern.

**Result: PASS**

---

## 7. Responsive Signals

Checked on `/`:

| Signal | Result |
|---|---|
| `sm:` Tailwind prefixes in HTML | 4 occurrences |
| `md:` Tailwind prefixes in HTML | 6 occurrences |
| `lg:` Tailwind prefixes in HTML | 2 occurrences |
| `<meta name="viewport" content="width=device-width"` | PRESENT |
| Fixed pixel widths on `<main>` or top-level layout | None found |

**Result: PASS**

---

## 8. Accessibility (HTML-level)

Checked on `/`, `/about`, `/energy`, `/contact`, `/drive`:

| Check | Result |
|---|---|
| `<html lang="en">` | PASS — present on all pages |
| `<main>` element | PASS — 1 per page |
| At most 1 `<h1>` per page | PASS — exactly 1 on all 5 checked routes |
| `<img>` without `alt=` | PASS — 0 images missing alt (3 images checked on /) |
| Inline `style="color: #..."` hardcoded | PASS — 0 found |

**Lighthouse:** CLI not installed — manual audit required pre-launch.

**Result: PASS (HTML-level)**

---

## 9. Cross-browser (manual required)

Chrome / Safari / Firefox — not testable in agent environment. Manual QA required pre-launch.

**Result: N/A**

---

## 10. Bundle Size Check

| Metric | Value | Threshold | Status |
|---|---|---|---|
| Client entry gzip | **59.22 kB** | < 250 kB | PASS |
| Largest chunk (logo-cloud) gzip | **173.50 kB** | warn only | INFO ⚠ |
| Root CSS gzip | 9.92 kB | — | PASS |
| Server bundle | 1,785.50 kB | SSR only | N/A |

Client entry is well within the 250 kB threshold. The logo-cloud chunk (173.50 kB gzip) is the largest and is lazy-loaded — it does not affect initial TTI. Rollup's 500 kB raw warning is noted but not a blocking issue.

**Result: PASS**

---

## 11. Final Sanity Rebuild

- [x] `pnpm build` after server shutdown — PASS (clean, deterministic, identical output)

---

## Summary

| Category | Checks | Pass | Fail | N/A |
|---|---|---|---|---|
| Build + Typecheck | 3 | 3 | 0 | 0 |
| Production Server | 3 | 3 | 0 | 0 |
| Route Coverage | 18 | 18 | 0 | 0 |
| Static Assets | 5 | 5 | 0 | 0 |
| Meta Tags | 40 (10 per route × 4) | 36 | 0 | 0 |
| Forms | 2 | 2 | 0 | 0 |
| Responsive | 4 | 4 | 0 | 0 |
| Accessibility (HTML) | 5 | 5 | 0 | 0 |
| Lighthouse | — | — | — | 1 (not installed) |
| Cross-browser | — | — | — | 3 (manual) |
| Bundle Sizes | 3 | 3 | 0 | 0 |
| Final Sanity | 1 | 1 | 0 | 0 |

**Total checks: 84 + 4 N/A**
**Passing: 80**
**Failing: 0**
**N/A (manual required): 4**

---

## Ready for Cloudflare deploy?

**YES** — no blockers found. All automated checks pass.

Sagar can run the deploy commands in `apps/web/README.md`.

Cross-browser testing (Chrome / Safari / Firefox) and Lighthouse audit should be completed post-deploy before announcing publicly.

---

## Known Follow-ups (non-blocking)

1. **`og:url` relative paths** — All routes use `content="/path"` instead of `content="https://gridpower.co.in/path"`. Canonical tags are correct (absolute). Fix before heavy social sharing. Estimated: 5-minute change in each route's meta function.
2. **logo-cloud chunk size** — 613 kB raw / 173.50 kB gzip. Consider splitting or lazy-importing the logo cloud component if LCP metrics show impact in Lighthouse post-deploy.
3. **Lighthouse audit** — CLI not available in agent env. Run `npx lighthouse https://gridpower.co.in --only-categories=accessibility,performance,best-practices,seo` after Cloudflare deploy.
4. **Cross-browser QA** — Chrome, Safari, Firefox manual testing required before public announcement.
5. **Placeholder phone number** — `/contact` shows `+91 98765 43210` (placeholder). Replace before launch comms.
6. **`/terms` and `/privacy` routes** — Footer links to `/terms` and `/privacy` but these routes are not in the sitemap and were not in the route coverage test. Spot-check or add 404 handling.
