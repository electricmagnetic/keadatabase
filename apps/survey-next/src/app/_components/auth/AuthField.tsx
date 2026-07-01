"use client";

import { useState } from "react";
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
  const [show, setShow] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="form__row">
      <label htmlFor={id} className="form__label">
        {label}
      </label>
      <div className={isPassword ? "form__password" : undefined}>
        <input
          type={isPassword && show ? "text" : type}
          id={id}
          className={`form__control ${error ? "is-invalid" : ""}`}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          {...register}
        />
        {isPassword && (
          <button
            type="button"
            className="form__password-toggle"
            onClick={() => setShow((s) => !s)}
            aria-label={show ? "Hide password" : "Show password"}
            aria-pressed={show}
          >
            <i className={show ? "fas fa-eye-slash" : "fas fa-eye"} aria-hidden="true" />
          </button>
        )}
      </div>
      {error && <div className="form--note">{error.message}</div>}
    </div>
  );
}
