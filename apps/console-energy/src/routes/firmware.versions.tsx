/**
 * Firmware versions — /firmware/versions
 */
import { useNavigate } from "react-router";
import { ALL_FIRMWARE_VERSIONS } from "~/mocks/firmware";

export default function FirmwareVersions() {
  return (
    <section aria-labelledby="fw-versions-heading" className="flex flex-col gap-4">
      <h2 id="fw-versions-heading" className="font-body text-[16px] font-semibold text-foreground">Firmware versions</h2>
      {/* Loading: skeleton. Empty: "No firmware versions registered." Error: role="alert". */}
      <div className="rounded-card border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full" aria-label="Firmware version list">
            <caption className="sr-only">Available firmware versions and install counts</caption>
            <thead>
              <tr className="border-b border-border bg-muted">
                {["Version","Released","Status","Compatible with","Install count","Min HW rev","Changelog"].map(h => (
                  <th key={h} scope="col" className="px-4 py-2.5 text-left font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground font-normal whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ALL_FIRMWARE_VERSIONS.map(fw => (
                <tr key={fw.id} className="border-b border-border last:border-0 hover:bg-muted transition-colors duration-100">
                  <td className="px-4 py-2.5 font-mono text-[13px] font-semibold text-foreground">v{fw.version}</td>
                  <td className="px-4 py-2.5 font-mono text-[11px] text-muted-foreground whitespace-nowrap">{fw.releaseDate}</td>
                  <td className="px-4 py-2.5">
                    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[10px] font-medium capitalize ${fw.status === "stable" ? "bg-success/10 text-success" : fw.status === "beta" ? "bg-info/10 text-info" : fw.status === "critical" ? "bg-error/10 text-error" : "bg-muted text-muted-foreground"}`}>
                      {fw.status}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 font-body text-[12px] text-muted-foreground">{fw.compatibility.join(", ")}</td>
                  <td className="px-4 py-2.5 font-mono text-[12px] text-foreground">{fw.installCount}</td>
                  <td className="px-4 py-2.5 font-mono text-[11px] text-muted-foreground">{fw.minHardwareRev}</td>
                  <td className="px-4 py-2.5 font-body text-[12px] text-muted-foreground max-w-[280px] truncate">{fw.changelogExcerpt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
