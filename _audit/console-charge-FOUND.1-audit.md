# FOUND.1 — `apps/console-charge` Audit

> Diagnostic-only pass per `$impeccable audit`. Findings are documented; fixes happen in subsequent passes.

## Audit Health Score

| # | Dimension | Score | Key Finding |
|---|-----------|-------|-------------|
| 1 | Accessibility | **2/4** | Missing aria-labels on icon buttons; weak heading hierarchy; sparse focus states |
| 2 | Performance | **3/4** | Clean build (440 KB gzip); recharts lazy-loaded; tables un-virtualized |
| 3 | Theming | **1/4** | Light mode is broken — `ConsoleShell`, `dashboard`, `login` use raw `dark-N` classes with no `sand-N` counterpart |
| 4 | Responsive | **1/4** | Zero breakpoints across 13 of 15 files; desktop-only; fixed-px table widths |
| 5 | Anti-Patterns | **3/4** | Em-dashes in user-facing copy (5+ sites); 4 inline hex values; otherwise clean |
| **Total** | | **10/20** | **Acceptable — significant work needed** |

## Anti-Patterns Verdict

**Pass.** This does not look AI-generated. The console reads as a deliberate operator dashboard, not a SaaS template. No gradient text, no glassmorphism, no hero-metric template, no identical card grids. The aesthetic intent is clear (Linear / Vercel-grade operational chrome).

The two anti-pattern violations against the *project's own* anti-list:

1. **Em-dashes in user-visible copy** — 5+ sites. PRODUCT.md says "no em-dashes". Examples:
   - `dashboard.tsx:378` — `title="Revenue — Last 30 days"`
   - `dashboard.tsx:393` — `title="Utilisation heatmap — this week"`
   - `settings.tsx:132` — `defaultValue="Goa, Goa — 403 722"`
   - `StationDetailPanel.tsx:85` — port title template `P${n} — ${type} — ${status}`
2. **Hard-coded hex outside brand SVG** — `StationDetailPanel.tsx:55–58` has `dark:bg-[#1a3d2a]` and `dark:bg-[#3a1010]` that should be tokens.

Comments contain dozens of em-dashes — those are author-facing, low priority.

## Executive Summary

- Audit Health Score: **10 / 20** (Acceptable)
- Issues found: **3 P1**, **6 P2**, **5 P3**
- Top 3 critical:
  1. Light mode is non-functional on ConsoleShell + Topbar + ThemeToggle (P1, theming)
  2. Console has no responsive breakpoints — broken below ~1024 px (P1, responsive)
  3. Most icon-only buttons lack `aria-label` (P1, a11y)

Recommended path: **theming first**, then **responsive**, then **a11y**, then polish.

## Detailed Findings by Severity

### P1 — Major

**[P1] Light mode broken on shell chrome**
- **Location**: `src/components/ConsoleShell.tsx` (ThemeToggle button, Breadcrumb component); `src/routes/$.tsx:10` (404)
- **Category**: Theming
- **Impact**: Light mode users see invisible/low-contrast text in topbar + theme toggle. Dark-mode-only classes (`text-dark-11`, `border-dark-6`, `text-dark-12`) have no light-mode pair.
- **Recommendation**: Replace raw `dark-N` references with semantic tokens (`text-foreground`, `border-border`) OR add explicit pairs (`text-sand-11 dark:text-dark-11`).
- **Suggested command**: `$impeccable polish` (theming sub-task) → `$impeccable typeset` for text classes.

**[P1] No responsive breakpoints**
- **Location**: All 5 routes + `_shell.tsx`. Only `dashboard.tsx` has 2 `sm:`/`md:` uses.
- **Category**: Responsive
- **Impact**: Console is unusable below ~1024 px width. Sidebar fixed at 220 px, no collapse to icon-only or drawer mode. Tables overflow.
- **Recommendation**: Define explicit breakpoints in DESIGN.md (mobile ≤640, tablet 641–1024, desktop ≥1025), then add `sm:` / `md:` / `lg:` variants per surface. Sidebar collapses to 64 px at `<lg`, drawer at `<md`.
- **Suggested command**: `$impeccable adapt`.

