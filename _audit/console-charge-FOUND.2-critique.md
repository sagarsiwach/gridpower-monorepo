# FOUND.2 — `apps/console-charge` Critique

> Subjective design review per `$impeccable critique`. Combines an in-head design-director read with the deterministic detector's automated scan. Diagnostic; no fixes applied.

## Design Health Score (Nielsen's 10 Heuristics)

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of system status | **3/4** | Stat cards show deltas; live charts; alert badges. No global "loading" state visible during route transitions. |
| 2 | Match system / real world | **3/4** | Operator vocabulary used correctly (kWh, sessions, ports, OCPP). One miss: "Utilisation" with British spelling — fine if intentional, inconsistent with US "Stations online". |
| 3 | User control & freedom | **2/4** | No undo on destructive actions (Ack, Refund). No confirmation modals. No keyboard shortcuts. Sidebar collapse not implemented. |
| 4 | Consistency & standards | **2/4** | Mix of native HTML buttons and shadcn `<Button>`; mix of explicit dark classes (`text-dark-12`) and semantic (`text-foreground`); KPI cards inconsistent in alignment between dashboard and analytics. |
| 5 | Error prevention | **2/4** | No empty / error / loading states defined. Mock data hides this. Confirmation absent on irreversible-feeling actions. |
| 6 | Recognition over recall | **3/4** | Sidebar labels visible (no icon-only nav). Breadcrumbs present. Tables show full station/port IDs not just opaque codes. |
| 7 | Flexibility & efficiency | **1/4** | No keyboard shortcuts (`/` for search, `g d` for go-to-dashboard, etc — Linear/Vercel pattern). No saved filters. No bulk actions on tables. Power users will feel constrained. |
| 8 | Aesthetic & minimalist | **3/4** | Restrained palette, good typographic discipline. One lapse: side-stripe accent on alert rows (anti-pattern, see below). Some redundancy in label/value layout (KPI captions could be tighter). |
| 9 | Error recovery | **1/4** | Catch-all `$.tsx` 404 exists but is bare. No app-level error boundary visible. No "report this issue" affordance. |
| 10 | Help & documentation | **0/4** | No help menu, no contextual help, no tooltips on jargon (OCPP, kWh, RFID), no first-run hints. Junior operators will struggle. |
| **Total** | | **22/40** | **Acceptable foundation, several weak heuristics** |

Most real interfaces score 20-32; **22 places this in the lower-middle**. The dashboard *looks* professional but underperforms on the workflow heuristics (control, efficiency, error recovery, help) that make a real operator console feel like Linear or Vercel.

## Anti-Patterns Verdict

**LLM read:** Pass with one violation. The console reads as deliberate operator UI, not AI slop. Sidebar + topbar + content rhythm is correct. Restrained color use, real typographic hierarchy, no decorative chrome. The single violation:

**Deterministic scan** (`npx impeccable --json`):
```
1 finding:
- side-tab accent (P1)
  apps/console-charge/src/routes/dashboard.tsx:96
  Cause: `borderLeft: 3px solid ${alertDotColor(severity)}` on alert rows
```

This is an **absolute ban** in the impeccable shared design laws. The 3 px colored left-border on alert rows is the canonical AI-generated-card tell. Fix: use a full border with elevated background tint for unread alerts, or rely on the existing 8 px dot + bold text. The dot already conveys severity; the stripe is redundant.

**Visual overlays**: Skipped (not running `impeccable live` for this pass; would re-scan deployed URL with browser automation. Defer to final polish.)

## Overall Impression

What works: the **bones** are correct. Sidebar, topbar, KPI cards, charts, tables — all in the right places, scaled correctly, in the right typographic register. The aesthetic intent (Linear/Vercel for India EV operators) is legible.

What doesn't: the **operator's day** isn't designed yet. There's no flow for "I got paged at 2 a.m. — what failed and what do I do." There's no flow for "a customer called about a refund — find their session and refund it." There's no flow for "we're rolling out new tariffs Monday — let me preview the impact." Each screen exists in isolation; the connective tissue (search-from-anywhere, recent items, keyboard navigation, in-page drilldowns) is missing.

