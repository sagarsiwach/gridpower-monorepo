/*
  CobeGlobe — the interactive WebGL globe for the homepage hero.

  Light globe (dark: 0, olive-50 sphere) centered on India, with a global
  connector mesh (arcs) out to international hubs, city markers, and rectangular
  code labels (DEL / DXB / SIN …) in the cobe-playground style.

  All of it is cobe's NATIVE API driven by data — markers, arcs, and their
  scalars. The ONE patched line (GridRed continents) lives in
  src/vendor/cobe-gridred.js; nothing else edits the library.

  Labels: cobe's built-in anchor utility relies on CSS Anchor Positioning
  (Chrome-only). To keep the chips cross-browser we project the marker positions
  ourselves each frame with the exact same math cobe uses (see `project`) and
  place lightweight HTML chips over the canvas. No dependency on cobe internals.

  Dial Kit (dev only) exposes the globe scalars live; the values that feel right
  are written back as the GLOBE_DIALS defaults below. The shared DialRoot panel
  is rendered by StoryFlow on the same page.

  SSR-safe: cobe is dynamically imported inside useEffect. Respects
  prefers-reduced-motion (no spin).
*/

import { useEffect, useRef } from "react";
import { useDialKit } from "dialkit";
import type { Globe } from "cobe";

/* Deployment + connection geography. [lat, lng] in degrees; `code` is the chip. */
type City = { loc: [number, number]; code: string };
const CITY = {
  delhi: { loc: [28.6139, 77.209], code: "DEL" },
  mumbai: { loc: [19.076, 72.8777], code: "BOM" },
  bengaluru: { loc: [12.9716, 77.5946], code: "BLR" },
  kolkata: { loc: [22.5726, 88.3639], code: "CCU" },
  chennai: { loc: [13.0827, 80.2707], code: "MAA" },
  hyderabad: { loc: [17.385, 78.4867], code: "HYD" },
  dubai: { loc: [25.2048, 55.2708], code: "DXB" },
  singapore: { loc: [1.3521, 103.8198], code: "SIN" },
  london: { loc: [51.5074, -0.1278], code: "LHR" },
  newyork: { loc: [40.7128, -74.006], code: "JFK" },
  tokyo: { loc: [35.6762, 139.6503], code: "HND" },
  sydney: { loc: [-33.8688, 151.2093], code: "SYD" },
  frankfurt: { loc: [50.1109, 8.6821], code: "FRA" },
  sanfrancisco: { loc: [37.7749, -122.4194], code: "SFO" },
} satisfies Record<string, City>;

const LABELS = Object.entries(CITY).map(([id, c]) => ({ id, code: c.code, location: c.loc }));

/* Markers, rendered by cobe's native marker path. `size` is a live dial. */
const buildMarkers = (size: number) =>
  LABELS.map((l) => ({ id: l.id, location: l.location, size }));

/* Connector routes — India hubs out to the world, plus a few domestic links.
   Native cobe arcs, illustrative (not live network data). */
const arc = (from: keyof typeof CITY, to: keyof typeof CITY) => ({
  id: `${from}-${to}`,
  from: CITY[from].loc,
  to: CITY[to].loc,
});
const ARCS = [
  arc("delhi", "dubai"),
  arc("delhi", "london"),
  arc("delhi", "frankfurt"),
  arc("delhi", "newyork"),
  arc("delhi", "tokyo"),
  arc("mumbai", "dubai"),
  arc("mumbai", "singapore"),
  arc("mumbai", "london"),
  arc("bengaluru", "singapore"),
  arc("bengaluru", "sanfrancisco"),
  arc("chennai", "singapore"),
  arc("singapore", "sydney"),
  arc("delhi", "mumbai"),
  arc("mumbai", "hyderabad"),
  arc("newyork", "sanfrancisco"),
  arc("london", "frankfurt"),
];

/* Live tuning surface (Dial Kit in dev; these defaults everywhere else).
   Numeric tuples are [value, min, max, step]. Defaults are Sagar's locked set. */
