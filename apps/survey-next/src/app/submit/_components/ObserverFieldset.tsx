"use client";

import { useFormContext } from "react-hook-form";
import type { Step1FormData } from "../schema";

interface ObserverFieldsetProps {
  /** When true, the email is pre-filled from the logged-in user and locked. */
  emailReadOnly?: boolean;
  /**
   * When true, the name is pre-filled from the user's profile and locked.
   * Separate from emailReadOnly so accounts without a saved name (pre-dating
   * the first/last name fields) can still type one.
   */
  nameReadOnly?: boolean;
}

export function ObserverFieldset({
  emailReadOnly = false,
  nameReadOnly = false,
}: ObserverFieldsetProps) {
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
            readOnly={nameReadOnly}
            {...register("observer.name")}
          />
          <small>
            {nameReadOnly
              ? "Taken from your account and publicly visible"
              : "Your name will be publicly visible"}
          </small>
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
            readOnly={emailReadOnly}
            {...register("observer.email")}
          />
          <small>
            {emailReadOnly
              ? "Taken from your account"
              : "Your email is only visible to the project team"}
          </small>
          {emailError && emailTouched && (
            <div className="form--note">{emailError.message}</div>
          )}
        </div>
      </div>
    </fieldset>
  );
}
