"use client";

import { useMemo } from "react";
import { useFormContext } from "react-hook-form";
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
  const {
    register,
    formState: { errors },
  } = useFormContext<Step2FormData>();

  const todayString = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today.toISOString().split("T")[0];
  }, []);

  const purposeChoices = fieldOptions?.purpose?.choices || [];

  return (
    <fieldset className="mb-3">
      <legend>1. Trip Details</legend>

      <div className="row">
        <div className="col-md-4">
          <label htmlFor="observer.name" className="control-label">
            Name
          </label>
          <input
            type="text"
            id="observer.name"
            className="form-control-plaintext"
            value={observerName}
            readOnly
            tabIndex={-1}
          />
        </div>

        <div className="col-md-5">
          <label htmlFor="observer.email" className="control-label">
            Email
          </label>
          <input
            type="email"
            id="observer.email"
            className="form-control-plaintext"
            value={observerEmail}
            readOnly
            tabIndex={-1}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-4">
          <label htmlFor="date" className="control-label">
            Date
          </label>
          <input
            type="date"
            id="date"
            className={`form-control ${errors.date ? "is-invalid" : ""}`}
            max={todayString}
            placeholder="YYYY-MM-DD"
            autoFocus
            {...register("date")}
          />
          <small className="form-text text-muted">
            If a multi-day journey, start with earliest date
          </small>
          {errors.date && (
            <div className="invalid-feedback">{errors.date.message}</div>
          )}
        </div>

        <div className="col-md-5">
          <label htmlFor="purpose" className="control-label">
            Purpose
          </label>
          {purposeChoices.length > 0 ? (
            <select
              id="purpose"
              className="custom-select form-control"
              {...register("purpose")}
            >
              <option value=""></option>
              {purposeChoices.map((choice: any) => (
                <option key={choice.value} value={choice.value}>
                  {choice.display_name}
                </option>
              ))}
            </select>
          ) : (
            <input
              type="text"
              id="purpose"
              className="form-control"
              {...register("purpose")}
            />
          )}
          <small className="form-text text-muted">Optional</small>
        </div>
      </div>

      <label className="control-label" htmlFor="selectedGridTiles">
        Where
      </label>
      <div id="selectedGridTiles">
        <SelectedGridTilesMap gridTileIds={gridTiles} />
      </div>
    </fieldset>
  );
}