The single biggest opportunity: **make the console feel like one app, not five tabs**. Global search, `cmd-k` palette, recent items in sidebar, hover-previews on station/driver/session IDs anywhere they appear.

## What's Working

1. **Token discipline at the foundation.** `packages/tokens/src/tokens.css` is comprehensive and well-organized. The semantic aliases exist; the consoles just don't use them yet.
2. **Recharts wrappers in `@gridpower/ui`.** LineChart / BarChart / HeatmapChart are real domain components. Pure-SVG donut on analytics avoids a known recharts-React-instance bug. Smart trade-off.
3. **Mock data is plausible.** Station IDs (GPWR-Blr-01), session IDs (GC-04312), Indian driver names, ₹ amounts. Easy to swap for real APIs without rewriting the UI.

## Priority Issues

**[P1] Side-stripe accent on alert rows is an absolute ban**
- *Why it matters*: Canonical AI-slop tell. Project DESIGN.md explicitly bans it.
- *Fix*: Remove `borderLeft`. Use the existing 8 px severity dot + bold-on-unread + subtle bg tint to differentiate unread.
- *Suggested command*: `$impeccable polish`.

**[P1] Light mode is non-functional on the shell**
- *Why it matters*: ConsoleShell, ThemeToggle, breadcrumbs use raw `text-dark-11`/`border-dark-6` with no light pair. Toggle the theme: most chrome stays dark-styled.
- *Fix*: Replace raw `dark-N` with semantic aliases (`text-foreground`, `border-border`) or add explicit `sand-N dark:dark-N` pairs.
- *Suggested command*: `$impeccable polish`.

**[P1] Console is desktop-only — no responsive plan**
- *Why it matters*: Field techs triage from phones. Today they see fixed 220 px sidebar + overflowing tables.
- *Fix*: Sidebar collapses to icon-only at <1280, drawer at <768. Tables: horizontal scroll with sticky first column at <1024. Topbar: collapse breadcrumb to a back button at <768.
- *Suggested command*: `$impeccable adapt`.

**[P1] No empty / loading / error states**
- *Why it matters*: When the API returns empty (new operator, no stations yet) or errored (network blip), the screen will be a confusing void. Tables have no skeletons; KPIs have no shimmer.
- *Fix*: `EmptyState` from `@gridpower/ui` already exists — wire it on every list. Add table skeletons. Add toast on fetch errors.
- *Suggested command*: `$impeccable onboard`.

**[P1] No keyboard shortcuts; no command palette**
- *Why it matters*: Power-user heuristic scored 1/4. Linear / Vercel set the bar — operators staring at this dashboard 8 hours a day deserve `/` to focus search, `cmd-k` for everything, `g d` to go to dashboard, `j/k` to step through alerts.
- *Fix*: Add `cmdk`-based palette in topbar; bind primary nav and search; document on `?`.
- *Suggested command*: `$impeccable craft` (new feature) → `$impeccable polish` (states + visual).

**[P2] No contextual help, no tooltips on jargon**
- *Why it matters*: New operators won't know OCPP, kVA, idle fee. Help heuristic scored 0/4.
- *Fix*: Tooltips on technical terms; a "?" key that opens a contextual help drawer; link to docs in topbar.
- *Suggested command*: `$impeccable clarify` + `$impeccable harden`.

**[P2] Inconsistent button + KPI card patterns**
- *Why it matters*: Consistency heuristic scored 2/4. Three different button styles (native, shadcn Button, link-styled span); KPI cards on dashboard center-align the value, analytics left-aligns.
- *Fix*: Unify on shadcn `<Button>` everywhere. One KPI card variant from `@gridpower/ui`, not per-screen.
- *Suggested command*: `$impeccable polish` + `$impeccable extract` (move shared variant to ui).

## Persona Red Flags

