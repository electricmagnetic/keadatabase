"use client";

import { useFormContext, useWatch } from "react-hook-form";
import GridTileCards from "../../_components/grid/GridTileCards";
import type { Step1FormData } from "../schema";

export function SelectedGridTiles() {
  const { control } = useFormContext<Step1FormData>();
  const gridTiles = useWatch({ control, name: "gridTiles" }) || [];

  if (gridTiles.length === 0) {
    return <div className="no-results">No grid tile(s) selected</div>;
  }

  return <GridTileCards gridTileIds={gridTiles} />;
}
