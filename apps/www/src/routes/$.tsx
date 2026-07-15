import { useLocation } from "react-router";

import { tokens } from "./_preview/_v3-tokens";

/*
  Catch-all for not-yet-built routes. Instead of a 404, the global header (top
  bar + mega menu) stays — this just renders a small title placeholder so the
  nav stays usable. Real pages replace it as they ship.
*/
export default function CatchAll() {
  const { pathname } = useLocation();
  const title =
    pathname.replace(/^\/+/, "").replace(/[-/]+/g, " ").trim() || "Page";

  return (
    <main style={{ minHeight: "78vh", background: tokens.pageBg }}>
      <div className="mx-auto max-w-[1280px] px-8 pt-10">
        <p
          className="text-[11px] uppercase tracking-[0.16em]"
          style={{ color: tokens.brand, fontWeight: 700 }}
        >
          Coming soon
        </p>
        <h1
          className="text-[28px] font-semibold tracking-[-0.02em] capitalize"
          style={{ color: tokens.ink }}
        >
          {title}
        </h1>
      </div>
    </main>
  );
}
