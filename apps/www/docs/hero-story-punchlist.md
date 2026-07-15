# GridEnergy Homepage — Hero + Story Punch-list

Running log for the hero globe + "why storage" scrollytelling section.
Branch: `sagar/gridenergy-cf-deploy` · app: `apps/www`

_Last updated: 03 July 2026, 04:01 PM IST_

---

## HERO GLOBE

### Done
- Denser, finer, smaller continent dots — `mapSamples` 28000 → 42000 (`CobeGlobe.tsx`).
- Rim now melts into the page — sphere `baseColor` changed from pure white `[1,1,1]`
  to olive-50 `[0.976,0.976,0.966]` (matches `pageBg`). This was the real cause of the
  "edge fade doesn't integrate" complaint: a white sphere on a warm-olive page.
- Globe / button clash fixed — globe moved DOWN (translateY `44%` → `53%`), size kept.
  (An earlier lift to `44%` caused the overlap; reversed.)
- Mock connector routes added — 14 native cobe arcs between the 12 cities
  (`ARCS` in `CobeGlobe.tsx`), each with an `id`, GridRed, `arcHeight` 0.35,
  `arcWidth` 0.7. Native library feature, driven by data.
- Markers ON — `MARKERS` at all 12 cities, native cobe markers, GridRed, size 0.05,
  each with an `id`. Auto-projected + hidden on the back.
- Rotation speed reduced — `phi += 0.005` -> `0.002` (slower auto-spin).

### Library discipline (corrected 03 Jul)
- `cobe@latest` === **2.0.1** (npm dist-tag), which is what's installed. Nothing to
  install; the docs at cobe.vercel.app describe exactly this build.
- Native API in this build: `markers`, `arcs` (+ `arcColor`/`arcWidth`/`arcHeight`),
  `markerElevation`, per-item `id`, and the CSS-anchor label utility
  (`--cobe-<id>` / `--cobe-visible-<id>`). Drive all of it by DATA, not by editing core.
- `focusLocation` is NOT a cobe option (not in docs or dist). Center-on-India = `phi`/`theta`.
- Vendor patch reduced back to ONE line (red continents) — the only thing cobe can't do
  via config. Reverted the self-added square-marker shader hack. Markers are native round.
- `mapSamples` 42000 -> 40000.
- Added `id`s to all markers + arcs now → tomorrow's native anchor labels just attach.

### Dial Kit wired (globe)
- `useDialKit("HeroGlobe", GLOBE_DIALS)` in `CobeGlobe.tsx` — shows as a folder in the
  shared Dial Kit panel (StoryFlow renders the `DialRoot`; dev only).
- Live knobs: `mapSamples`, `markerSize`, `markerElevation`, `arcWidth`, `arcHeight`,
  `diffuse`, `scale`, `theta`, `spin`. All applied via `globe.update()` (two-phase:
  scalars first, then re-pass arcs/markers so the arc buffer repacks with fresh values).
- New defaults fix the heavy tangle: `arcHeight` 0.35 -> 0.12, `arcWidth` 0.7 -> 0.3,
  `markerSize` 0.05 -> 0.03. Tune live, then write the winners back into `GLOBE_DIALS`.