const GLOBE_DIALS = {
  mapSamples: [45000, 5000, 90000, 1000] as [number, number, number, number],
  markerSize: [0.01, 0.005, 0.1, 0.005] as [number, number, number, number],
  markerElevation: [0, 0, 0.15, 0.005] as [number, number, number, number],
  arcWidth: [0.15, 0.05, 2, 0.05] as [number, number, number, number],
  arcHeight: [0.2, 0, 0.5, 0.01] as [number, number, number, number],
  diffuse: [1, 0, 3, 0.1] as [number, number, number, number],
  scale: [1.1, 0.5, 2, 0.05] as [number, number, number, number],
  theta: [-0.2, -1.2, 1.2, 0.05] as [number, number, number, number],
  spin: [0.0005, 0, 0.02, 0.0005] as [number, number, number, number],
};

const OLIVE_50: [number, number, number] = [0.976, 0.976, 0.966]; // matches pageBg
const BLACK: [number, number, number] = [0, 0, 0];
const GLOBE_RADIUS = 0.8; // cobe's fixed sphere radius (ee)

/* Project a [lat,lng] to canvas fraction (0..1) using cobe's own transform, so
   the HTML chips sit exactly on the WebGL markers. `visible` = front-facing. */
function latLngToVec3([lat, lng]: [number, number]): [number, number, number] {
  const r = (lat * Math.PI) / 180;
  const a = (lng * Math.PI) / 180 - Math.PI;
  const o = Math.cos(r);
  return [-o * Math.cos(a), Math.sin(r), o * Math.sin(a)];
}
function project(loc: [number, number], phi: number, theta: number, scale: number, elevation: number) {
  const rad = GLOBE_RADIUS + elevation;
  const [vx, vy, vz] = latLngToVec3(loc);
  const x = vx * rad,
    y = vy * rad,
    z = vz * rad;
  const ct = Math.cos(theta),
    st = Math.sin(theta),
    cp = Math.cos(phi),
    sp = Math.sin(phi);
  const c = cp * x + sp * z;
  const s = sp * st * x + ct * y - cp * st * z;
  const depth = -sp * ct * x + st * y + cp * ct * z;
  return {
    x: (c * scale + 1) / 2,
    y: (-s * scale + 1) / 2,
    visible: depth >= 0 || c * c + s * s >= 0.64,
  };
}

