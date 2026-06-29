"use client";

import {
  useFormContext,
  useWatch,
  Controller,
  type Control,
} from "react-hook-form";
import type { Step2FormData } from "../schema";
import { GridTileTypeahead } from "../../_components/grid/GridTileTypeahead";

interface FurtherInformationFieldsetProps {
  gridTiles: string[];
}

export function FurtherInformationFieldset({
  gridTiles,
}: FurtherInformationFieldsetProps) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<Step2FormData>();

  // useWatch (not watch) so this component re-renders when a nested kea
  // checkbox toggles — a plain watch() return gets frozen by the React
  // compiler and never updates the conditional below
  const hours = useWatch({ control, name: "hours" }) || [];
  const atLeastOneKeaObserved = hours.some((hour) => hour.kea === true);
  const hasSingleGridTile = gridTiles.length === 1;

  return (
    <fieldset>
      <legend>3. Further Information</legend>

      <div className="form__group">
        {hours.length > 0 && atLeastOneKeaObserved && (
          <>
            <div className="form__row">
              <label htmlFor="max_flock_size" className="form__label">
                Max Kea seen
              </label>
              <input
                type="number"
                id="max_flock_size"
                className={`form__control ${errors.max_flock_size ? "is-invalid" : ""}`}
                {...register("max_flock_size", { valueAsNumber: true })}
              />
              {errors.max_flock_size && (
                <span className="form--note">
                  {errors.max_flock_size.message}
                </span>
              )}
            </div>

            <div className="form__row">
              <label
                htmlFor="max_flock_size_grid_tile"
                className="form__label"
              >
                Max flock size grid tile
              </label>
              {hasSingleGridTile ? (
                <input
                  type="text"
                  id="max_flock_size_grid_tile"
                  className="form__control"
                  value={gridTiles[0]}
                  readOnly
                  tabIndex={-1}
                />
              ) : (
                <Controller
                  control={control as Control<Step2FormData>}
                  name="max_flock_size_grid_tile"
                  render={({ field }) => (
                    <GridTileTypeahead
                      selectedTiles={
                        Array.isArray(field.value) ? field.value : []
                      }
                      onSelectionChange={(tiles) => {
                        field.onChange(tiles.length > 0 ? tiles : null);
                      }}
                      onBlur={field.onBlur}
                      maxTiles={1}
                      placeholder="Grid ID (XXXX-XX)"
                      options={gridTiles}
                    />
                  )}
                />
              )}
            </div>
          </>
        )}
      </div>

      <div className="form__group form__group--one">
        <div className="form__row">
          <label htmlFor="comments" className="form__label">
            Comments
          </label>
          <textarea
            id="comments"
            className="form__control"
            placeholder="Any comments? (optional)"
            {...register("comments")}
          />
        </div>
      </div>
    </fieldset>
  );
}
