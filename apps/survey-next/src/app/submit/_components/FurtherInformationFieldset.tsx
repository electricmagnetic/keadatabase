"use client";

import { useEffect } from "react";
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
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext<Step2FormData>();

  // useWatch (not watch) so this component re-renders when a nested kea
  // checkbox toggles — a plain watch() return gets frozen by the React
  // compiler and never updates the conditional below
  const hours = useWatch({ control, name: "hours" }) || [];
  const atLeastOneKeaObserved = hours.some((hour) => hour.kea === true);

  // show the "required" hint live when kea is observed but no count is entered.
  // the schema's superRefine still blocks submit; this just surfaces it on toggle
  // (a top-level refine error doesn't render via field-level revalidation)
  const maxFlockSize = useWatch({ control, name: "max_flock_size" });
  const maxFlockMissing =
    atLeastOneKeaObserved &&
    (maxFlockSize === null ||
      maxFlockSize === undefined ||
      Number.isNaN(maxFlockSize) ||
      maxFlockSize < 1);

  // only tiles where kea were actually observed are valid for "max flock size
  // grid tile" — collect every tile from kea-positive hours
  const keaTiles = gridTiles.filter((tile) =>
    hours.some((hour) => hour.kea === true && hour.grid_tile?.includes(tile)),
  );
  const hasSingleKeaTile = keaTiles.length === 1;

  // drop a previously-chosen max-flock tile if kea is no longer recorded there.
  // key the effect on a stable string so the fresh keaTiles array each render
  // doesn't re-fire it
  const keaTilesKey = keaTiles.join(",");
  useEffect(() => {
    const allowed = keaTilesKey ? keaTilesKey.split(",") : [];
    const selected = getValues("max_flock_size_grid_tile");

    // with exactly one kea tile the field is a readonly display — set its value
    // so it submits
    if (allowed.length === 1) {
      if (!Array.isArray(selected) || selected[0] !== allowed[0]) {
        setValue("max_flock_size_grid_tile", [allowed[0]]);
      }
      return;
    }

    // otherwise drop any selection that's no longer a kea tile
    if (
      Array.isArray(selected) &&
      selected.some((tile) => !allowed.includes(tile))
    ) {
      const kept = selected.filter((tile) => allowed.includes(tile));
      setValue("max_flock_size_grid_tile", kept.length > 0 ? kept : null);
    }
  }, [keaTilesKey, getValues, setValue]);

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
                min={1}
                id="max_flock_size"
                className={`form__control ${errors.max_flock_size || maxFlockMissing ? "is-invalid" : ""}`}
                {...register("max_flock_size", { valueAsNumber: true })}
              />
              {(errors.max_flock_size || maxFlockMissing) && (
                <span className="form--note">
                  {errors.max_flock_size?.message ?? "Enter how many kea you saw."}
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
              {hasSingleKeaTile ? (
                <input
                  type="text"
                  id="max_flock_size_grid_tile"
                  className="form__control"
                  value={keaTiles[0]}
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
                      options={keaTiles}
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
