/**
 * Settings notifications — /settings/notifications
 */
import * as React from "react";

const EVENT_TYPES = [
  "Grid event — critical",
  "Grid event — high severity",
  "Site offline",
  "Stack fault",
  "SoC threshold breach",
  "DR dispatch started",
  "DR dispatch completed",
  "Schedule executed",
  "Schedule failed",
  "Firmware update available",
  "Work order created",
  "Work order overdue",
  "Invoice generated",
  "Monthly summary",
];

const CHANNELS = ["Email", "SMS", "Slack", "Webhook"];

export default function SettingsNotifications() {
  const [matrix, setMatrix] = React.useState<Record<string, Record<string, boolean>>>(() => {
    const m: Record<string, Record<string, boolean>> = {};
    EVENT_TYPES.forEach(evt => {
      m[evt] = {
        Email:   evt.includes("critical") || evt.includes("offline") || evt.includes("fault"),
        SMS:     evt.includes("critical"),
        Slack:   evt.includes("critical") || evt.includes("high"),
        Webhook: evt.includes("critical") || evt.includes("dispatch"),
      };
    });
    return m;
  });

  const toggle = (evt: string, ch: string) => {
    setMatrix(prev => ({ ...prev, [evt]: { ...prev[evt]!, [ch]: !prev[evt]![ch] } }));
  };

  return (
    <section aria-labelledby="notif-heading" className="flex flex-col gap-4 max-w-3xl">
      <h2 id="notif-heading" className="font-body text-[14px] font-semibold text-foreground">Notification preferences</h2>
      <p className="font-body text-[12px] text-muted-foreground">Choose which events trigger notifications per channel.</p>
      <div className="rounded-card border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full" aria-label="Notification preferences matrix">
            <caption className="sr-only">Notification preferences per event and channel</caption>
            <thead>
              <tr className="border-b border-border bg-muted">
                <th scope="col" className="px-4 py-2.5 text-left font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground font-normal">Event</th>
                {CHANNELS.map(ch => (
                  <th key={ch} scope="col" className="px-4 py-2.5 text-center font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground font-normal">{ch}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {EVENT_TYPES.map(evt => (
                <tr key={evt} className="border-b border-border last:border-0 hover:bg-muted transition-colors duration-100">
                  <td className="px-4 py-2.5 font-body text-[12px] text-foreground">{evt}</td>
                  {CHANNELS.map(ch => (
                    <td key={ch} className="px-4 py-2.5 text-center">
                      <input type="checkbox" checked={matrix[evt]?.[ch] ?? false} onChange={() => toggle(evt, ch)}
                        aria-label={`${evt} via ${ch}`} className="accent-primary cursor-pointer" />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-end pt-2">
        <button type="button" className="px-4 py-2 rounded-btn bg-primary text-white font-body text-[13px] font-medium hover:bg-primary/90 transition-colors cursor-pointer">
          Save preferences
        </button>
      </div>
    </section>
  );
}