**[P1] Icon-only buttons missing aria-label**
- **Location**: ConsoleShell topbar (notifications, user avatar, search), action buttons in tables (`…` menus, `Ack` buttons)
- **Category**: Accessibility
- **Impact**: Screen reader users can't identify button purpose. WCAG 2.1 SC 4.1.2 (Name, Role, Value) violation.
- **Recommendation**: Add `aria-label` to every `<button>` whose visible content is only an icon. Audit all 15 files.
- **Suggested command**: `$impeccable harden` (a11y sub-task).

### P2 — Minor

**[P2] Em-dashes in user-visible strings**
- **Location**: 5+ sites listed above
- **Category**: Anti-Pattern (project rule)
- **Impact**: Violates PRODUCT.md voice rule.
- **Recommendation**: Replace with comma + space, colon, or restructure.
- **Suggested command**: `$impeccable clarify`.

**[P2] Tables not virtualized**
- **Location**: `stations._index.tsx`, `dashboard.tsx` (recent sessions), `analytics.tsx` (station performance), `fleet.tsx`
- **Category**: Performance
- **Impact**: Smooth at current mock sizes (15–50 rows). Will degrade at real-world scale (500+ stations, 10k+ sessions).
- **Recommendation**: Add `@tanstack/react-virtual` for tables >100 rows. Defer until real data arrives.
- **Suggested command**: `$impeccable optimize`.

**[P2] Empty / loading / error states missing**
- **Location**: All list routes — stations, sessions (when added), analytics, fleet, settings tables
- **Category**: Anti-pattern (project rule), UX completeness
- **Impact**: When the API returns empty / loading / errored, the screen will be a confusing void.
- **Recommendation**: Use `EmptyState` from `@gridpower/ui` (already exported). Each list needs three states.
- **Suggested command**: `$impeccable onboard`.

**[P2] Heading hierarchy is shallow**
- **Location**: Only 3 files use `<h1>`-`<h6>`. Most route titles are styled `<div>` or `<p>`.
- **Category**: Accessibility, Semantic HTML
- **Impact**: Screen readers can't skim by heading. SEO degraded (less critical for authenticated console).
- **Recommendation**: Each route page = one `<h1>` (the page title in topbar breadcrumb), section panels = `<h2>`, card titles = `<h3>`.
- **Suggested command**: `$impeccable harden`.

**[P2] Hardcoded hex in StationDetailPanel**
- **Location**: `src/components/StationDetailPanel.tsx:55–58`
- **Category**: Theming
- **Impact**: Won't follow theme changes; bypasses token system.
- **Recommendation**: Add tokens `--bg-success-deep` and `--bg-error-deep` (or reuse `--color-success-bg` / `--color-error-bg` mixed darker). Use semantic.
- **Suggested command**: `$impeccable polish`.

**[P2] Fixed-px column widths in tables**
- **Location**: `stations._index.tsx:401-407` (`w-[130px]`, `w-[120px]`, etc)
- **Category**: Responsive
- **Impact**: Doesn't reflow under content pressure or smaller widths.
- **Recommendation**: Use `min-w-` + flexible widths; let column auto-fit on small screens.
- **Suggested command**: `$impeccable adapt`.

### P3 — Polish

**[P3] Theme toggle button is 11 px / 22 px tall**
- **Location**: `ConsoleShell.tsx:60` — `px-2 py-1 text-[11px]`
- **Category**: A11y (touch target), visual rhythm
- **Impact**: Touch target ~22 px tall; below WCAG 2.5.5 minimum 24 px (AA Level AAA: 44 px).
- **Recommendation**: Bump to `h-8` (32 px) minimum.
- **Suggested command**: `$impeccable polish`.

