"use client";

import { useMemo } from "react";
import { useFormContext, useFormState } from "react-hook-form";
import { SelectedGridTilesMap } from "../../_components/grid/SelectedGridTilesMap";
import type { Step2FormData } from "../schema";

interface TripFieldsetProps {
  observerName: string;
  observerEmail: string;
  gridTiles: string[];
  fieldOptions?: Record<string, any>;
}

export function TripFieldset({
  observerName,
  observerEmail,
  gridTiles,
  fieldOptions,
}: TripFieldsetProps) {
  const { register, control } = useFormContext<Step2FormData>();

  // subscribe to the date field's state via useFormState so this child
  // re-renders when its error/touched state changes (React Compiler safe)
  const { errors, touchedFields } = useFormState({ control, name: "date" });

  const dateError = errors.date;
  const dateTouched = touchedFields.date;

  const todayString = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today.toISOString().split("T")[0];
  }, []);

  const purposeChoices = fieldOptions?.purpose?.choices || [];

  return (
    <fieldset>
      <legend>1. Trip Details</legend>

      <div className="form__group">
        <div className="form__row">
          <label htmlFor="observer.name" className="form__label">
            Name
          </label>
          <input
            type="text"
            id="observer.name"
            className="form__control"
            value={observerName}
            readOnly
            tabIndex={-1}
          />
        </div>

        <div className="form__row">
          <label htmlFor="observer.email" className="form__label">
            Email
          </label>
          <input
            type="email"
            id="observer.email"
            className="form__control"
            value={observerEmail}
            readOnly
            tabIndex={-1}
          />
        </div>
      </div>

      <div className="form__group">
        <div className="form__row">
          <label htmlFor="date" className="form__label">
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
