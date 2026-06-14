"use client";

import {
  useFormContext,
  useFieldArray,
  useFormState,
  Controller,
  type Control,
} from "react-hook-form";
import type { Step2FormData } from "../schema";
import { SURVEY_HOURS } from "../constants";
import { GridTileTypeahead } from "../../_components/grid/GridTileTypeahead";

interface SurveyHourFieldsetProps {
  gridTiles: string[];
  fieldOptions?: Record<string, any>;
}

interface ActivityChoice {
  value: string;
  display_name: string;
}

interface SurveyHourRowProps {
  index: number;
  hour: number;
  isWinter: boolean;
  hasSingleGridTile: boolean;
  gridTiles: string[];
  activityChoices: ActivityChoice[];
}

const winterHoursList = SURVEY_HOURS.winter as readonly number[];

/**
 * A single hour row.
 *
 * Each row owns its own field-scoped useFormState subscription so it
 * re-renders when its own error/touched state changes. A single shared
 * subscription in the parent does not survive the React Compiler's
 * per-row memoization, so the per-field error UI would never update.
 */
function SurveyHourRow({
  index,
  hour,
  isWinter,
  hasSingleGridTile,
  gridTiles,
  activityChoices,
}: SurveyHourRowProps) {
  const { register, watch, control } = useFormContext<Step2FormData>();
  const { errors, touchedFields } = useFormState({
    control,
    name: `hours.${index}`,
  });

  const activity = watch(`hours.${index}.activity`);
  const singleGridTile = watch(`hours.${index}.grid_tile`);
  const isNotSurveying = activity === "X";

  const activityError = errors.hours?.[index]?.activity;
  const activityTouched = touchedFields.hours?.[index]?.activity;
  const showActivityError = activityError && activityTouched;

  const gridTileError = errors.hours?.[index]?.grid_tile;

  return (
    <tr className={isWinter ? "winter" : "summer"}>
      <td>
        <label className="sr-only" htmlFor={`hours.${index}.hour`}>
          Hour
        </label>
        <input
          type="number"
          id={`hours.${index}.hour`}
          className="form__control"
          value={hour}
          readOnly
          tabIndex={-1}
        />
        {!isWinter && <small>summer only</small>}
      </td>

      <td>
        <label className="sr-only" htmlFor={`hours.${index}.activity`}>
          Activity
        </label>
        <select
          id={`hours.${index}.activity`}
          className={`form__control ${showActivityError ? "is-invalid" : ""}`}
          {...register(`hours.${index}.activity`)}
        >
          <option value=""></option>
          {activityChoices.map((choice) => (
            <option key={choice.value} value={choice.value}>
              {choice.display_name}
            </option>
          ))}
        </select>
        {showActivityError && (
          <span className="form--note">{activityError?.message}</span>
        )}
      </td>

      <td>
        <div className="form-check">
          <input
            type="checkbox"
            id={`hours.${index}.kea`}
            className="form-check-input"
            disabled={isNotSurveying}
            {...register(`hours.${index}.kea`)}
          />
          <label className="sr-only" htmlFor={`hours.${index}.kea`}>
            Kea
          </label>
        </div>
      </td>

      <td>
        {hasSingleGridTile ? (
          <div className="form-group">
            <label className="sr-only" htmlFor={`hours.${index}.grid_tile`}>
              Grid Tile
            </label>
            <input
              type="text"
              id={`hours.${index}.grid_tile`}
              className="form__control"
              value={
                Array.isArray(singleGridTile) ? singleGridTile[0] || "" : ""
              }
              readOnly
              tabIndex={-1}
            />
          </div>
        ) : isNotSurveying ? (
          <div className="form-group">
            <label className="sr-only" htmlFor={`hours.${index}.grid_tile`}>
              Grid Tile
            </label>
            <input
              type="text"
              id={`hours.${index}.grid_tile`}
              className="form__control"
              disabled
              tabIndex={-1}
            />
          </div>
        ) : (
          <div className="form-group">
            <label className="sr-only" htmlFor={`hours.${index}.grid_tile`}>
              Grid Tile
            </label>
            <Controller
              control={control as Control<Step2FormData>}
              name={`hours.${index}.grid_tile`}
              render={({ field }) => (
                <GridTileTypeahead
                  selectedTiles={Array.isArray(field.value) ? field.value : []}
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
            {gridTileError && (
              <span className="form--note">{gridTileError.message}</span>
            )}
          </div>
        )}
      </td>
    </tr>
  );
}

export function SurveyHourFieldset({
  gridTiles,
  fieldOptions,
}: SurveyHourFieldsetProps) {
  const { control } = useFormContext<Step2FormData>();

  const { fields } = useFieldArray<Step2FormData, "hours">({
    control,
    name: "hours",
  });

  const activityChoices: ActivityChoice[] =
    fieldOptions?.activity?.choices || [];
  const hasSingleGridTile = gridTiles.length === 1;

  return (
    <fieldset>
      <legend>2. Hours</legend>

      <div className="form__hours">
        {hasSingleGridTile && (
          <div className="alert alert-info">
            Only one grid tile has been selected, so this has been added to
            every hour.
          </div>
        )}

        <table className="table table-bordered">
          <thead>
            <tr>
              <th style={{ width: "10%" }}>Hour</th>
              <th>Activity</th>
              <th>Kea?</th>
              <th>Grid Tile</th>
            </tr>
          </thead>
          <tbody>
            {fields.map((field, index) => (
              <SurveyHourRow
                key={field.id}
                index={index}
                hour={field.hour}
                isWinter={winterHoursList.includes(field.hour)}
                hasSingleGridTile={hasSingleGridTile}
                gridTiles={gridTiles}
                activityChoices={activityChoices}
              />
            ))}
          </tbody>
        </table>
      </div>
    </fieldset>
  );
}
