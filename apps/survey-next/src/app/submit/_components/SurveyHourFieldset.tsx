"use client";

import { useFormContext, useFieldArray } from "react-hook-form";
import type { Step2FormData } from "../schema";
import { SURVEY_HOURS } from "../constants";

interface SurveyHourFieldsetProps {
  gridTiles: string[];
  fieldOptions?: Record<string, any>;
}

export function SurveyHourFieldset({
  gridTiles,
  fieldOptions,
}: SurveyHourFieldsetProps) {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<Step2FormData>();

  const { fields } = useFieldArray({
    name: "hours",
  });

  const activityChoices = fieldOptions?.activity?.choices || [
    { value: "", display_name: "Select activity..." },
    { value: "X", display_name: "Not surveyed" },
    { value: "S", display_name: "Surveyed" },
  ];

  const winterHours = SURVEY_HOURS.winter;
  const isWinter = (hour: number) => winterHours.includes(hour);
  const hasSingleGridTile = gridTiles.length === 1;

  return (
    <fieldset className="mb-3">
      <legend>2. Survey Hours</legend>

      <div className="table-responsive">
        <table className="table table-striped survey-hours-table">
          <thead>
            <tr>
              <th>Hour</th>
              <th>Activity</th>
              <th>Kea</th>
              <th>Grid tile</th>
            </tr>
          </thead>
          <tbody className="RenderHours">
            {fields.map((field, index) => {
              const activity = watch(`hours.${index}.activity`);
              const isNotSurveying = activity === "X";
              const rowClass = isWinter(field.hour) ? "winter" : "summer";

              return (
                <tr key={field.id} className={rowClass}>
                  <td>
                    <input
                      type="number"
                      className="form-control-plaintext"
                      value={field.hour}
                      readOnly
                      tabIndex={-1}
                    />
                    {!isWinter(field.hour) && <small>summer only</small>}
                  </td>

                  <td>
                    <select
                      className={`custom-select form-control ${errors.hours?.[index]?.activity ? "is-invalid" : ""}`}
                      {...register(`hours.${index}.activity`)}
                    >
                      {activityChoices.map((choice: any) => (
                        <option key={choice.value} value={choice.value}>
                          {choice.display_name}
                        </option>
                      ))}
                    </select>
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
                      <label
                        className="form-check-label sr-only"
                        htmlFor={`hours.${index}.kea`}
                      >
                        Kea
                      </label>
                    </div>
                  </td>

                  <td>
                    {hasSingleGridTile ? (
                      <input
                        type="text"
                        className="form-control-plaintext"
                        value={field.grid_tile || ""}
                        readOnly
                        tabIndex={-1}
                      />
                    ) : isNotSurveying ? (
                      <input
                        type="text"
                        className="form-control"
                        disabled
                        tabIndex={-1}
                      />
                    ) : (
                      <select
                        className={`custom-select form-control ${errors.hours?.[index]?.grid_tile ? "is-invalid" : ""}`}
                        {...register(`hours.${index}.grid_tile`)}
                      >
                        <option value=""></option>
                        {gridTiles.map((tileId) => (
                          <option key={tileId} value={tileId}>
                            {tileId}
                          </option>
                        ))}
                      </select>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {errors.hours && (
        <div className="alert alert-danger">
          {errors.hours.message || "Please check the survey hours for errors"}
        </div>
      )}
    </fieldset>
  );
}
