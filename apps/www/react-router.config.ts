import type { Config } from "@react-router/dev/config";

export default {
  // SSR/SSG marketing site. Static routes are prerendered at build; dynamic
  // routes (e.g. /preview/:slug) fall back to SSR.
  ssr: true,
  appDirectory: "src",
  // NOTE: build-time prerender disabled for the Cloudflare Workers target — the
  // worker SSRs every route at the edge (identical HTML) and Cloudflare caches
  // it. Re-enable once the prerender pass is compatible with v8_viteEnvironmentApi.
  prerender: false,
  // Opt into React Router v8 behavior early — v8 ships in weeks, this keeps the
  // upgrade near-trivial. Flags surfaced as stabilized in the v7.16 dev warnings.
  future: {
    // Required for @cloudflare/vite-plugin: routes the client + ssr builds
    // through Vite's Environment API so the Cloudflare builder emits both.
    v8_viteEnvironmentApi: true,
    // Kept off: middleware mode requires the Worker to pass a RouterContextProvider
    // as the load context. The site doesn't use middleware, so the plain-object
    // context in workers/app.ts is correct. Re-enable only alongside that plumbing.
    v8_middleware: false,
    v8_splitRouteModules: true,
    v8_passThroughRequests: true,
    v8_trailingSlashAwareDataRequests: true,
  },
} satisfies Config;
