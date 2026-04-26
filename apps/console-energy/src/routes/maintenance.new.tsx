/**
 * New work order form — /maintenance/new
 * Mirror of console-charge pattern.
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

export default function MaintenanceNew() {
  const navigate = useNavigate();
  const [notice, setNotice] = React.useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setNotice("Work order created (mock). Redirecting...");
    setTimeout(() => navigate("/maintenance"), 2000);
  }

  return (
    <section className="flex flex-col gap-6 max-w-2xl" aria-labelledby="new-wo-heading">
      <h2 id="new-wo-heading" className="font-body text-[18px] font-semibold text-foreground">New work order</h2>

      {notice && <InlineNotice message={notice} onDismiss={() => setNotice(null)} />}

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="rounded-card border border-border bg-card p-5 flex flex-col gap-4">
          <h3 className="font-body text-[12px] font-semibold text-foreground">Work order details</h3>

          <div>
            <label htmlFor="wo-title" className={FIELD_LABEL}>Title<span aria-hidden="true" className="text-error ml-0.5">*</span></label>
            <Input id="wo-title" type="text" placeholder="Brief description of work required" required />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="wo-site" className={FIELD_LABEL}>Site<span aria-hidden="true" className="text-error ml-0.5">*</span></label>
              <select id="wo-site" required className="w-full h-9 rounded-input border border-border bg-background px-3 font-body text-[13px] text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-[box-shadow,border-color] duration-150 ease-out">
                <option value="">Select a site</option>
                {ALL_SITES.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="wo-type" className={FIELD_LABEL}>Type<span aria-hidden="true" className="text-error ml-0.5">*</span></label>
              <select id="wo-type" required className="w-full h-9 rounded-input border border-border bg-background px-3 font-body text-[13px] text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-[box-shadow,border-color] duration-150 ease-out">
                <option value="">Select type</option>
                {["preventive","corrective","inspection","firmware","emergency"].map(t => (
                  <option key={t} value={t} className="capitalize">{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="wo-priority" className={FIELD_LABEL}>Priority<span aria-hidden="true" className="text-error ml-0.5">*</span></label>
              <select id="wo-priority" required className="w-full h-9 rounded-input border border-border bg-background px-3 font-body text-[13px] text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-[box-shadow,border-color] duration-150 ease-out">
                <option value="">Select priority</option>
                {["critical","high","medium","low"].map(p => (
                  <option key={p} value={p} className="capitalize">{p}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="wo-assignee" className={FIELD_LABEL}>Assignee</label>
              <Input id="wo-assignee" type="text" placeholder="Name of technician" />
            </div>
          </div>

          <div>
            <label htmlFor="wo-desc" className={FIELD_LABEL}>Description</label>
            <textarea id="wo-desc" rows={4} placeholder="Detailed description of work required, symptoms, relevant context..."
              className="w-full rounded-input border border-border bg-background px-3 py-2 font-body text-[13px] text-foreground placeholder:text-muted-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-[box-shadow,border-color] duration-150 ease-out resize-y" />
          </div>

          <div>
            <label htmlFor="wo-due" className={FIELD_LABEL}>Due date</label>
            <Input id="wo-due" type="date" />
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button type="button" onClick={() => navigate("/maintenance")}
            className="px-4 py-2 rounded-btn border border-border font-body text-[13px] text-muted-foreground hover:bg-muted transition-colors cursor-pointer">
            Cancel
          </button>
          <button type="submit"
            className="px-4 py-2 rounded-btn bg-primary text-white font-body text-[13px] font-medium hover:bg-primary/90 transition-colors cursor-pointer">
            Create work order
          </button>
        </div>
      </form>
    </section>
  );
}
