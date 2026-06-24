/**
 * CON.ANALYTICS.REPORTS: Pre-built compliance and operational reports
 * Route: /analytics/reports
 *
 * - 8 report type cards in a grid
 * - Each card: title, description, last generated date, Generate CTA + Download last link
 */

import * as React from "react";
import {
  FileText,
  RefreshCw,
  Download,
  CheckCircle2,
  Clock,
  AlertCircle,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type ReportStatus = "ready" | "generating" | "error" | "never";

interface ReportType {
  id: string;
  title: string;
  description: string;
  lastGenerated: string | null;
  lastFileSize: string | null;
  status: ReportStatus;
  tag: string;
}

// ─── Mock data ────────────────────────────────────────────────────────────────

const REPORT_TYPES: ReportType[] = [
  {
    id: "mop-quarterly",
    title: "Quarterly MoP report",
    description:
      "Ministry of Power mandated quarterly disclosure of public EV charging infrastructure. Includes station count, uptime, session volumes, and energy delivered in the prescribed format.",
    lastGenerated: "1 April 2025",
    lastFileSize: "248 KB",
    status: "ready",
    tag: "Compliance",
  },
  {
    id: "revenue-monthly",
    title: "Monthly revenue summary",
    description:
      "Consolidated revenue by station, tariff, and payment method for the calendar month. Includes net after refunds, GST collected, and payout-ready amount.",
    lastGenerated: "1 April 2025",
    lastFileSize: "182 KB",
    status: "ready",
    tag: "Finance",
  },
  {
    id: "driver-funnel",
    title: "Driver acquisition funnel",
    description:
      "Cohort-based funnel from first RFID registration to first session to repeat user. Identifies drop-off points and supports marketing and onboarding optimisation.",
    lastGenerated: "31 March 2025",
    lastFileSize: "94 KB",
    status: "ready",
    tag: "Growth",
  },
  {
    id: "region-breakdown",
    title: "Per-region breakdown",
    description:
      "Revenue, sessions, utilisation, and energy throughput segmented by city and state. Useful for network planning, regional P&L, and investor reporting.",
    lastGenerated: "31 March 2025",
    lastFileSize: "310 KB",
    status: "ready",
    tag: "Operations",
  },
  {
    id: "dr-participation",
    title: "DR program participation",
    description:
      "Demand response event log showing which stations participated in each event, load curtailment achieved versus committed, and incentive credits earned.",
    lastGenerated: null,
    lastFileSize: null,
    status: "never",
    tag: "Energy",
  },
  {
    id: "energy-throughput",
    title: "Energy throughput report",
    description:
      "Total kWh delivered aggregated by station, month, and connector type. Supports DISCOM reporting, carbon accounting, and infrastructure grant applications.",
    lastGenerated: "1 April 2025",
    lastFileSize: "156 KB",
    status: "ready",
    tag: "Compliance",
  },
  {
    id: "gst-returns",
    title: "GST returns helper",
    description:
      "Pre-filled GSTR-1 data covering taxable value, CGST, SGST, and IGST for all sessions in the period. Exportable in the government-mandated JSON and CSV formats.",
    lastGenerated: "10 April 2025",
    lastFileSize: "88 KB",
    status: "ready",
    tag: "Finance",
  },
  {
    id: "uptime-sla",
    title: "Charger uptime SLA report",
    description:
      "Station-by-station uptime percentage against contracted SLA thresholds. Flags breaches, lists maintenance windows, and provides evidence for insurance claims.",
    lastGenerated: "1 April 2025",
    lastFileSize: "204 KB",
    status: "ready",
    tag: "Operations",
  },
];

// ─── Inline notice (replaces alert()) ─────────────────────────────────────────

function InlineNotice({
  message,
  onDismiss,
}: {
  message: string;
  onDismiss: () => void;
}) {
  React.useEffect(() => {
    const t = setTimeout(onDismiss, 3500);
    return () => clearTimeout(t);
  }, [onDismiss]);
  return (
    <div
      role="status"
      aria-live="polite"
      className="rounded-card border border-border bg-card text-foreground px-4 py-2.5 font-mono text-label shadow-sm"
    >
      {message}
    </div>
  );
}

// ─── Status icon ──────────────────────────────────────────────────────────────

function StatusIcon({ status }: { status: ReportStatus }) {
  switch (status) {
    case "ready":
      return <CheckCircle2 size={13} className="text-success" aria-label="Ready" />;
    case "generating":
      return <RefreshCw size={13} className="text-warning animate-spin" aria-label="Generating" />;
    case "error":
      return <AlertCircle size={13} className="text-error" aria-label="Error" />;
    case "never":
      return <Clock size={13} className="text-muted-foreground" aria-label="Never generated" />;
  }
}

// ─── Tag pill ──────────────────────────────────────────────────────────────────

function TagPill({ tag }: { tag: string }) {
  const styles: Record<string, string> = {
    Compliance: "bg-info/10 text-info",
    Finance: "bg-success/10 text-success",
    Growth: "bg-warning/10 text-warning",
    Operations: "bg-muted text-muted-foreground",
    Energy: "bg-primary/10 text-primary",
  };
  const cls = styles[tag] ?? "bg-muted text-muted-foreground";
  return (
    <span className={`inline-flex rounded-full px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider font-medium ${cls}`}>
      {tag}
    </span>
  );
}

// ─── Report card ──────────────────────────────────────────────────────────────

function ReportCard({
  report,
  onGenerate,
  onDownload,
}: {
  report: ReportType;
  onGenerate: (id: string) => void;
  onDownload: (id: string) => void;
}) {
  const isGenerating = report.status === "generating";

  return (
    <div className="rounded-card border border-border bg-card p-5 flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <FileText size={15} className="text-muted-foreground shrink-0" aria-hidden="true" />
          <h3 className="font-body text-[14px] font-semibold text-foreground leading-tight">
            {report.title}
          </h3>
        </div>
        <TagPill tag={report.tag} />
      </div>

      {/* Description */}
      <p className="font-body text-[12px] leading-relaxed text-muted-foreground flex-1">
        {report.description}
      </p>

      {/* Last generated */}
      <div className="flex items-center gap-1.5 border-t border-border pt-3">
        <StatusIcon status={report.status} />
        <span className="font-mono text-[10px] text-muted-foreground">
          {report.status === "generating"
            ? "Generating..."
            : report.status === "error"
            ? "Last run failed"
            : report.lastGenerated
            ? `Last generated ${report.lastGenerated}${report.lastFileSize ? ` · ${report.lastFileSize}` : ""}`
            : "Never generated"}
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label={`Generate ${report.title}`}
          aria-busy={isGenerating}
          disabled={isGenerating}
          onClick={() => onGenerate(report.id)}
          className="flex items-center gap-1.5 rounded-btn bg-primary px-3 py-1.5 font-body text-[12px] font-medium text-white hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-150 ease-out cursor-pointer"
        >
          {isGenerating ? (
            <RefreshCw size={11} className="animate-spin" aria-hidden="true" />
          ) : (
            <RefreshCw size={11} aria-hidden="true" />
          )}
          Generate
        </button>
        {report.lastGenerated && (
          <button
            type="button"
            aria-label={`Download last ${report.title}`}
            onClick={() => onDownload(report.id)}
            className="flex items-center gap-1.5 rounded-btn border border-border bg-transparent px-3 py-1.5 font-body text-[12px] text-foreground hover:bg-muted transition-colors duration-150 ease-out cursor-pointer"
          >
            <Download size={11} aria-hidden="true" />
            Download last
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Reports page ─────────────────────────────────────────────────────────────

export default function AnalyticsReports() {
  const [reports, setReports] = React.useState<ReportType[]>(REPORT_TYPES);
  const [notice, setNotice] = React.useState<string | null>(null);

  const dismiss = React.useCallback(() => setNotice(null), []);

  const handleGenerate = React.useCallback((id: string) => {
    const rep = reports.find((r) => r.id === id);
    if (!rep) return;

    setReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "generating" as ReportStatus } : r))
    );

    // Simulate generation completing after 1.5s
    setTimeout(() => {
      setReports((prev) =>
        prev.map((r) =>
          r.id === id
            ? {
                ...r,
                status: "ready" as ReportStatus,
                lastGenerated: "Just now",
                lastFileSize: r.lastFileSize ?? "120 KB",
              }
            : r
        )
      );
      setNotice(`${rep.title} generated. Ready to download.`);
    }, 1500);
  }, [reports]);

  const handleDownload = React.useCallback((id: string) => {
    const rep = reports.find((r) => r.id === id);
    if (!rep) return;

    const blob = new Blob(
      [`GridPower report: ${rep.title}\nGenerated: ${rep.lastGenerated ?? "N/A"}\nStub data placeholder.`],
      { type: "text/csv" }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${rep.id}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    setNotice(`${rep.title} download started.`);
  }, [reports]);

  const readyCount = reports.filter((r) => r.status === "ready").length;

  return (
    <div className="flex flex-col gap-5">
      <h2 className="sr-only">Pre-built reports</h2>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="font-body text-[16px] font-semibold text-foreground">
            Pre-built reports
          </h2>
          <p className="font-mono text-[11px] text-muted-foreground mt-0.5">
            {readyCount} reports ready · {reports.length} total
          </p>
        </div>
      </div>

      {notice && <InlineNotice message={notice} onDismiss={dismiss} />}

      {/* Report cards grid */}
      <section aria-labelledby="reports-grid-heading">
        <h3 id="reports-grid-heading" className="sr-only">Available reports</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {reports.map((report) => (
            <ReportCard
              key={report.id}
              report={report}
              onGenerate={handleGenerate}
              onDownload={handleDownload}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
