"use client";

import { useFormContext, useWatch } from "react-hook-form";
import type { Step2FormData } from "../schema";

export function FurtherInformationFieldset() {
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

  return (
    <fieldset>
      <legend>3. Further Information</legend>

      <div className="form__group">
        {hours.length > 0 && atLeastOneKeaObserved && (
          <div className="form__row">
            <label htmlFor="max_flock_size" className="form__label">
              Max kea seen
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
