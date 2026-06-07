"use client";

import { useFormContext } from "react-hook-form";
import type { Step1FormData } from "../schema";

export function ObserverFieldset() {
  const {
    register,
    formState: { errors, touchedFields },
  } = useFormContext<Step1FormData>();

  const nameError = errors.observer?.name;
  const emailError = errors.observer?.email;
  const nameTouched = touchedFields.observer?.name;
  const emailTouched = touchedFields.observer?.email;

  return (
    <fieldset>
      <legend>1. Observer Details</legend>

      <div className="form__group">
        <div className="form__row">
          <label htmlFor="observer.name" className="form__label">
            Name
          </label>
          <input
            type="text"
            id="observer.name"
            className={`form__control ${nameError && nameTouched ? "is-invalid" : ""}`}
            placeholder="Name"
            autoFocus
            {...register("observer.name")}
          />
          <small>Your name will be publicly visible</small>
          {nameError && nameTouched && (
            <div className="form--note">{nameError.message}</div>
          )}
        </div>

        <div className="form__row">
          <label htmlFor="observer.email" className="form__label">
            Email
          </label>
          <input
            type="text"
            id="observer.email"
            className={`form__control ${emailError && emailTouched ? "is-invalid" : ""}`}
            placeholder="Email"
            {...register("observer.email")}
          />
          <small>Your email is only visible to the project team</small>
          {emailError && emailTouched && (
            <div className="form--note">{emailError.message}</div>
          )}
        </div>
      </div>
    </fieldset>
  );
}
