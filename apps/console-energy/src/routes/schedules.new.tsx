/**
 * New schedule form — /schedules/new
 */
import * as React from "react";
import { useNavigate } from "react-router";
import { Input } from "@gridpower/ui";
import { ALL_SITES } from "~/mocks/sites";

function InlineNotice({ message, onDismiss }: { message: string; onDismiss: () => void }) {
  React.useEffect(() => { const t = setTimeout(onDismiss, 4000); return () => clearTimeout(t); }, [onDismiss]);
  return (
    <div role="status" aria-live="polite" className="rounded-card border border-border bg-card text-foreground px-4 py-2.5 font-mono text-[11px] tracking-[0.06em]">
      {message}
    </div>
  );
}

const FIELD_LABEL = "block font-body text-[11px] font-medium text-muted-foreground mb-1.5";

export default function SchedulesNew() {
  const navigate = useNavigate();
  const [notice, setNotice] = React.useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setNotice("Schedule saved (mock). Redirecting to schedules list...");
    setTimeout(() => navigate("/schedules"), 2000);
  }

  return (
    <section className="flex flex-col gap-6 max-w-2xl" aria-labelledby="new-sch-heading">
      <h2 id="new-sch-heading" className="font-body text-[18px] font-semibold text-foreground">New discharge schedule</h2>

      {notice && <InlineNotice message={notice} onDismiss={() => setNotice(null)} />}

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="rounded-card border border-border bg-card p-5 flex flex-col gap-4">
          <h3 className="font-body text-[12px] font-semibold text-foreground">Schedule details</h3>

          <div>
            <label htmlFor="sch-name" className={FIELD_LABEL}>Schedule name<span aria-hidden="true" className="text-error ml-0.5">*</span></label>
            <Input id="sch-name" type="text" placeholder="e.g. Pune Evening Peak Discharge" required />
          </div>

          <div>
            <label htmlFor="sch-site" className={FIELD_LABEL}>Site<span aria-hidden="true" className="text-error ml-0.5">*</span></label>
            <select id="sch-site" required className="w-full h-9 rounded-input border border-border bg-background px-3 font-body text-[13px] text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-[box-shadow,border-color] duration-150 ease-out">
              <option value="">Select a site</option>
              {ALL_SITES.filter(s => s.status === "online").map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={FIELD_LABEL}>Schedule type<span aria-hidden="true" className="text-error ml-0.5">*</span></label>
            <div className="flex flex-col gap-2" role="radiogroup" aria-label="Schedule type">
              {[
                { value: "peak-discharge", label: "Peak discharge", desc: "Discharge during high-tariff window" },
                { value: "arbitrage",      label: "Arbitrage",      desc: "Charge at off-peak, discharge at peak rate" },
                { value: "dr-dispatch",    label: "DR dispatch",    desc: "Respond to demand response program calls" },
                { value: "frequency-response", label: "Frequency response", desc: "Continuous automatic frequency regulation" },
              ].map(opt => (
                <label key={opt.value} className="flex items-start gap-3 cursor-pointer rounded-btn border border-border p-3 hover:bg-muted transition-colors duration-150 ease-out">
                  <input type="radio" name="sch-type" value={opt.value} className="mt-0.5 accent-primary" />
                  <div>
                    <div className="font-body text-[13px] font-medium text-foreground">{opt.label}</div>
                    <div className="font-body text-[11px] text-muted-foreground">{opt.desc}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-card border border-border bg-card p-5 flex flex-col gap-4">
          <h3 className="font-body text-[12px] font-semibold text-foreground">Dispatch window</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="sch-start" className={FIELD_LABEL}>Start time</label>
              <Input id="sch-start" type="time" defaultValue="17:00" />
            </div>
            <div>
              <label htmlFor="sch-end" className={FIELD_LABEL}>End time</label>
              <Input id="sch-end" type="time" defaultValue="21:00" />
            </div>
            <div>
              <label htmlFor="sch-target" className={FIELD_LABEL}>Target MW<span aria-hidden="true" className="text-error ml-0.5">*</span></label>
              <Input id="sch-target" type="number" step="0.1" min="0" placeholder="e.g. 4.0" required />
            </div>
          </div>
          <div>
            <legend className={FIELD_LABEL}>Days of week</legend>
            <div className="flex gap-2 flex-wrap" role="group" aria-label="Days of week">
              {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(d => (
                <label key={d} className="flex items-center gap-1.5 cursor-pointer rounded-btn border border-border px-3 py-1.5 hover:bg-muted transition-colors duration-150 ease-out">
                  <input type="checkbox" defaultChecked={!["Sat","Sun"].includes(d)} className="accent-primary" />
                  <span className="font-body text-[12px] text-foreground">{d}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button type="button" onClick={() => navigate("/schedules")}
            className="px-4 py-2 rounded-btn border border-border font-body text-[13px] text-muted-foreground hover:bg-muted transition-colors cursor-pointer">
            Cancel
          </button>
          <button type="submit"
            className="px-4 py-2 rounded-btn bg-primary text-white font-body text-[13px] font-medium hover:bg-primary/90 transition-colors cursor-pointer">
            Save schedule
          </button>
        </div>
      </form>
    </section>
  );
}
