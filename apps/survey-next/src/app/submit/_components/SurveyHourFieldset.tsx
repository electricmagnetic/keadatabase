"use client";

import {
  useFormContext,
  useFieldArray,
  useFormState,
  useWatch,
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
  const { register, control, setValue } = useFormContext<Step2FormData>();
  const { errors, touchedFields } = useFormState({
    control,
    name: `hours.${index}`,
  });

  const activity = useWatch({ control, name: `hours.${index}.activity` });
  const kea = useWatch({ control, name: `hours.${index}.kea` });
  const singleGridTile = useWatch({
    control,
    name: `hours.${index}.grid_tile`,
  });
  const isNotSurveying = activity === "X";

  // a disabled checkbox keeps its last value, so force kea false when not surveying
  if (isNotSurveying) setValue(`hours.${index}.kea`, false);
  // likewise a disabled max-seen keeps its last value, so clear it when kea is unticked
  if (!kea) setValue(`hours.${index}.max_seen`, null);

  const activityError = errors.hours?.[index]?.activity;
  const activityTouched = touchedFields.hours?.[index]?.activity;
  const showActivityError = activityError && activityTouched;

  const maxSeenError = errors.hours?.[index]?.max_seen;

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
            {...register(`hours.${index}.kea`)}
            disabled={isNotSurveying}
          />
          <label className="sr-only" htmlFor={`hours.${index}.kea`}>
            Kea
          </label>
        </div>
      </td>

      <td>
        <label className="sr-only" htmlFor={`hours.${index}.max_seen`}>
          Max Seen
        </label>
        <input
          type="number"
          min={1}
          id={`hours.${index}.max_seen`}
          className={`form__control submit__max-seen ${maxSeenError ? "is-invalid" : ""}`}
          disabled={!kea}
          {...register(`hours.${index}.max_seen`, {
            // number input yields strings; empty means "not filled in", not 0
            setValueAs: (value) =>
              value === "" || value === null ? null : Number(value),
          })}
        />
        {maxSeenError && (
          <span className="form--note">{maxSeenError.message}</span>
        )}
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
              <th>Max Seen</th>
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
