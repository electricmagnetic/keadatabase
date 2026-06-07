"use client";

import { useFormContext } from "react-hook-form";

export function Messages() {
  const {
    formState: { errors },
  } = useFormContext();

  const hasErrors = Object.keys(errors).length > 0;

  if (!hasErrors) {
    return null;
  }

  return (
    <div className="alert alert-danger" role="alert">
      <h4 className="alert-heading">
        <i className="fas fa-exclamation-triangle me-2"></i>
        Please correct the following errors:
      </h4>
      <ul className="mb-0">
        {Object.entries(errors).map(([field, error]) => {
          if (error && typeof error === "object" && "message" in error) {
            return (
              <li key={field}>
                <strong>{field}:</strong> {error.message as string}
              </li>
            );
          }
          return null;
        })}
      </ul>
    </div>
  );
}
