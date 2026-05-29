import type { Config } from "@react-router/dev/config";

export default {
  // SSR/SSG marketing site. Static routes are prerendered at build; dynamic
  // routes (e.g. /preview/:slug) fall back to SSR.
  ssr: true,
  appDirectory: "src",
  // Prerender every static (non-param) route to HTML at build time.
  prerender: true,
  // Opt into React Router v8 behavior early — v8 ships in weeks, this keeps the
  // upgrade near-trivial. Flags surfaced as stabilized in the v7.16 dev warnings.
  future: {
    v8_middleware: true,
    v8_splitRouteModules: true,
    v8_passThroughRequests: true,
    v8_trailingSlashAwareDataRequests: true,
  },
} satisfies Config;
