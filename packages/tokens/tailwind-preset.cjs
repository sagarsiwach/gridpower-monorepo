/**
 * @gridpower/tokens — Tailwind v3 preset
 * Maps CSS custom properties (from src/tokens.css) to Tailwind theme tokens.
 * Apps extend this preset and must import @gridpower/tokens/all.css at the root.
 */

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        grid: {
          red: "var(--grid-red)",
          "red-hover": "var(--grid-red-hover)",
          "red-active": "var(--grid-red-active)",
          "red-bg": "var(--grid-red-light-bg)",
        },
        sand: {
          1: "var(--sand-1)",
          2: "var(--sand-2)",
          3: "var(--sand-3)",
          4: "var(--sand-4)",
          5: "var(--sand-5)",
          6: "var(--sand-6)",
          7: "var(--sand-7)",
          8: "var(--sand-8)",
          9: "var(--sand-9)",
          10: "var(--sand-10)",
          11: "var(--sand-11)",
          12: "var(--sand-12)",
        },
        dark: {
          1: "var(--dark-1)",
          2: "var(--dark-2)",
          3: "var(--dark-3)",
          4: "var(--dark-4)",
          5: "var(--dark-5)",
          6: "var(--dark-6)",
          7: "var(--dark-7)",
          8: "var(--dark-8)",
          9: "var(--dark-9)",
          10: "var(--dark-10)",
          11: "var(--dark-11)",
          12: "var(--dark-12)",
        },
        success: { DEFAULT: "var(--color-success)", bg: "var(--color-success-bg)" },
        warning: { DEFAULT: "var(--color-warning)", bg: "var(--color-warning-bg)" },
        error: { DEFAULT: "var(--color-error)", bg: "var(--color-error-bg)" },
        info: { DEFAULT: "var(--color-info)", bg: "var(--color-info-bg)" },
        // shadcn semantic aliases (light mode via CSS vars, dark mode via [data-theme="dark"])
        background: "var(--bg-page)",
        foreground: "var(--text-heading)",
        card: { DEFAULT: "var(--bg-subtle)", foreground: "var(--text-heading)" },
        popover: { DEFAULT: "var(--bg-page)", foreground: "var(--text-heading)" },
        primary: { DEFAULT: "var(--grid-red)", foreground: "#ffffff" },
        secondary: { DEFAULT: "var(--bg-element)", foreground: "var(--text-heading)" },
        muted: { DEFAULT: "var(--bg-subtle)", foreground: "var(--text-muted)" },
        accent: { DEFAULT: "var(--bg-hover)", foreground: "var(--text-heading)" },
        destructive: { DEFAULT: "var(--color-error)", foreground: "#ffffff" },
        border: "var(--border)",
        input: "var(--border)",
        ring: "var(--grid-red)",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        heading: ["var(--font-heading)"],
        sans: ["var(--font-sans)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      fontSize: {
        "display": ["var(--text-display-size)", { lineHeight: "var(--text-display-lh)", letterSpacing: "var(--text-display-ls)", fontWeight: "var(--text-display-weight)" }],
        "h1": ["var(--text-h1-size)", { lineHeight: "var(--text-h1-lh)", letterSpacing: "var(--text-h1-ls)", fontWeight: "var(--text-h1-weight)" }],
        "h2": ["var(--text-h2-size)", { lineHeight: "var(--text-h2-lh)", letterSpacing: "var(--text-h2-ls)", fontWeight: "var(--text-h2-weight)" }],
        "h3": ["var(--text-h3-size)", { lineHeight: "var(--text-h3-lh)", letterSpacing: "var(--text-h3-ls)", fontWeight: "var(--text-h3-weight)" }],
        "h4": ["var(--text-h4-size)", { lineHeight: "var(--text-h4-lh)", fontWeight: "var(--text-h4-weight)" }],
        "body-lg": ["var(--text-body-lg-size)", { lineHeight: "var(--text-body-lg-lh)" }],
        "body": ["var(--text-body-size)", { lineHeight: "var(--text-body-lh)" }],
        "body-sm": ["var(--text-body-sm-size)", { lineHeight: "var(--text-body-sm-lh)" }],
        "label": ["var(--text-label-size)", { lineHeight: "var(--text-label-lh)", letterSpacing: "var(--text-label-ls)", fontWeight: "var(--text-label-weight)" }],
        "code": ["var(--text-code-size)", { lineHeight: "var(--text-code-lh)" }],
      },
      borderRadius: {
        tooltip: "var(--radius-tooltip)",
        btn: "var(--radius-btn)",
        input: "var(--radius-input)",
        card: "var(--radius-card)",
        modal: "var(--radius-modal)",
        pill: "var(--radius-pill)",
        img: "var(--radius-img)",
        // shadcn aliases
        lg: "var(--radius-card)",
        md: "var(--radius-btn)",
        sm: "var(--radius-btn)",
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        xl: "var(--shadow-xl)",
      },
      spacing: {
        "section-y": "var(--section-pad-y)",
        "card": "var(--card-pad)",
        "card-lg": "var(--card-pad-lg)",
        "grid-gap": "var(--grid-gap)",
      },
      transitionDuration: {
        fast: "150ms",
        normal: "200ms",
        slow: "300ms",
      },
      backgroundImage: {
        "grid-dots": "var(--grid-bg)",
      },
      backgroundSize: {
        "grid-dots": "var(--grid-bg-size)",
      },
    },
  },
  plugins: [],
};
