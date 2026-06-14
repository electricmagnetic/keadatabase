import type { GridTileAnalysis } from "./schema";

/**
 * Kea orange color for tiles with kea observations
 */
const KEA_ORANGE = "#df5206";

/**
 * Grey color for tiles without kea observations
 */
const NO_KEA_GREY = "#111111";

/**
 * Calculate the fill color for an analysis tile
 *
 * - Orange if kea observed
 * - Grey if no kea observed
 *
 * @param analysis - Grid tile analysis data
 * @returns Hex color string
 */
export function calculateTileColor(analysis: GridTileAnalysis): string {
  const hasKea = analysis.hours_total.with_kea > 0;
  return hasKea ? KEA_ORANGE : NO_KEA_GREY;
}

/**
 * Calculate the fill opacity for an analysis tile
 *
 * For tiles with kea:
 * - Base opacity: 0.3
 * - Additional opacity based on kea/total ratio (up to 0.4 more)
 * - Formula: 0.3 + (with_kea / total) * 0.4
 * - Range: 0.3 to 0.7
 *
 * For tiles without kea:
 * - 0.7 if more than 10 hours surveyed (darker grey)
 * - 0.3 if 10 or fewer hours surveyed (lighter grey)
 *
 * @param analysis - Grid tile analysis data
 * @returns Opacity value between 0 and 1
 */
export function calculateFillOpacity(analysis: GridTileAnalysis): number {
  const hasKea = analysis.hours_total.with_kea > 0;
  const manyHours = analysis.hours_total.total > 10;

  if (hasKea) {
    // orange tiles: opacity increases with kea/hours ratio
    const ratio = analysis.hours_total.with_kea / analysis.hours_total.total;
    return 0.3 + ratio * 0.4;
  } else {
    // grey tiles: darker if many hours surveyed
    return manyHours ? 0.7 : 0.3;
  }
}

/**
 * Get complete style properties for an analysis tile
 *
 * @param analysis - Grid tile analysis data
 * @returns Style object with color, opacity, etc.
 */
export function getAnalysisTileStyle(analysis: GridTileAnalysis) {
  return {
    fillColor: calculateTileColor(analysis),
    fillOpacity: calculateFillOpacity(analysis),
    lineColor: calculateTileColor(analysis),
    lineWidth: 1,
    lineOpacity: 0.6,
  };
}
