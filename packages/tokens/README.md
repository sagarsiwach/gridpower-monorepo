# @gridpower/tokens

Canonical design tokens and fonts for the GridPower design system.

## Usage

Import the full bundle at your app's root (Tailwind-enabled apps):

```ts
import "@gridpower/tokens/all.css";
```

Consume the Tailwind preset:

```ts
// tailwind.config.ts
import gridpowerPreset from "@gridpower/tokens/tailwind-preset";

export default {
  presets: [gridpowerPreset],
  content: ["./src/**/*.{ts,tsx}", "../../packages/ui/src/**/*.{ts,tsx}"],
};
```

## What's inside

- `src/tokens.css` — CSS custom properties (colors, spacing, radius, shadow, type scale)
- `src/fonts.css` — `@font-face` for Clash Grotesk + Google Fonts import for Inter + Geist Mono
- `src/all.css` — bundles fonts + tokens
- `tailwind-preset.cjs` — Tailwind v3 preset mapping CSS vars to theme tokens
- `fonts/` — self-hosted Clash Grotesk woff2 files (Fontshare, free)

## Dark mode

Toggle via `data-theme="dark"` on the root element (or Tailwind's `class` strategy).

```html
<html data-theme="dark">
```
