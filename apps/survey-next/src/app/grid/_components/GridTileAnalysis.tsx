"use client";

import useSWR from "swr";
import { getApiUrl } from "@/app/_components/api/url";
import type { GridTileId } from "@/app/_components/grid/types";
import { GridTileAnalysisItem } from "./GridTileAnalysisItem";
import { Spinner } from "@/app/_components/ui/Spinner";

interface GridTileAnalysisProps {
  id: GridTileId;
}

/**
 * Obtain analyses for a given grid tile ID via API
 */
export function GridTileAnalysis({ id }: GridTileAnalysisProps) {
  const url = getApiUrl(`/analysis/grid_tiles/${id}/`);
  const { data, error, isLoading } = useSWR(url);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    if (error.status === 404) {
      return <>No analysis found</>;
    }
    return <>Error fetching grid tile analysis</>;
  }

  if (!data) {
    return null;
  }

  return <GridTileAnalysisItem gridTileAnalysis={data} />;
}
