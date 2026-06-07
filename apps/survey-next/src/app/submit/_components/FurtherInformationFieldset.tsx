"use client";

import { useFormContext } from "react-hook-form";
import type { Step2FormData } from "../schema";

export function FurtherInformationFieldset() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<Step2FormData>();

  const hours = watch("hours") || [];
  const atLeastOneKeaObserved = hours.some((hour) => hour.kea === true);

  return (
    <fieldset className="mb-3">
      <legend>3. Further Information</legend>

      {hours.length > 0 && atLeastOneKeaObserved && (
        <div className="row">
          <div className="col-md-4">
            <label htmlFor="max_flock_size" className="control-label">
              Max kea seen
            </label>
            <input
              type="number"
              id="max_flock_size"
              className={`form-control ${errors.max_flock_size ? "is-invalid" : ""}`}
              min="0"
              {...register("max_flock_size", { valueAsNumber: true })}
            />
            {errors.max_flock_size && (
              <div className="invalid-feedback">
                {errors.max_flock_size.message}
              </div>
            )}
          </div>
        </div>
      )}

      <label htmlFor="comments" className="control-label">
        Comments
      </label>
      <textarea
        id="comments"
        className="form-control"
        rows={4}
        placeholder="Any comments? (optional)"
        {...register("comments")}
      />
    </fieldset>
  );
}
