import {
  Activity,
  AlertTriangle,
  BatteryCharging,
  ChevronRight,
  CircleGauge,
  Factory,
  FileText,
  LayoutDashboard,
  RadioTower,
  Search,
  Settings,
  SunMedium,
  Users,
  Zap,
} from "lucide-react";
import { useState } from "react";

const sites = [
  {
    name: "VERNA WORKS",
    place: "Goa · Industrial",
    state: "Nominal",
    solar: "126.4",
    load: "91.2",
    battery: 78,
    alerts: 0,
  },
  {
    name: "PORVORIM RESIDENCE",
    place: "Goa · Residential",
    state: "Attention",
    solar: "8.2",
    load: "5.7",
    battery: 31,
    alerts: 1,
  },
  {
    name: "PUNE LOGISTICS",
    place: "Maharashtra · Industrial",
    state: "Unconfirmed",
    solar: "—",
    load: "—",
    battery: 0,
    alerts: 2,
  },
];
const leads = [
  ["Aster Hospitality", "Resort", "Survey scheduled", "14 JUL"],
  ["Konkan Cold Chain", "Industrial", "Proposal in progress", "LOAD PROFILE"],
  ["Dona Paula Homes", "Residential", "Negotiation", "ASSUMPTIONS"],
];
const nav = [
  ["Command", LayoutDashboard],
  ["Pipeline", Users],
  ["Fleet", Factory],
  ["Telemetry", Activity],
  ["Alerts", AlertTriangle],
  ["Reports", FileText],
] as const;

export function App() {
  const [active, setActive] = useState("Command");
  const [wing, setWing] = useState<"OPS" | "FLEET">("OPS");
  return (
    <div className="shell">
      <aside>
        <div className="mark">
          <span>G</span>
          <div>
            <b>GRIDENERGY</b>
            <small>OPERATIONS</small>
          </div>
        </div>
        <nav>
          {nav.map(([label, Icon]) => (
            <button
              className={active === label ? "active" : ""}
              onClick={() => setActive(label)}
              key={label}
            >
              <Icon size={17} />
              <span>{label}</span>
              {active === label && <i />}
            </button>
          ))}
        </nav>
        <div className="system">
          <p>PLATFORM STATUS</p>
          <div>
            <span className="pulse" />
            All systems nominal
          </div>
          <small>API · MOCK MODE</small>
        </div>
        <button className="settings">
          <Settings size={16} />
          Workspace settings
        </button>
      </aside>
      <main>
        <header>
          <div>
            <p>DELTAEV / GRID PLATFORM</p>
            <h1>
              {active} <em>room</em>
            </h1>
          </div>
          <div className="header-actions">
            <div className="seg">
              <button className={wing === "OPS" ? "on" : ""} onClick={() => setWing("OPS")}>
                OPS
              </button>
              <button className={wing === "FLEET" ? "on" : ""} onClick={() => setWing("FLEET")}>
                FLEET
              </button>
            </div>
            <button className="search">
              <Search size={16} />
              Search anything <kbd>⌘K</kbd>
            </button>
            <div className="avatar">SS</div>
          </div>
        </header>
        <section className="notice">
          <RadioTower size={15} />
          <b>SIMULATION ENVIRONMENT</b>
          <span>All readings and commercial records on this screen are labelled mock data.</span>
          <time>13 JUL · 00:05 IST</time>
        </section>
        <section className="hero">
          <div>
            <p className="eyebrow">PORTFOLIO PULSE</p>
            <h2>{wing === "OPS" ? "Build the fleet." : "Read the fleet."}</h2>
            <p>
              {wing === "OPS"
                ? "Commercial operations and commissioned systems, connected by one accountable handover."
                : "Every site, device, alert and freshness signal in one operational picture."}
            </p>
          </div>
          <div className="flow">
            <div>
              <SunMedium />
              <span>SOLAR</span>
              <b>
                134.6<small> kW</small>
              </b>
            </div>
            <i>→</i>
            <div>
              <Zap />
              <span>LOAD</span>
              <b>
                96.9<small> kW</small>
              </b>
            </div>
            <i>→</i>
            <div>
              <BatteryCharging />
              <span>STORED</span>
              <b>
                78<small>%</small>
              </b>
            </div>
          </div>
        </section>
        <section className="metrics">
          <article>
            <span>ACTIVE SITES</span>
            <b>24</b>
            <small>21 reporting now</small>
          </article>
          <article>
            <span>OPEN PIPELINE</span>
            <b>₹—</b>
            <small>Values gated until sourced</small>
          </article>
          <article>
            <span>FLEET OUTPUT</span>
            <b>
              134.6 <i>kW</i>
            </b>
            <small className="good">+12.8% vs mock baseline</small>
          </article>
          <article>
            <span>NEEDS ATTENTION</span>
            <b className="red">03</b>
            <small>1 stale · 2 unconfirmed</small>
          </article>
        </section>
        <section className="grid">
          <article className="sites panel">
            <div className="panel-head">
              <div>
                <p>FLEET REGISTER</p>
                <h3>Sites requiring a human glance</h3>
              </div>
              <button>
                Open portfolio <ChevronRight size={14} />
              </button>
            </div>
            {sites.map((s, i) => (
              <div className="site" key={s.name}>
                <div className={`state s${i}`} />
                <div>
                  <b>{s.name}</b>
                  <small>{s.place}</small>
                </div>
                <span className={`status s${i}`}>{s.state}</span>
                <dl>
                  <div>
                    <dt>PV</dt>
                    <dd>
                      {s.solar} <small>kW</small>
                    </dd>
                  </div>
                  <div>
                    <dt>LOAD</dt>
                    <dd>
                      {s.load} <small>kW</small>
                    </dd>
                  </div>
                  <div>
                    <dt>BATTERY</dt>
                    <dd>{s.battery ? `${s.battery}%` : "—"}</dd>
                  </div>
                </dl>
                <span className="alert-count">
                  {s.alerts ? `${s.alerts} ALERT${s.alerts > 1 ? "S" : ""}` : "CLEAR"}
                </span>
                <ChevronRight size={17} />
              </div>
            ))}
          </article>
          <article className="pipeline panel">
            <div className="panel-head">
              <div>
                <p>COMMERCIAL HANDOVER</p>
                <h3>Pipeline moving toward commissioning</h3>
              </div>
              <CircleGauge size={22} />
            </div>
            <div className="funnel">
              <span style={{ width: "100%" }}>
                NEW <b>18</b>
              </span>
              <span style={{ width: "82%" }}>
                QUALIFIED <b>11</b>
              </span>
              <span style={{ width: "63%" }}>
                SURVEY <b>7</b>
              </span>
              <span style={{ width: "45%" }}>
                PROPOSAL <b>4</b>
              </span>
              <span style={{ width: "27%" }}>
                WON <b>2</b>
              </span>
            </div>
            {leads.map((l) => (
              <div className="lead" key={l[0]}>
                <div>
                  <b>{l[0]}</b>
                  <small>{l[1]}</small>
                </div>
                <span>{l[2]}</span>
                <time>{l[3]}</time>
              </div>
            ))}
          </article>
        </section>
        <footer>
          <span>GRID PLATFORM · DEV-22</span>
          <span>Contracts v1 · Tenant boundary enabled · Mock provenance required</span>
        </footer>
      </main>
    </div>
  );
}
