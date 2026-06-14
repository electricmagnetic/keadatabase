"use client";

import dynamic from "next/dynamic";
import type { GridTileAnalysis } from "./schema";

// dynamically import map component with SSR disabled to avoid MapLibre errors
const GridTileAnalysesMap = dynamic(
  () => import("./GridTileAnalysesMap").then((mod) => mod.GridTileAnalysesMap),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          height: "600px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f8f9fa",
        }}
      >
        <div>Loading map...</div>
      </div>
    ),
  },
);

interface AnalysisMapClientProps {
  analyses: GridTileAnalysis[];
}

/**
 * Client-side wrapper for GridTileAnalysesMap
 * Uses dynamic import with ssr: false to prevent MapLibre SSR issues
 */
export function AnalysisMapClient({ analyses }: AnalysisMapClientProps) {
  return <GridTileAnalysesMap analyses={analyses} />;
}
