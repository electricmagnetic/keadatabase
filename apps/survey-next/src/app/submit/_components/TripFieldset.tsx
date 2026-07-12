"use client";

import { useMemo } from "react";
import { useFormContext, useFormState } from "react-hook-form";
import { SelectedGridTilesMap } from "../../_components/grid/SelectedGridTilesMap";
import type { Step2FormData } from "../schema";
import { getLocalDateString } from "../utils";

interface TripFieldsetProps {
  /** When true, the name came from the user's profile and is locked. */
  nameLocked: boolean;
  gridTiles: string[];
  fieldOptions?: Record<string, any>;
}

export function TripFieldset({
  nameLocked,
  gridTiles,
  fieldOptions,
}: TripFieldsetProps) {
  const { register, control } = useFormContext<Step2FormData>();

  // subscribe to field state via useFormState so this child re-renders when
  // error/touched state changes (React Compiler safe)
  const { errors, touchedFields } = useFormState({
    control,
    name: ["date", "observer.name"],
  });

  const dateError = errors.date;
  const dateTouched = touchedFields.date;
  const nameError = errors.observer?.name;
  const nameTouched = touchedFields.observer?.name;

  const todayString = useMemo(() => getLocalDateString(), []);

  const purposeChoices = fieldOptions?.purpose?.choices || [];

  return (
    <fieldset>
      <legend>1. Trip Details</legend>

      <div className="form__group">
        <div className="form__row">
          {/* no asterisk once the profile supplies the name — it's read-only then */}
          <label
            htmlFor="observer.name"
            className={`form__label ${nameLocked ? "" : "form__label--required"}`}
          >
            Name
          </label>
          <input
            type="text"
            id="observer.name"
            className={`form__control ${nameError && nameTouched ? "is-invalid" : ""}`}
            readOnly={nameLocked}
            tabIndex={nameLocked ? -1 : undefined}
            {...register("observer.name")}
          />
          <small>
            {nameLocked
              ? "Taken from your account and publicly visible"
              : "Your name will be publicly visible"}
          </small>
          {nameError && nameTouched && (
            <span className="form--note">{nameError.message}</span>
          )}
        </div>

        <div className="form__row">
          <label htmlFor="observer.email" className="form__label">
            Email
          </label>
          <input
            type="email"
            id="observer.email"
            className="form__control"
            readOnly
            tabIndex={-1}
            {...register("observer.email")}
          />
          <small>Taken from your account</small>
        </div>
      </div>

      <div className="form__group">
        <div className="form__row">
          <label htmlFor="date" className="form__label form__label--required">
            Date
          </label>
          <input
            type="date"
            id="date"
            className={`form__control ${dateError && dateTouched ? "is-invalid" : ""}`}
            max={todayString}
            placeholder="YYYY-MM-DD"
            autoFocus
            {...register("date")}
          />
          <small className="form--text">
            If a multi-day journey, start with earliest date
          </small>
          {dateError && dateTouched && (
            <span className="form--note">{dateError.message}</span>
          )}
        </div>

        <div className="form__row">
          <label htmlFor="purpose" className="form__label">
            Purpose
          </label>
          <select
            id="purpose"
            className="form__control"
            {...register("purpose")}
          >
            {purposeChoices.map((choice: any) => (
              <option key={choice.value} value={choice.value}>
                {choice.display_name}
              </option>
            ))}
          </select>
          <small className="form--text">Optional</small>
        </div>
      </div>

      <div className="form__group form__group--one">
        <div className="form__row">
          <label className="form__label" htmlFor="selectedGridTiles">
            Where
          </label>
          <div id="selectedGridTiles">
            <SelectedGridTilesMap gridTileIds={gridTiles} />
          </div>
        </div>
      </div>
    </fieldset>
  );
}
