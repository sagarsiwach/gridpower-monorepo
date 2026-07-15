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
        <a className="logo" href="#overview" aria-label="GridEnergy GridOS home">
          GRID<span>ENERGY</span>
          <small>GridOS</small>
        </a>
        <nav aria-label="Primary navigation">
          <button type="button" className="on" aria-current="page">
            <Home />
            Overview
          </button>
          <button type="button">
            <Zap />
            Energy
          </button>
          <button type="button">
            <FileText />
            Reports
          </button>
          <button type="button">
            <Bell />
            Alerts <i aria-label="1 unread alert">1</i>
          </button>
        </nav>
        <div className="user">
          <button type="button" aria-label="Choose site, currently Porvorim Residence">
            Porvorim Residence <ChevronDown />
          </button>
          <span aria-label="Sagar Siwach profile">SS</span>
        </div>
      </header>
      <main id="overview">
        <div className="mock" role="status">
          Demo data only <span>Not connected to a live energy system</span>
        </div>
        <section className="welcome">
          <div>
            <p>Demo snapshot · Sunday, 13 July</p>
            <h1>
              Your home is running
              <br />
              <em>mostly on sunlight.</em>
            </h1>
            <span>Illustrative reading from 2 minutes ago</span>
          </div>
          <div className="health" role="status" aria-label="System health: Everything looks good">
            <ShieldCheck />
            <div>
              <small>System health</small>
              <b>Everything looks good</b>
            </div>
          </div>
        </section>
        <section className="flow" aria-label="Current energy flow">
          <div className="source solar">
            <Sun />
            <small>Solar now</small>
            <b>
              8.2 <em>kW</em>
            </b>
            <span>Generating</span>
          </div>
          <div className="rail" aria-hidden="true">
            <span />
            <i>→</i>
          </div>
          <div className="home">
            <Home />
            <small>Home load</small>
            <b>
              5.7 <em>kW</em>
            </b>
            <span>69% from solar</span>
          </div>
          <div className="rail" aria-hidden="true">
            <span />
            <i>→</i>
          </div>
          <div className="source battery">
            <BatteryMedium />
            <small>Battery</small>
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
                <small>Today's generation</small>
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
            <div
              className="bars"
              role="img"
              aria-label="Solar generation rises from 6 AM, peaks near noon, and declines toward 6 PM"
            >
              {points.map((p, i) => (
                <i
                  key={`${p}-${i}`}
                  aria-hidden="true"
                  style={{ height: `${p}px` }}
                  className={i === 10 ? "peak" : ""}
                />
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
            <small>Energy independence</small>
            <strong>86%</strong>
            <div
              role="progressbar"
              aria-label="Energy independence"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={86}
            >
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
          <article className="alert" aria-labelledby="reserve-alert-title">
            <Bell />
            <div>
              <small>Needs attention</small>
              <h3 id="reserve-alert-title">Battery reserve is set to 20%</h3>
              <p>Your evening reserve is lower than the suggested mock profile.</p>
              <button type="button">Review setting <span aria-hidden="true">→</span></button>
            </div>
          </article>
        </section>
      </main>
      <footer>
        <span>GridOS customer portal · isolated from internal operations</span>
        <button type="button">
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
