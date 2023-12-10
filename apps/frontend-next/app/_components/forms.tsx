import classNames from "classnames";
import { cloneElement } from "react";
import { type FieldError } from "react-hook-form";

function ErrorMessage({ message }: { message?: string }) {
  return message ? <span className="invalid-feedback">{message}</span> : null;
}

export function Field({
  error,
  field,
  id,
  label,
}: {
  error?: FieldError;
  field: React.ReactElement;
  id: string;
  label: string;
}) {
  return (
    <div className="mb-3">
      <label className="form-label" htmlFor={id}>
        {label}
      </label>
      {cloneElement(field, {
        id,
        className: classNames("form-control", error && "is-invalid"),
      })}
      <ErrorMessage message={error?.message} />
    </div>
  );
}

export function SubmitButton() {
  return (
    <button className="btn btn-primary text-white" type="submit">
      Submit
    </button>
  );
}
