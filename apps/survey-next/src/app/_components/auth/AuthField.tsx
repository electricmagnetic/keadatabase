"use client";

import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface AuthFieldProps {
  id: string;
  label: string;
  type?: string;
  autoComplete?: string;
  autoFocus?: boolean;
  register: UseFormRegisterReturn;
  error?: FieldError;
}

/** A single labelled input + inline error, matching the survey form markup. */
export function AuthField({
  id,
  label,
  type = "text",
  autoComplete,
  autoFocus,
  register,
  error,
}: AuthFieldProps) {
  return (
    <div className="form__row">
      <label htmlFor={id} className="form__label">
        {label}
      </label>
      <input
        type={type}
        id={id}
        className={`form__control ${error ? "is-invalid" : ""}`}
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        {...register}
      />
      {error && <div className="form--note">{error.message}</div>}
    </div>
  );
}
