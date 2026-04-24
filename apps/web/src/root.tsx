import { Links, Meta, Outlet, Scripts, ScrollRestoration, useLocation } from "react-router";
import "@gridpower/ui/styles.css";
import { AnnouncementBar } from "~/components/announcement-bar";
import { SiteHeader } from "~/components/site-header";
import { SiteFooter } from "~/components/site-footer";

const BASE_URL = "https://gridpower.co.in";

export function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#FA0016" />
        <link rel="icon" type="image/svg+xml" href="/logos/logo-gridpower.svg" />
        <link rel="canonical" href={`${BASE_URL}${pathname}`} />
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

export default function App() {
  return (
    <>
      <AnnouncementBar />
      <SiteHeader />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <SiteFooter />
    </>
  );
}
