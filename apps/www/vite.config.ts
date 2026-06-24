import { cloudflare } from "@cloudflare/vite-plugin";
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    cloudflare({ viteEnvironment: { name: "ssr" } }),
    tailwindcss(),
    reactRouter(),
    tsconfigPaths(),
  ],
  server: {
    // Bind all interfaces + allow the Tailscale MagicDNS host so the dev server
    // is reachable over the tailnet (via `tailscale serve`).
    host: true,
    allowedHosts: [".ts.net"],
  },
});
