import { useEffect, useState, type ComponentType } from "react";
import { Links, Meta, Outlet, Scripts, ScrollRestoration, useLocation } from "react-router";

import "./styles/globals.css";
import { GlobalHeader } from "./components/site/GlobalHeader";
import MobileSiteNav from "./components/site/MobileSiteNav";
import { SiteFooter } from "./components/site/SiteFooter";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="day">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="color-scheme" content="light" />
        <meta name="theme-color" content="#FA0016" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

// Global app shell. The two-tier GridEnergy header (top bar + mega menu) wraps
// every public marketing route. Internal showcases (/preview, /system) keep
// their own chrome, so the global header is suppressed there.
export default function App() {
  const { pathname } = useLocation();
  const isInternal =
    pathname.startsWith("/preview") || pathname.startsWith("/system");

  return (
    <>
      {!isInternal && (
        <>
          {/* lg:contents (not lg:block) so the wrapper forms no box — otherwise it
              constrains the sticky header to its own height and the header scrolls
              away instead of sticking. */}
          <div className="hidden lg:contents">
            <GlobalHeader />
          </div>
          <div className="lg:hidden">
            <MobileSiteNav />
          </div>
        </>
      )}
      <Outlet />
      {!isInternal && <SiteFooter />}
      <DevAgentation />
    </>
  );
}

// Agentation visual-feedback overlay — dev-only, client-only. Loaded via dynamic
// import inside an effect so it never runs during SSR/prerender. The annotations
// it captures are read by the agentation MCP server (default :4747).
function DevAgentation() {
  const [Tool, setTool] = useState<ComponentType<Record<string, unknown>> | null>(null);

  useEffect(() => {
    if (!import.meta.env.DEV) return;
    let alive = true;
    import("agentation").then((m) => {
      if (alive) setTool(() => m.Agentation as ComponentType<Record<string, unknown>>);
    });
    return () => {
      alive = false;
    };
  }, []);

  // endpoint is REQUIRED for the annotations to sync to the agentation MCP
  // server — without it the toolbar only writes to localStorage.
  return Tool ? <Tool endpoint="http://localhost:4747" /> : null;
}
