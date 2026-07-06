"use client";

import { useFormContext } from "react-hook-form";
import type { Step2FormData } from "../schema";

export function FurtherInformationFieldset() {
  const { register } = useFormContext<Step2FormData>();

  return (
    <fieldset>
      <legend>3. Further Information</legend>

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
