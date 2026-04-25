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
          className="inline-flex items-center gap-1.5 font-body text-[13px] text-sand-9 dark:text-dark-9 hover:text-sand-12 dark:hover:text-dark-12 transition-colors w-fit"
        >
          <ArrowLeft size={14} />
          Back to Stations
        </Link>
        <div className="flex items-center justify-center rounded-card border border-sand-6 dark:border-dark-6 bg-sand-1 dark:bg-dark-2 p-12">
          <p className="font-body text-body text-sand-9 dark:text-dark-9">
            Station{" "}
            <span className="font-mono text-sand-12 dark:text-dark-12">
              {stationId}
            </span>{" "}
            not found.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2">
        <Link
          to="/stations"
          className="inline-flex items-center gap-1.5 font-body text-[13px] text-sand-9 dark:text-dark-9 hover:text-sand-12 dark:hover:text-dark-12 transition-colors"
        >
          <ArrowLeft size={14} />
          Stations
        </Link>
        <span className="font-mono text-[10px] text-sand-8 dark:text-dark-8">/</span>
        <span className="font-mono text-[11px] text-sand-11 dark:text-dark-11">
          {station.id}
        </span>
      </div>

      {/* Detail panel — wider layout */}
      <div className="max-w-lg">
        <StationDetailPanel station={station} />
      </div>
    </div>
  );
}
