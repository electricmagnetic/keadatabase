import { z } from "zod";

/**
 * Schema for hours total in grid tile analysis
 */
export const HoursTotalSchema = z.object({
  total: z.number(),
  with_kea: z.number(),
});

/**
 * Schema for a single grid tile analysis
 *
 * Contains aggregated survey data for a specific grid tile
 */
export const GridTileAnalysisSchema = z.object({
  id: z.string(), // grid tile ID (e.g., "BV22NE")
  hours_total: HoursTotalSchema,
});

/**
 * Schema for array of grid tile analyses (API response)
 */
export const GridTileAnalysesSchema = z.array(GridTileAnalysisSchema);

/**
 * TypeScript types derived from schemas
 */
export type HoursTotal = z.infer<typeof HoursTotalSchema>;
export type GridTileAnalysis = z.infer<typeof GridTileAnalysisSchema>;
export type GridTileAnalyses = z.infer<typeof GridTileAnalysesSchema>;
