/**
 * Analytics exports — /analytics/exports
 * Mirror of console-charge pattern.
 */
import * as React from "react";
import { Play, Pause, Pencil, Trash2, Plus, AlertCircle, Calendar, CheckCircle2, XCircle, Clock } from "lucide-react";

type ExportFrequency = "daily" | "weekly" | "monthly";
type ExportFormat = "CSV" | "Excel" | "JSON";
type ExportStatus = "active" | "paused" | "error";

interface ScheduledExport {
  id: string; name: string; frequency: ExportFrequency; format: ExportFormat;
  filtersSummary: string; recipients: string[]; lastRun: string | null;
  nextRun: string; status: ExportStatus;
}

const SCHEDULED_EXPORTS: ScheduledExport[] = [
  { id: "EXP-E001", name: "Daily energy throughput report", frequency: "daily",   format: "CSV",   filtersSummary: "All sites, charge/discharge MWh",                  recipients: ["ops@gridenergy.co.in"],                lastRun: "Today, 06:00",       nextRun: "Tomorrow, 06:00",  status: "active"  },
  { id: "EXP-E002", name: "Weekly revenue summary",         frequency: "weekly",  format: "Excel", filtersSummary: "Revenue by site, Mon-Sun",                          recipients: ["finance@gridenergy.co.in"],             lastRun: "Monday, 08:00",      nextRun: "Next Mon, 08:00",  status: "active"  },
  { id: "EXP-E003", name: "Monthly DR settlement report",   frequency: "monthly", format: "Excel", filtersSummary: "DR program dispatch and revenue",                   recipients: ["billing@gridenergy.co.in"],             lastRun: "1 April 2025",       nextRun: "1 May 2025",       status: "active"  },
  { id: "EXP-E004", name: "Monthly SoH summary",            frequency: "monthly", format: "CSV",   filtersSummary: "All stacks, SoH%, cycle count",                     recipients: ["engineering@gridenergy.co.in"],         lastRun: "1 April 2025",       nextRun: "1 May 2025",       status: "active"  },
  { id: "EXP-E005", name: "Customer billing extract",       frequency: "monthly", format: "CSV",   filtersSummary: "All customers, energy delivered, invoice amount",   recipients: ["billing@gridenergy.co.in","accounts@"],  lastRun: "1 April 2025",       nextRun: "1 May 2025",       status: "active"  },
  { id: "EXP-E006", name: "Grid events log",                frequency: "weekly",  format: "JSON",  filtersSummary: "All frequency/voltage events",                      recipients: ["grid@gridenergy.co.in"],                lastRun: null,                 nextRun: "Sunday, 23:59",    status: "error"   },
  { id: "EXP-E007", name: "Firmware compliance audit",      frequency: "monthly", format: "CSV",   filtersSummary: "All stacks, firmware version, rollout status",      recipients: ["engineering@gridenergy.co.in"],         lastRun: "1 April 2025",       nextRun: "1 May 2025",       status: "active"  },
  { id: "EXP-E008", name: "CERC dispatch report",           frequency: "monthly", format: "Excel", filtersSummary: "CERC format, all dispatch events",                  recipients: ["compliance@gridenergy.co.in"],          lastRun: "1 April 2025",       nextRun: "1 July 2025",      status: "paused"  },
];

function InlineNotice({ message, onDismiss }: { message: string; onDismiss: () => void }) {
  React.useEffect(() => { const t = setTimeout(onDismiss, 3500); return () => clearTimeout(t); }, [onDismiss]);
  return (
    <div role="status" aria-live="polite" className="rounded-card border border-border bg-card text-foreground px-4 py-2.5 font-mono text-[11px] tracking-[0.06em]">
      {message}
    </div>
  );
}