**Naveen (Network Operations Manager, 38, 8 hours/day on this dashboard):**
- No `cmd-k` to jump to a station by ID. Today he hunts in the sidebar → Stations → search.
- Three clicks to refund a session: Sessions (doesn't exist yet) → row → refund. Should be 1 click from dashboard alert.
- No saved filter for "stations in Karnataka with >80% utilization today". Has to re-filter every morning.
- No keyboard navigation in alert panel. Has to mouse to Ack each one.

**Priya (Field Tech, 28, on her phone in a parking lot):**
- Sidebar covers half the screen. No way to collapse on mobile.
- Stations table requires horizontal scroll she doesn't notice.
- "Charging" status pill is the right colors, but the port-status chips are tiny on mobile.
- No quick-action FAB ("scan QR to find this charger") — she'd kill for this.

**Anita (Finance back-office, 45, exporting GST reports monthly):**
- Payments page doesn't exist yet. She'd score this 0/4 for her workflow.
- Analytics CSV export downloads a stub blob. Real export must respect filters.
- No date range presets ("last GST quarter", "last fiscal year").

**Ravi (Customer support, 32, on the phone with an angry driver):**
- "Find this driver's last session" requires going to (non-existent) Sessions → search by phone or RFID. Today: impossible.
- No way to refund or comp a session from the support flow.

## Minor Observations

- **Em-dash usage in copy.** Captured in FOUND.1 — same finding here for completeness.
- **`Goa, Goa — 403 722` in settings**: copy reads weirdly with city repeated. Should be `Panaji, Goa 403722`.
- **Session IDs (GC-04312)** are clickable in the recent-sessions table on dashboard but lead nowhere yet — silently broken affordance.
- **"View all →"** as plain text-arrow is fine but inconsistent with the visual rhythm of other section headers. Either align or remove.

## Questions to Consider

1. **What if there were a global `cmd-k`?** Most of the navigation pain disappears. Is this the foundation we want before we build CON.6+?
2. **What if alerts were a first-class screen, not a sidebar panel?** The dashboard becomes a glanceable summary; alerts get their own workflow with ack queue, snooze, escalate.
3. **Does the dashboard need to be the home page, or should it be the *operator's queue* — "things you need to act on right now"?**

## Ask the User (deferred)

This pass is part of a sequential FOUND.* sweep. The action plan is **already locked** (the user requested all impeccable passes in order). I'm not pausing to ask priority questions per the canonical critique flow — instead, the priorities here feed directly into FOUND.3 (polish) → FOUND.6 (adapt) → FOUND.8 (clarify) → FOUND.9 (harden) → FOUND.10 (onboard).

If the user wants to redirect priority before those passes run, this report is the snapshot to argue from.

## Recommended Actions (priority order, mapped to FOUND.* schedule)

1. **[P1] `$impeccable polish` → FOUND.3** — kill side-stripe; fix light mode; unify buttons; reduce KPI variants.
2. **[P1] `$impeccable adapt` → FOUND.6** — responsive across all routes; sidebar collapse; mobile drawer.
3. **[P1] `$impeccable harden` → FOUND.9** — aria-labels, heading hierarchy, error boundaries, focus states.
4. **[P1] `$impeccable onboard` → FOUND.10** — empty / loading / error states everywhere.
5. **[P1] `$impeccable craft` → (deferred to expansion phase)** — `cmd-k` palette, keyboard shortcuts. Big enough to be its own pass.
6. **[P2] `$impeccable clarify` → FOUND.7** — em-dash sweep; copy review; tooltips on jargon.
7. **[P3] `$impeccable distill` → FOUND.8** — strip decorative label corners on KPI cards; tighten redundancies.
8. **[P3] `$impeccable layout` → FOUND.5** — vary spacing rhythm; reduce monotony in dashboard sections.
9. **[Final] `$impeccable polish` → FOUND.12** — em-dash sweep in comments; visual consistency cleanup; final QA.

`$impeccable animate`, `$impeccable optimize`, `$impeccable document`, `$impeccable extract` — handled in their own scheduled passes (FOUND.4, FOUND.11, FOUND.13, FOUND.14).