- Typed the vendored build via `cobe-gridred.d.ts` (uses cobe's own `COBEOptions`/`Globe`).

### LOCKED (03 Jul PM) — Sagar's tuned globe
- Dial defaults baked into `GLOBE_DIALS`: mapSamples 45000, markerSize 0.01,
  markerElevation 0, arcWidth 0.15, arcHeight 0.2, diffuse 1, scale 1.1,
  theta -0.2, spin 0.0005.
- Markers + arcs are now **black** (`markerColor`/`arcColor` = [0,0,0]).
- **Global mesh** — 14 cities (6 Indian + Dubai/Singapore/London/NewYork/Tokyo/
  Sydney/Frankfurt/SF), 16 arcs radiating from India. Not India-only anymore.
- **Code chips** — rectangular black boxes w/ 3-letter codes + tail, thin white
  Inter (cobe-playground style, black not blue). Rendered as an HTML overlay,
  positioned each frame by our OWN projection (`project()` mirrors cobe's marker
  transform) — cross-browser, NOT the Chrome-only CSS-anchor utility. Front/back
  culled via the same depth test cobe uses. `.ge-globe-chip` style is in the file.
- Verified live in Chrome: chips sit on markers, hide on the back, arcs black.

### Still open
- Orientation: front view at load is phi=0. If Sagar wants India centered at load,
  add a phi offset (deferred "CSS centers"). Not requested yet.
- Story section (StoryFlow): deferred until Sagar has the scenes ready.

### To eyeball / decide
- [ ] Confirm the globe no longer touches the CTA buttons at common viewport heights.
- [ ] Edge-fade colour: judgment call — say if it should read warmer or cooler.
- [ ] Final globe size + vertical position — lock once the clash is clean.

### Parked (needs a decision)
- [ ] **Hexagonal / honeycomb pattern.** cobe draws circular dots at Fibonacci-sphere
      positions.
      - Hexagon-shaped dots = a shader tweak, but ~invisible at this density → low payoff.
      - True honeycomb over the sphere = a different renderer (three.js icosphere or a
        hexbin texture) → its own mini-project. NOT a quick cobe tweak.
      - Recommendation: keep dots unless we commit to the honeycomb as a separate task.

### Next thread (discussion, not built)
- [ ] **Which data points to highlight on the globe, and how.** Markers array is wired
      but empty. Decide: deployment cities? live-site pulses? arcs? Then how they read
      (colour, size, label, hover).

---

## "ONE PLATFORM, EVERY KIND OF SITE" — audiences section

New component `components/marketing/PlatformAudiences.tsx`, wired into
`HomeFoundation.tsx` (replaced the old 5-card `<Section>` Audiences block).

### Built (03 Jul) — REDESIGNED to full-bleed image bands
- Kicker overline "Who it's for" REMOVED. Title kept: "One platform, every kind
  of site." + one-line intro (on olive header above the bands).
- Six audience BANDS, one after another. Each band = full-bleed, `minHeight:800`
  image container: audience photo fills it, cinematic scrim keeps text legible,
  white label block top-left (icon chip, NN index, name, tagline) + "All <x>
  solutions" glass pill top-right, and the four real spokes as FROSTED-GLASS
  tiles riding the bottom. Order: Home · Office · Industrial · Institute ·
  Enterprise · Hospitality.
- 24 tiles total; copy from the real hub carousels; every tile links to a
  REGISTERED route (routes.ts) — no invented links.
- Imagery: `image?` field per audience. Home uses the real render
  `/images/solutions/homes-large.png`. The other five have NO photo yet → render
  a branded "<NAME> PHOTOGRAPHY — TBD" placeholder backdrop. Drop a path into
  `image` and the band lights up, nothing else to change.
- Responsive: <900px drops fixed height + 2-col rail; <560px single-col.
- Verified live on :5173 (Home real photo + Office placeholder both good).
  `Rise` reveal is the site-standard whileInView (reveals on natural scroll).

### Sticky scroll-stack (03 Jul)
- Bands are now a CSS **sticky scroll-stack** ("stacking cards"): each band is
  `position: sticky; top: 0; height: 100vh`. As you scroll, each pins to the
  viewport and the NEXT band scrolls up and covers it (later DOM paints on top).
  Home stays put, Office covers it, … through all six, then the 6th un-pins and
  the page continues. Pure CSS, no JS/scroll-listener. Soft top shadow hints the
  overlap. Verified live (Home→Office and Enterprise→Hospitality hand-offs).
- Disabled under 900px and for prefers-reduced-motion → bands fall back to normal
  vertical stacking (`position: static; height: auto`).
- Requires no `overflow:hidden` on ancestors (HomeFoundation root + section are
  clean). Each band is opaque (full image + ink bg) so the cover reads solid.

### Perf pass (03 Jul) — page felt heavy
- Removed ALL `backdrop-filter: blur()` (24 spoke tiles + label chips + pills =
  ~36 live blur layers over sticky images). Biggest scroll-jank source. Replaced
  with solid translucent panels — near-identical look.
- Image weight: `homes-large.png` (1.8 MB) → `home-hero.webp` (**69 KB**, 1600px,
  cwebp q80) from Sagar's new render. `REFERENCE_IMAGE` + Home `image` both point
  to it. ~30× lighter; one cached file across all six preview bands.
- Lighter single box-shadow on cards (was a double heavy shadow).
- DialKit panel hidden (`SHOW_DIALKIT=false` in StoryFlow.tsx).
- Design reverted to the wallet-stack full-image card (label top / spoke rail
  bottom) after trying a collapsed-header/tab deck — Sagar preferred the full
  image visible. Collapsed-header idea dropped.

### TEMP — reference preview (remove before ship)
- `REFERENCE_IMAGE` in `PlatformAudiences.tsx` forces the home render
  (`homes-large.png`) onto EVERY band (`backdrop = a.image ?? REFERENCE_IMAGE`)
  so Sagar can preview the full treatment before real photos exist. Delete the
  const + the `?? REFERENCE_IMAGE` fallback → bands revert to their per-audience
  `image`, falling back to the "PHOTOGRAPHY — TBD" placeholder. `PlaceholderBackdrop`
  is kept in the file for that revert.

### Open for Sagar
- Supply photos for Office / Industrial / Institute / Enterprise / Hospitality
  (landscape, ~16:9, same treatment as the home renders). Then set each `image`.
- Home band currently uses the "large home" render — swap to a more category-
  generic home shot if you have one.

### Grounding caveat (surface for Sagar's call)
- Routing has ONE combined `offices-industrial` hub with four spokes
  (small-office, mid-office, large-campus, factory). To hit the six segments you
  named, Office + Industrial were split thematically:
  - Office cards → small-office, mid-office (real spokes) + Retail & showroom,
    Clinic (deep-link to the hub — no dedicated route yet).
  - Industrial cards → factory, large-campus (real spokes) + Workshop & light
    industry, Warehouse & cold storage (hub links).
- If you want all 24 to deep-link, we add the 4 missing spoke routes; or collapse
  back to 5 segments matching the real hubs (Homes / Offices & Industrial /
  Institutes / Enterprises / Hospitality), each 4 real spokes.

---

## "WHY STORAGE" STORY SECTION (StoryFlow)

Engine + Dial Kit harness already built (`components/marketing/StoryFlow/*`).
Scroll-scrubbed, left stage pinned, right copy scrolls. GSAP ScrollTrigger + MotionPath.

### Concept (agreed direction)
Schematic single-line energy diagram that fills top→bottom on scroll — NOT a literal
solar-farm illustration. Five beats:
1. **Abundance** — solar cell row illuminates (grey line → warm fill) as the pulse hits it.
2. **Bottleneck** — flow drains into one collector bus; the outlet to storage is a THIN
   NECK; the surplus spills off as the waste branches. ("most of it is wasted")
3. **Black box** — the trickle hits a sealed battery, no readout.
4. **Lock-in** — padlock on the connector.
5. **Resolution** — neck widens, control appears, converges into one GridEnergy stack + GridOS.

### To do
- [ ] Sagar draws the plumbing in Paper on a **600×1200** artboard: solar cell row,
      collector bus + thin neck, spill branches, frames for battery/lock/stack. Line art only.
- [ ] Import Paper geometry → `story.config.ts` (`WIRE.main`/`WIRE.waste`), replace node frames.
- [ ] Add the "neck" narrowing on the main wire at the fan point (bottleneck read).
- [ ] Add solar-cell fill/illuminate tween to the engine timeline.
- [ ] Drop AI node art via `NodeSlot` `src` when ready.
- [ ] Tune pacing/pulse/waste with the Dial Kit panel; write chosen values back as defaults.

---

## HOUSEKEEPING
- [ ] Offer standing: pin repo to Node 22 (`.nvmrc`/engines) — `bun run dev` currently needs
      `fnm exec --using v22.23.1` because `@cloudflare/vite-plugin` requires Node ≥22.15.
- Nothing committed. All changes additive on `sagar/gridenergy-cf-deploy`.
