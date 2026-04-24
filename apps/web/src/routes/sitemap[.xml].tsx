import type { LoaderFunctionArgs } from "react-router";

// All public routes — EXCLUDE /design-system (internal only)
const ROUTES: Array<{ path: string; priority: string; changefreq: string }> = [
  { path: "/", priority: "1.0", changefreq: "daily" },
  { path: "/energy", priority: "0.8", changefreq: "weekly" },
  { path: "/charge", priority: "0.8", changefreq: "weekly" },
  { path: "/drive", priority: "0.8", changefreq: "weekly" },
  { path: "/energy/solutions/home", priority: "0.8", changefreq: "weekly" },
  { path: "/energy/solutions/commercial", priority: "0.8", changefreq: "weekly" },
  { path: "/charge/solutions/home", priority: "0.8", changefreq: "weekly" },
  { path: "/charge/solutions/destination", priority: "0.8", changefreq: "weekly" },
  { path: "/drive/solutions/vehicles", priority: "0.8", changefreq: "weekly" },
  { path: "/energy/products", priority: "0.8", changefreq: "weekly" },
  { path: "/charge/products", priority: "0.8", changefreq: "weekly" },
  { path: "/drive/products", priority: "0.8", changefreq: "weekly" },
  { path: "/platform", priority: "0.8", changefreq: "weekly" },
  { path: "/about", priority: "0.5", changefreq: "weekly" },
  { path: "/contact", priority: "0.5", changefreq: "weekly" },
  { path: "/signup", priority: "0.8", changefreq: "weekly" },
  { path: "/blog", priority: "0.5", changefreq: "weekly" },
];

const BASE_URL = "https://gridpower.co.in";
const LAST_MOD = "2026-04-25";

export async function loader(_: LoaderFunctionArgs) {
  const urls = ROUTES.map(
    ({ path, priority, changefreq }) => `
  <url>
    <loc>${BASE_URL}${path}</loc>
    <lastmod>${LAST_MOD}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`,
  ).join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}
</urlset>`;

  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
