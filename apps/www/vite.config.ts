import { cloudflare } from "@cloudflare/vite-plugin";
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [cloudflare({ viteEnvironment: { name: "ssr" } }), tailwindcss(), reactRouter()],
  server: {
    // Bind all interfaces + allow the Tailscale MagicDNS host so the dev server
    // is reachable over the tailnet (via `tailscale serve`).
    host: true,
    allowedHosts: [".ts.net"],
  },
});
