"use client";

import { useFormContext } from "react-hook-form";
import { GridTileCard } from "../../_components/grid/GridTileCard";
import type { Step1FormData } from "../schema";

export function SelectedGridTiles() {
  const { watch } = useFormContext<Step1FormData>();
  const gridTiles = watch("gridTiles") || [];

  if (gridTiles.length === 0) {
    return <div>No grid tile(s) selected</div>;
  }

  return (
    <div className="card bg-faded mx-3 mb-3">
      <div className="card-body my-n3">
        <div className="row">
          {gridTiles.map((tileId) => (
            <div key={tileId} className="col-6 col-xl-4">
              <GridTileCard id={tileId} hideDetails hideImage={false} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
