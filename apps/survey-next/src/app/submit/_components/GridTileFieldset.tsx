"use client";

import { useFormContext, useWatch } from "react-hook-form";
import { GridTileTypeahead } from "../../_components/grid/GridTileTypeahead";
import type { Step1FormData } from "../schema";
import { MAX_GRID_TILES } from "../constants";

export function GridTileFieldset() {
  const {
    control,
    setValue,
    formState: { errors, touchedFields },
  } = useFormContext<Step1FormData>();

  const gridTiles = useWatch({ control, name: "gridTiles" }) || [];

  const handleSelectionChange = (tiles: string[]) => {
    setValue("gridTiles", tiles, { shouldValidate: true, shouldTouch: true });
  };

  return (
    <fieldset>
      <legend>Trip Details</legend>

      <div className="form__row">
        <label htmlFor="gridTileSearch" className="form__label">
          Surveyed grid tiles
        </label>
        <GridTileTypeahead
          selectedTiles={gridTiles}
          onSelectionChange={handleSelectionChange}
          maxTiles={MAX_GRID_TILES}
          placeholder="Grid ID (XXXX-XX)"
        />
        <small>
          Please select all surveyed grid tiles from the duration of your trip
        </small>
        {errors.gridTiles && touchedFields.gridTiles && (
          <div className="form--note">{errors.gridTiles.message}</div>
        )}
      </div>

      <p>
        <em>You can select grid tiles on the map below.</em>
      </p>
    </fieldset>
  );
}
