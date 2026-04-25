import * as React from "react";
import { Link } from "react-router";
import type { MetaFunction } from "react-router";
import {
  Button,
  DotGrid,
  SectionLabel,
  SectionDivider,
  FeatureCard,
  CTASection,
} from "@gridpower/ui";
import { Globe, Lock, Database, Zap, Plug, Server } from "lucide-react";

export const meta: MetaFunction = () => [
  { title: "The GridPower platform: Open APIs, OEM partnerships | GridPower" },
  {
    name: "description",
    content:
      "GridOS connects your storage, chargers, and powertrain BMS. One API. Zero fragmentation.",
  },
  { property: "og:title", content: "The GridPower platform: Open APIs, OEM partnerships | GridPower" },
  {
    property: "og:description",
    content:
      "GridOS connects your storage, chargers, and powertrain BMS. One API. Zero fragmentation.",
  },
  { property: "og:url", content: "/platform" },
  { property: "og:image", content: "/og-default.svg" },
  { name: "twitter:card", content: "summary_large_image" },
];

// ── Page ─────────────────────────────────────────────────────────────────────

export default function PlatformPage() {
  return (
    <div>
      {/* Hero: dark bg matching prototype */}
      <section className="relative overflow-hidden bg-sand-12 py-24 min-h-[80vh] flex items-center">
        <DotGrid color="rgba(58,57,55,0.7)" />
        <div className="relative mx-auto max-w-7xl px-10 w-full grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-20 items-center">
          {/* Copy */}
          <div>
            <SectionLabel variant="neutral">GRIDOS · THE PLATFORM</SectionLabel>
            <h1 className="font-heading text-display font-semibold text-dark-12 tracking-tight leading-[1.05] mb-6">
              One platform.
              <br />
              Every asset.
            </h1>
            <p className="font-body text-h4 text-dark-11 leading-[1.7] mb-10 max-w-md">
              GridOS connects your storage, chargers, and powertrain BMS. One
              API. Zero fragmentation.
            </p>
            <div className="flex gap-3 flex-wrap">
              <Button asChild>
                <Link to="/signup">Get early access</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link to="/contact">Talk to us</Link>
              </Button>
            </div>
          </div>

          {/* Visual: live console preview rendered as code + layer cards */}
          <div className="hidden lg:flex flex-col gap-4">
            <div className="bg-dark-2 border border-dark-6 rounded-card p-6 font-mono text-[12px] leading-relaxed text-dark-11">
              <div className="flex items-center justify-between border-b border-dark-6 pb-3 mb-4">
                <span className="text-grid-red uppercase tracking-widest text-label">
                  GET /v1/sites/site_abc/overview
                </span>
                <span className="text-dark-9 uppercase tracking-widest text-label">
                  200 OK · 47ms
                </span>
              </div>
              <pre className="text-dark-12 m-0 p-0 whitespace-pre-wrap">{`{
  "fleet": {
    "sites":     12,
    "chargers":  87,
    "batteries": 24,
    "vehicles":  340
  },
  "live": {
    "kwh_today":   1842,
    "soc_percent": 72,
    "sessions":    18,
    "uptime":      "99.97%"
  }
}`}</pre>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Storage", count: "24" },
                { label: "Charging", count: "87" },
                { label: "Powertrain", count: "340" },
              ].map((layer) => (
                <div
                  key={layer.label}
                  className="bg-dark-3 border border-dark-6 rounded-card p-4 flex flex-col items-center justify-center"
                >
                  <span className="font-display text-h3 font-semibold text-dark-12">
                    {layer.count}
                  </span>
                  <span className="font-mono text-label text-dark-9 uppercase tracking-widest text-center mt-1">
                    {layer.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Three pillars: Open APIs / OEM partnerships / Data sovereignty */}
      <section className="bg-sand-1 py-24">
        <SectionDivider />
        <div className="mx-auto max-w-7xl px-10 pt-16">
          <SectionLabel>THREE PILLARS</SectionLabel>
          <h2 className="font-heading text-h2 font-semibold text-sand-12 tracking-tight mb-12 max-w-xl">
            No lock-in. By design.
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <FeatureCard
              icon={<Globe className="h-5 w-5" />}
              label="OPEN APIS"
              title="Works with anything."
              description="OCPP 2.0.1, Modbus TCP, REST API, MQTT. Every protocol published. No NDA. Integrate any hardware or third-party platform."
            />
            <FeatureCard
              icon={<Plug className="h-5 w-5" />}
              label="OEM PARTNERSHIPS"
              title="Hardware you choose."
              description="GridOS ships with first-party GridEnergy, GridCharge, and GridDrive hardware support. Open to any OEM hardware via the device SDK."
            />
            <FeatureCard
              icon={<Lock className="h-5 w-5" />}
              label="DATA SOVEREIGNTY"
              title="Your data, your assets."
              description="You own your data. Export any time. Switch hardware without losing history. Multi-tenant with role-based access."
            />
          </div>
        </div>
      </section>

      {/* Architecture diagram */}
      <section className="bg-sand-2 py-24">
        <SectionDivider />
        <div className="mx-auto max-w-7xl px-10 pt-16">
          <SectionLabel>ARCHITECTURE</SectionLabel>
          <h2 className="font-heading text-h2 font-semibold text-sand-12 tracking-tight mb-12">
            Hardware → GridOS → Apps
          </h2>

          {/* Three-column architecture diagram */}
          <div className="flex overflow-hidden rounded-card border border-sand-6">
            {[
              {
                label: "HARDWARE",
                items: [
                  "Batteries (COMO, ATLAS)",
                  "Chargers (AC + DC)",
                  "Powertrain BMS (GridDrive)",
                ],
                dark: false,
              },
              {
                label: "GRIDOS",
                items: [
                  "Device management",
                  "Data aggregation",
                  "Automation rules",
                  "Open API (REST, MQTT)",
                ],
                dark: true,
              },
              {
                label: "APPLICATIONS",
                items: [
                  "GridCharge App",
                  "GridPower Console",
                  "GridEnergy Console",
                  "Third-party integrations",
                ],
                dark: false,
              },
            ].map((layer, i) => (
              <React.Fragment key={layer.label}>
                <div
                  className={[
                    "flex-1 p-8",
                    layer.dark ? "bg-sand-12" : "bg-sand-1",
                  ].join(" ")}
                >
                  <SectionLabel variant={layer.dark ? "neutral" : "red"}>
                    {layer.label}
                  </SectionLabel>
                  <ul className="flex flex-col gap-2.5 list-none m-0 p-0">
                    {layer.items.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <span
                          className={[
                            "w-1 h-1 rounded-full flex-shrink-0",
                            layer.dark ? "bg-grid-red" : "bg-sand-7",
                          ].join(" ")}
                        />
                        <span
                          className={[
                            "font-body text-body-sm leading-snug",
                            layer.dark ? "text-dark-11" : "text-sand-11",
                          ].join(" ")}
                        >
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                {i < 2 && (
                  <div className="w-px bg-sand-6 flex-shrink-0 flex items-center justify-center">
                    <div className="w-7 h-7 rounded-full bg-sand-12 flex items-center justify-center flex-shrink-0">
                      <span className="font-mono text-[10px] text-grid-red">
                        →
                      </span>
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Drenched red band: single concrete fact about openness */}
          <div className="mt-10 relative overflow-hidden rounded-card bg-grid-red px-10 py-14">
            <DotGrid color="rgba(255,255,255,0.15)" />
            <div className="relative grid grid-cols-1 gap-10 md:grid-cols-[auto_1fr] md:items-center">
              <div className="font-display text-[clamp(48px,7vw,96px)] font-semibold leading-none text-white">
                0
              </div>
              <div>
                <p className="font-mono text-label uppercase tracking-widest text-white/85 mb-2">
                  NDAS · CERTIFICATION GATES · BLACK BOXES
                </p>
                <p className="font-heading text-h3 font-semibold leading-tight text-white max-w-xl">
                  Every protocol published. Every endpoint documented. Switch hardware tomorrow without losing a single kWh of history.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Built for India */}
      <section className="bg-sand-12 py-20 relative overflow-hidden">
        <DotGrid color="rgba(58,57,55,0.6)" />
        <div className="relative mx-auto max-w-7xl px-10">
          <SectionLabel variant="neutral">BUILT FOR INDIA</SectionLabel>
          <h2 className="font-heading text-h2 font-semibold text-dark-12 tracking-tight mb-12">
            Open ecosystem. Indian infrastructure.
          </h2>
          <div className="grid grid-cols-1 gap-px bg-dark-6 rounded-card overflow-hidden md:grid-cols-3">
            {[
              {
                label: "OPEN STANDARDS",
                title: "Works with anything.",
                sub: "OCPP 2.0.1, Modbus TCP, REST API, MQTT. Every protocol published. No NDA.",
              },
              {
                label: "FULL TRANSPARENCY",
                title: "No black boxes.",
                sub: "Full specs, API docs, and integration guides available from day one. Before you buy.",
              },
              {
                label: "NO LOCK-IN",
                title: "Your data, your assets.",
                sub: "You own your data. Export any time. Switch hardware without losing history.",
              },
            ].map((p) => (
              <div key={p.label} className="bg-dark-2 p-8">
                <SectionLabel variant="neutral">{p.label}</SectionLabel>
                <div className="font-heading text-body-lg font-semibold text-dark-12 mb-3">
                  {p.title}
                </div>
                <p className="font-body text-body-sm text-dark-11 leading-relaxed">
                  {p.sub}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* API preview */}
      <section className="bg-sand-1 py-24">
        <SectionDivider />
        <div className="mx-auto max-w-7xl px-10 pt-16">
          <SectionLabel>API PREVIEW</SectionLabel>
          <h2 className="font-heading text-h2 font-semibold text-sand-12 tracking-tight mb-4">
            REST-first. MQTT-native.
          </h2>
          <p className="font-body text-body-lg text-sand-11 leading-relaxed mb-10 max-w-xl">
            Full API reference published before launch. No NDA, no approval
            process. Start integrating today.
          </p>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {/* REST example */}
            <div>
              <div className="font-mono text-label text-sand-9 uppercase tracking-widest mb-3">
                REST · Get site energy status
              </div>
              <pre className="bg-sand-12 text-dark-11 rounded-card p-6 overflow-x-auto font-mono text-[13px] leading-relaxed">
                {`curl -X GET \\
  https://api.gridpower.co.in/v1/sites/{site_id}/energy \\
  -H "Authorization: Bearer <token>" \\
  -H "Content-Type: application/json"

# Response
{
  "site_id": "site_abc123",
  "soc_percent": 72,
  "solar_kw": 4.2,
  "grid_import_kw": 0.0,
  "battery_kw": -1.8,
  "timestamp": "2026-04-25T02:58:00Z"
}`}
              </pre>
            </div>

            {/* SDK snippet */}
            <div>
              <div className="font-mono text-label text-sand-9 uppercase tracking-widest mb-3">
                Node.js SDK · Start a charge session
              </div>
              <pre className="bg-sand-12 text-dark-11 rounded-card p-6 overflow-x-auto font-mono text-[13px] leading-relaxed">
                {`import { GridOS } from "@gridpower/sdk";

const client = new GridOS({ apiKey: process.env.GRIDOS_KEY });

// Start a charge session
const session = await client.charge.sessions.start({
  charger_id: "charger_xyz789",
  connector: 1,
  max_energy_kwh: 20,
});

console.log(session.id); // session_456def
// → charging started`}
              </pre>
            </div>
          </div>

          <div className="mt-8 flex gap-3 flex-wrap">
            <div className="inline-flex items-center gap-2 px-4 py-2.5 bg-sand-2 border border-sand-6 rounded-btn">
              <Server className="h-4 w-4 text-sand-9" />
              <span className="font-mono text-label text-sand-11 uppercase tracking-widest">
                Full API docs · Q2 2026
              </span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2.5 bg-sand-2 border border-sand-6 rounded-btn">
              <Database className="h-4 w-4 text-sand-9" />
              <span className="font-mono text-label text-sand-11 uppercase tracking-widest">
                MQTT reference · Q2 2026
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Partner CTA */}
      <section className="bg-sand-2 py-20">
        <SectionDivider />
        <div className="mx-auto max-w-7xl px-10 pt-16">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            {/* OEM integrator CTA */}
            <div className="bg-sand-1 border border-sand-6 rounded-card p-10">
              <SectionLabel>OEM INTEGRATORS</SectionLabel>
              <h3 className="font-heading text-h3 font-semibold text-sand-12 tracking-tight mb-4">
                Build on GridOS.
              </h3>
              <p className="font-body text-body-sm text-sand-11 leading-relaxed mb-8">
                Integrate your EV hardware with GridOS via the device SDK.
                Published protocol specs, no NDA, no certification gate.
              </p>
              <Button asChild>
                <Link to="/contact">Talk to partnerships</Link>
              </Button>
            </div>

            {/* Fleet / site operator CTA */}
            <div className="bg-sand-12 rounded-card p-10 relative overflow-hidden">
              <DotGrid color="rgba(58,57,55,0.5)" />
              <div className="relative">
                <SectionLabel variant="neutral">FLEET OPERATORS</SectionLabel>
                <h3 className="font-heading text-h3 font-semibold text-dark-12 tracking-tight mb-4">
                  Get early access to GridOS.
                </h3>
                <p className="font-body text-body-sm text-dark-11 leading-relaxed mb-8">
                  Be first to the platform when we launch Q2 2026. Monitor
                  every charger, battery, and session from one dashboard.
                </p>
                <Button asChild>
                  <Link to="/signup">Get early access</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <CTASection
        heading="Get early access to GridOS."
        description="Be among the first on the platform when we launch Q2 2026."
        primaryCta={
          <Button asChild>
            <Link to="/signup">Get early access</Link>
          </Button>
        }
        secondaryCta={
          <Button variant="ghost" asChild>
            <Link to="/contact">Talk to us</Link>
          </Button>
        }
      />
    </div>
  );
}