export function CobeGlobe({ className, style }: { className?: string; style?: React.CSSProperties }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const labelsRef = useRef<HTMLDivElement>(null);
  // clientX at drag-start, or null when not dragging.
  const pointerInteracting = useRef<number | null>(null);
  const pointerMovement = useRef(0);

  // Live tuning values (Dial Kit in dev; GLOBE_DIALS defaults everywhere else).
  const d = useDialKit("HeroGlobe", GLOBE_DIALS);

  const globeRef = useRef<Globe | null>(null);
  const paramsRef = useRef(d);
  paramsRef.current = d;

  // Create the globe once. Initial config reads the current dial values.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let phi = 0;
    let destroyed = false;
    let raf = 0;

    // Map each label id -> its chip element for per-frame positioning.
    const chipEls = new Map<string, HTMLElement>();
    LABELS.forEach((l) => {
      const el = labelsRef.current?.querySelector<HTMLElement>(`[data-city="${l.id}"]`);
      if (el) chipEls.set(l.id, el);
    });

    const onResize = () => {
      width = canvas.offsetWidth;
    };
    window.addEventListener("resize", onResize);
    onResize();

    import("../../vendor/cobe-gridred.js").then(({ default: createGlobe }) => {
      if (destroyed) return;
      const p = paramsRef.current;
      const globe = createGlobe(canvas, {
        devicePixelRatio: 2,
        width: width * 2,
        height: width * 2,
        phi,
        theta: p.theta,
        dark: 0,
        diffuse: p.diffuse,
        mapSamples: p.mapSamples,
        mapBrightness: 6,
        baseColor: OLIVE_50, // sphere = pageBg so the rim melts into the page
        markerColor: BLACK,
        glowColor: OLIVE_50,
        markers: buildMarkers(p.markerSize),
        arcs: ARCS,
        arcColor: BLACK,
        arcWidth: p.arcWidth,
        arcHeight: p.arcHeight,
        markerElevation: p.markerElevation,
        scale: p.scale,
      });
      globeRef.current = globe;

      const frame = () => {
        if (destroyed || !globeRef.current) return;
        if (!pointerInteracting.current && !reduce) phi += paramsRef.current.spin;
        const phiNow = phi + pointerMovement.current / 200;
        globeRef.current.update({ phi: phiNow, width: width * 2, height: width * 2 });

        // Position the HTML code-chips over the canvas using the same transform.
        const pr = paramsRef.current;
        for (const l of LABELS) {
          const el = chipEls.get(l.id);
          if (!el) continue;
          const pt = project(l.location, phiNow, pr.theta, pr.scale, pr.markerElevation);
          el.style.left = `${pt.x * 100}%`;
          el.style.top = `${pt.y * 100}%`;
          el.style.opacity = pt.visible ? "1" : "0";
        }

        raf = requestAnimationFrame(frame);
      };
      raf = requestAnimationFrame(frame);
    });

    return () => {
      destroyed = true;
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      globeRef.current?.destroy();
      globeRef.current = null;
    };
  }, []);

  // Live-apply tunable scalars when a dial moves (runs once in prod with defaults).
  // Two-phase: cobe packs the arc buffer BEFORE applying arcWidth/Height/elevation
  // in a given update(), so set the scalars first, then re-pass arcs + markers.
  useEffect(() => {
    const g = globeRef.current;
    if (!g) return;
    g.update({
      mapSamples: d.mapSamples,
      diffuse: d.diffuse,
      arcWidth: d.arcWidth,
      arcHeight: d.arcHeight,
      markerElevation: d.markerElevation,
      scale: d.scale,
      theta: d.theta,
    });
    g.update({ markers: buildMarkers(d.markerSize), arcs: ARCS });
  }, [d.mapSamples, d.diffuse, d.arcWidth, d.arcHeight, d.markerElevation, d.scale, d.theta, d.markerSize]);

  return (
    <div className={className} style={{ position: "relative", width: "100%", height: "100%", aspectRatio: "1", ...style }}>
      <canvas
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX - pointerMovement.current;
          e.currentTarget.style.cursor = "grabbing";
        }}
        onPointerUp={(e) => {
          pointerInteracting.current = null;
          e.currentTarget.style.cursor = "grab";
        }}
        onPointerOut={(e) => {
          pointerInteracting.current = null;
          e.currentTarget.style.cursor = "grab";
        }}
        onPointerMove={(e) => {
          if (pointerInteracting.current !== null) {
            pointerMovement.current = e.clientX - pointerInteracting.current;
          }
        }}
        style={{ width: "100%", height: "100%", aspectRatio: "1", cursor: "grab", contain: "layout paint size", touchAction: "pan-y" }}
      />

      {/* Rectangular code chips (cobe-playground style), projected onto markers. */}
      <div ref={labelsRef} aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        {LABELS.map((l) => (
          <span key={l.id} data-city={l.id} className="ge-globe-chip" style={{ opacity: 0 }}>
            {l.code}
          </span>
        ))}
      </div>

      <style>{`
        .ge-globe-chip {
          position: absolute;
          transform: translate(3px, calc(-100% - 6px));
          background: #0b0b0c;
          color: #fff;
          font: 300 10px/1 Inter, ui-sans-serif, system-ui, sans-serif;
          letter-spacing: 0.09em;
          padding: 3px 6px 4px;
          border-radius: 3px;
          white-space: nowrap;
          pointer-events: none;
          transition: opacity 0.18s linear;
          will-change: left, top, opacity;
        }
        .ge-globe-chip::after {
          content: "";
          position: absolute;
          left: 5px;
          bottom: -4px;
          border-left: 4px solid transparent;
          border-right: 4px solid transparent;
          border-top: 5px solid #0b0b0c;
        }
      `}</style>
    </div>
  );
}
