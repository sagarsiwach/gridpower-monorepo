import React from "react";
import { createRoot } from "react-dom/client";
import {
  BatteryMedium,
  Bell,
  ChevronDown,
  CloudSun,
  FileText,
  Home,
  Leaf,
  Settings,
  ShieldCheck,
  Sun,
  Zap,
} from "lucide-react";
import "./styles.css";
const points = [18, 24, 21, 32, 46, 58, 71, 88, 103, 119, 128, 121, 110, 96, 82, 67, 51, 39, 28];
function App() {
  return (
    <div className="page">
      <header>
        <div className="logo">
          GRID<span>ENERGY</span>
          <small>GridOS</small>
        </div>
        <nav>
          <button className="on">
            <Home />
            Overview
          </button>
          <button>
            <Zap />
            Energy
          </button>
          <button>
            <FileText />
            Reports
          </button>
          <button>
            <Bell />
            Alerts <i>1</i>
          </button>
        </nav>
        <div className="user">
          <button>
            Porvorim Residence <ChevronDown />
          </button>
          <span>SS</span>
        </div>
      </header>
      <main>
        <div className="mock">DEMONSTRATION DATA · NOT CONNECTED TO A LIVE SYSTEM</div>
        <section className="welcome">
          <div>
            <p>SUNDAY · 13 JULY</p>
            <h1>
              Your home is running
              <br />
              <em>mostly on sunlight.</em>
            </h1>
            <span>Last reading 2 minutes ago · Mock freshness</span>
          </div>
          <div className="health">
            <ShieldCheck />
            <div>
              <small>SYSTEM HEALTH</small>
              <b>Everything looks good</b>
            </div>
          </div>
        </section>
        <section className="flow">
          <div className="source solar">
            <Sun />
            <small>SOLAR NOW</small>
            <b>
              8.2 <em>kW</em>
            </b>
            <span>Generating</span>
          </div>
          <div className="rail">
            <span />
            <i>→</i>
          </div>
          <div className="home">
            <Home />
            <small>HOME LOAD</small>
            <b>
              5.7 <em>kW</em>
            </b>
            <span>69% from solar</span>
          </div>
          <div className="rail">
            <span />
            <i>→</i>
          </div>
          <div className="source battery">
            <BatteryMedium />
            <small>BATTERY</small>
            <b>
              78<em>%</em>
            </b>
            <span>Charging · 1.4 kW</span>
          </div>
        </section>
        <section className="tiles">
          <article className="chart">
            <div className="head">
              <div>
                <small>TODAY'S GENERATION</small>
                <h2>
                  31.8 <em>kWh</em>
                </h2>
              </div>
              <div className="weather">
                <CloudSun />
                <span>
                  32°C
                  <br />
                  <small>Partly cloudy</small>
                </span>
              </div>
            </div>
            <div className="bars">
              {points.map((p, i) => (
                <i key={i} style={{ height: `${p}px` }} className={i === 10 ? "peak" : ""} />
              ))}
            </div>
            <div className="axis">
              <span>6 AM</span>
              <span>NOON</span>
              <span>6 PM</span>
            </div>
          </article>
          <article className="impact">
            <Leaf />
            <small>ENERGY INDEPENDENCE</small>
            <strong>86%</strong>
            <div>
              <span style={{ width: "86%" }} />
            </div>
            <p>Most of today's consumption came from your solar and battery system.</p>
            <dl>
              <div>
                <dt>From solar</dt>
                <dd>24.3 kWh</dd>
              </div>
              <div>
                <dt>From battery</dt>
                <dd>3.1 kWh</dd>
              </div>
              <div>
                <dt>From grid</dt>
                <dd>4.4 kWh</dd>
              </div>
            </dl>
          </article>
          <article className="alert">
            <Bell />
            <div>
              <small>ONE ITEM NEEDS ATTENTION</small>
              <h3>Battery reserve is set to 20%</h3>
              <p>Your evening reserve is lower than the suggested mock profile.</p>
              <button>Review setting →</button>
            </div>
          </article>
        </section>
      </main>
      <footer>
        <span>GridOS customer portal · isolated from internal operations</span>
        <button>
          <Settings />
          Preferences
        </button>
      </footer>
    </div>
  );
}
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