**[P3] Em-dashes in code comments**
- **Location**: ~30 sites across routes/components
- **Category**: Anti-pattern (style)
- **Impact**: Author-facing only. Inconsistent with project rule but no user impact.
- **Recommendation**: Sweep at the end. Low priority.
- **Suggested command**: `$impeccable polish` (final pass).

**[P3] Decorative card-corner labels**
- **Location**: `dashboard.tsx` revenue card has small label decorations
- **Category**: Visual hierarchy
- **Impact**: Marginal; could simplify.
- **Suggested command**: `$impeccable distill`.

**[P3] Inconsistent button sizes across screens**
- **Location**: `Continue` button on login uses default size; `Ack` buttons in alerts use compact; `Export CSV` uses normal
- **Category**: Visual consistency
- **Impact**: Reads as inconsistent visual rhythm.
- **Suggested command**: `$impeccable polish`.

**[P3] Mock auth allows direct entry — no real session contract**
- **Location**: `lib/auth.tsx`, `RequireAuth.tsx`
- **Category**: A11y (no auth state for SR), UX (no logout flow visible)
- **Impact**: Dev-only mock; expected. Document that real auth lands later.
- **Suggested command**: `$impeccable harden` (when real auth ships).

## Patterns & Systemic Issues

1. **Dark-mode-first to a fault.** The project intent is "dark default, light supported", but light mode was clearly not tested. Every shell component uses `dark-N` directly. Solution: enforce semantic aliases (`--text-body`, `--bg-page`) over raw scale; or pair every `dark-N` with `sand-M`.
2. **No responsive plan.** Zero breakpoints in 13/15 files indicates this was never considered. Need a one-time DESIGN.md addition (breakpoint table) and an `$impeccable adapt` pass per route.
3. **A11y was an afterthought.** Aria coverage is sparse and inconsistent. One systemic pass via `$impeccable harden` will yield more than per-PR fixes.
4. **Em-dashes are everywhere.** Reflex of writing prose comments quickly. Easy sweep at polish time.

## Positive Findings

- Token system is comprehensive and well-organized.
- shadcn primitives are consumed correctly via `@gridpower/ui` (no rogue inline components).
- Build is clean: 440 KB gzip, recharts code-split, no dependency bloat.
- `EmptyState`, `StatCard`, `StatusBadge`, etc are already in `packages/ui` — gaps are usage gaps, not missing components.
- No anti-pattern visual signatures (gradient text, glass, hero metrics, identical cards).
- Mock data is plausible and well-structured — easy to swap for real APIs later.

## Recommended Actions (priority order)

1. **[P1] `$impeccable polish`** — fix light mode on ConsoleShell + Topbar + ThemeToggle + 404. Replace raw `dark-N` with semantic tokens or paired sand:dark variants.
2. **[P1] `$impeccable adapt`** — add responsive breakpoints across all routes; make sidebar collapse + drawer; flexible table columns.
3. **[P1] `$impeccable harden`** — sweep aria-labels + heading hierarchy + form labels across all surfaces.
4. **[P2] `$impeccable clarify`** — replace user-facing em-dashes with commas/colons/restructured copy.
5. **[P2] `$impeccable onboard`** — add empty / loading / error states to every list and table.
6. **[P3] `$impeccable distill`** — strip decorative label corners on the dashboard revenue card; simplify card variations.
7. **[P3] `$impeccable optimize`** — defer table virtualization until real data; document the threshold.
8. **[Final] `$impeccable polish`** — em-dash sweep in comments + visual consistency pass + button-size unification.

## What this pass does NOT cover

- **Bundle inspection** beyond `wrangler deploy --dry-run` numbers. A `$impeccable optimize` pass would profile in-browser.
- **Lighthouse run** on the deployed worker. Run separately via Chrome DevTools MCP.
- **Critique-level** subjective judgment on layout, hierarchy, voice, and persona testing — that's `$impeccable critique` (next pass).

---

Re-run `$impeccable audit` after FOUND.2 → FOUND.5 to verify score improves.
