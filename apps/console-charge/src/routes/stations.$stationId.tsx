/**
 * CON.3 — Station Detail (full-page view)
 * Route: /stations/:stationId
 *
 * Renders a full-page detail view for a single station.
 * The same StationDetailPanel used in the list side panel is re-used here
 * at a wider layout with additional breadcrumb navigation back to /stations.
 */

import { useParams, Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import { getStation } from "~/mocks/stations";
import { StationDetailPanel } from "~/components/StationDetailPanel";

export default function StationDetail() {
  const { stationId } = useParams<{ stationId: string }>();
  const station = stationId ? getStation(stationId) : undefined;

  if (!station) {
    return (
      <div className="flex flex-col gap-4">
        <Link
          to="/stations"
          className="inline-flex items-center gap-1.5 font-body text-[13px] text-muted-foreground hover:text-foreground transition-colors w-fit"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          Back to Stations
        </Link>
        <div
          role="alert"
          className="flex items-center justify-center rounded-card border border-border bg-card p-12"
        >
          <p className="font-body text-body text-muted-foreground">
            Station{" "}
            <span className="font-mono text-foreground">{stationId}</span>{" "}
            not found.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2">
        <Link
          to="/stations"
          className="inline-flex items-center gap-1.5 font-body text-[13px] text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          Stations
        </Link>
        <span aria-hidden="true" className="font-mono text-[10px] text-muted-foreground">
          /
        </span>
        <span className="font-mono text-[11px] text-foreground">
          {station.id}
        </span>
      </nav>

      {/* Detail panel — wider layout */}
      <div className="w-full max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl">
        <StationDetailPanel station={station} />
      </div>
    </div>
  );
}
