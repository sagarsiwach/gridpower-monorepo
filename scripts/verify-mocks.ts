import { chromium, type Page } from "playwright";

const surfaces = [
  { name: "energy-ops", url: "http://127.0.0.1:5174", text: "SIMULATION ENVIRONMENT" },
  { name: "gridos", url: "http://127.0.0.1:5175", text: "DEMONSTRATION DATA" },
  { name: "gridcharge", url: "http://127.0.0.1:5176/dashboard", text: "Revenue today" },
] as const;

async function verify(
  page: Page,
  surface: (typeof surfaces)[number],
  viewport: "desktop" | "mobile",
) {
  await page.goto(surface.url, { waitUntil: "networkidle" });
  await page.getByText(surface.text, { exact: false }).first().waitFor();
  const overflow = await page.evaluate(() => ({
    width: document.documentElement.scrollWidth,
    viewport: window.innerWidth,
  }));
  if (overflow.width > overflow.viewport + 1)
    throw new Error(
      `${surface.name} ${viewport} overflows: ${overflow.width} > ${overflow.viewport}`,
    );
  await page.screenshot({
    path: `_evidence/dev-22/${surface.name}-${viewport}.png`,
    fullPage: true,
  });
  console.log(JSON.stringify({ surface: surface.name, viewport, status: "ok", overflow }));
}

const browser = await chromium.launch();
try {
  for (const surface of surfaces) {
    const desktop = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    await verify(desktop, surface, "desktop");
    await desktop.close();
    const mobile = await browser.newPage({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 1,
    });
    await verify(mobile, surface, "mobile");
    await mobile.close();
  }
} finally {
  await browser.close();
}
