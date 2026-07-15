import { cloudflare } from "@cloudflare/vite-plugin";
import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";

export default defineConfig({
  resolve: { tsconfigPaths: true },
  server: {
    port: 5260,
    strictPort: true,
  },
  plugins: [cloudflare({ viteEnvironment: { name: "ssr" } }), reactRouter()],
});
