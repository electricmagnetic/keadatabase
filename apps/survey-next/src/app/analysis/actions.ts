"use server";

import fetcher from "shared/api/fetcher";
import { GridTileAnalysesSchema } from "./schema";
import { getApiUrl } from "@/app/_components/api/url";

/**
 * Fetch grid tile analyses from the API
 *
 * @param queryString - Optional query string for filtering (e.g., "?date_from=2024-01-01")
 * @returns Grid tile analyses data or error
 */
export const getGridTileAnalyses = async (queryString = "") => {
  const url = getApiUrl(`/analysis/grid_tiles/${queryString}`);

  return await fetcher(url, GridTileAnalysesSchema);
};
