import { HoursPerQuarterGraph } from "./HoursPerQuarterGraph";

interface GridTileAnalysisData {
  hours_total: {
    with_kea: number;
    total: number;
  };
  hours_per_quarter: Array<{
    quarter: string;
    with_kea: number;
    total: number;
  }>;
}

interface GridTileAnalysisItemProps {
  gridTileAnalysis: GridTileAnalysisData;
}

/**
 * Calculate encounter rate percentage
 */
function calculateEncounterRate(
  gridTileAnalysis: GridTileAnalysisData,
): string {
  const { with_kea, total } = gridTileAnalysis.hours_total;
  if (total === 0) return "0";
  return ((with_kea / total) * 100).toFixed(1);
}

/**
 * Display analyses as an item
 */
export function GridTileAnalysisItem({
  gridTileAnalysis,
}: GridTileAnalysisItemProps) {
  return (
    <div className="grid-analysis">
      <div className="grid-attributes">
        <dl>
          <dt>Hours with kea</dt>
          <dd>{gridTileAnalysis.hours_total.with_kea}</dd>
          <dt>Total hours</dt>
          <dd>{gridTileAnalysis.hours_total.total}</dd>
          <dt>Encounter rate</dt>
          <dd>{calculateEncounterRate(gridTileAnalysis)}%</dd>
        </dl>
      </div>
      <div className="grid-analysis__graph">
        <p>
          <strong>Quarterly breakdown</strong>
        </p>
        <HoursPerQuarterGraph gridTileAnalysis={gridTileAnalysis} />
      </div>
    </div>
  );
}