function StatusPill({ status }: { status: ExportStatus }) {
  const styles: Record<ExportStatus, { bg: string; text: string; icon: React.ReactNode; label: string }> = {
    active: { bg: "bg-success/10", text: "text-success", icon: <CheckCircle2 size={11} aria-hidden="true" />, label: "Active"  },
    paused: { bg: "bg-warning/10", text: "text-warning", icon: <Clock       size={11} aria-hidden="true" />, label: "Paused"  },
    error:  { bg: "bg-error/10",   text: "text-error",   icon: <XCircle     size={11} aria-hidden="true" />, label: "Error"   },
  };
  const s = styles[status];
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[10px] font-medium ${s.bg} ${s.text}`}>
      {s.icon}{s.label}
    </span>
  );
}

export default function AnalyticsExports() {
  const [exports, setExports] = React.useState<ScheduledExport[]>(SCHEDULED_EXPORTS);
  const [notice, setNotice] = React.useState<string | null>(null);
  const dismiss = React.useCallback(() => setNotice(null), []);

  const handlePause = (id: string) => {
    setExports(prev => prev.map(e => e.id === id ? { ...e, status: e.status === "paused" ? "active" : "paused" } : e));
    const ex = exports.find(e => e.id === id);
    if (ex) setNotice(ex.status === "paused" ? `${ex.name} resumed.` : `${ex.name} paused.`);
  };

  return (
    <div className="flex flex-col gap-5">
      <h2 className="sr-only">Scheduled exports</h2>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h3 className="font-body text-[16px] font-semibold text-foreground">Scheduled exports</h3>
          <p className="font-mono text-[11px] text-muted-foreground mt-0.5">{exports.filter(e => e.status === "active").length} active · {exports.length} total</p>
        </div>
        <button type="button" onClick={() => setNotice("Schedule export dialog coming soon.")}
          className="flex items-center gap-1.5 rounded-btn bg-primary px-3.5 py-2 font-body text-[12px] font-medium text-white hover:bg-primary/90 transition-colors duration-150 ease-out cursor-pointer self-start sm:self-auto">
          <Plus size={13} aria-hidden="true" />Schedule recurring export
        </button>
      </div>

      {notice && <InlineNotice message={notice} onDismiss={dismiss} />}

      <div className="rounded-card border border-border bg-card overflow-hidden">
        {/* Loading: skeleton. Empty: "Schedule your first export." Error: role="alert". */}
        <div className="overflow-x-auto">
          <table className="min-w-full" aria-label="Scheduled exports">
            <caption className="sr-only">Scheduled data exports and their status</caption>
            <thead>
              <tr className="border-b border-border bg-muted">
                {["Name","Frequency","Format","Filters","Recipients","Last run","Next run","Status",""].map(h => (
                  <th key={h} scope="col" className="px-4 py-2.5 text-left font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground font-normal whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {exports.map(ex => (
                <tr key={ex.id} className="border-b border-border last:border-0 hover:bg-muted transition-colors duration-100 ease-out">
                  <td className="px-4 py-3 min-w-[160px]">
                    <div className="font-body text-[13px] font-medium text-foreground">{ex.name}</div>
                    <div className="font-mono text-[10px] text-muted-foreground">{ex.id}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 font-mono text-[10px] text-muted-foreground">
                      <Calendar size={10} aria-hidden="true" />{ex.frequency.charAt(0).toUpperCase() + ex.frequency.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3"><span className="inline-flex rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-foreground">{ex.format}</span></td>
                  <td className="px-4 py-3 max-w-[180px]"><span className="font-body text-[12px] text-muted-foreground">{ex.filtersSummary}</span></td>
                  <td className="px-4 py-3 min-w-[140px]">
                    {ex.recipients.slice(0, 2).map(r => <div key={r} className="font-mono text-[10px] text-muted-foreground truncate max-w-[160px]">{r}</div>)}
                    {ex.recipients.length > 2 && <div className="font-mono text-[10px] text-muted-foreground">+{ex.recipients.length - 2} more</div>}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {ex.lastRun ? <span className="font-mono text-[11px] text-muted-foreground">{ex.lastRun}</span> :
                      <span className="inline-flex items-center gap-1 font-mono text-[10px] text-error"><AlertCircle size={10} aria-hidden="true" />Never ran</span>}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`font-mono text-[11px] ${ex.status === "paused" ? "text-muted-foreground line-through" : "text-foreground"}`}>{ex.nextRun}</span>
                  </td>
                  <td className="px-4 py-3"><StatusPill status={ex.status} /></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button type="button" aria-label={ex.status === "paused" ? `Resume ${ex.name}` : `Pause ${ex.name}`}
                        className="flex h-7 w-7 items-center justify-center rounded-btn border border-transparent text-muted-foreground hover:border-border hover:bg-muted transition-colors duration-150 ease-out cursor-pointer"
                        onClick={() => handlePause(ex.id)}>
                        {ex.status === "paused" ? <Play size={12} aria-hidden="true" /> : <Pause size={12} aria-hidden="true" />}
                      </button>
                      <button type="button" aria-label={`Edit ${ex.name}`}
                        className="flex h-7 w-7 items-center justify-center rounded-btn border border-transparent text-muted-foreground hover:border-border hover:bg-muted transition-colors duration-150 ease-out cursor-pointer"
                        onClick={() => setNotice(`Edit dialog for ${ex.name} coming soon.`)}>
                        <Pencil size={12} aria-hidden="true" />
                      </button>
                      <button type="button" aria-label={`Delete ${ex.name}`}
                        className="flex h-7 w-7 items-center justify-center rounded-btn border border-transparent text-muted-foreground hover:border-border hover:bg-muted hover:text-error transition-colors duration-150 ease-out cursor-pointer"
                        onClick={() => { setExports(prev => prev.filter(e => e.id !== ex.id)); setNotice(`${ex.name} deleted.`); }}>
                        <Trash2 size={12} aria-hidden="true" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
