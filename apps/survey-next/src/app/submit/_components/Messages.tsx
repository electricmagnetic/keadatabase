"use client";

import { useFormContext } from "react-hook-form";
import { useEffect } from "react";

export function Messages() {
  const {
    formState: { errors, isValid, submitCount },
  } = useFormContext();

  const hasErrors = submitCount > 0 && !isValid && Object.keys(errors).length > 0;

  useEffect(() => {
    if (hasErrors) {
      window.scrollTo(0, 0);
    }
  }, [hasErrors]);

  if (!hasErrors) {
    return null;
  }

  return (
    <div className="messages">
      <div className="alert alert-danger" role="alert">
        <h4 className="alert-heading">
          <i className="fas fa-exclamation-triangle me-2"></i>
          Invalid data
        </h4>
        <p className="m-0">
          Invalid data provided. Please double-check the form for errors.
        </p>
      </div>
    </div>
  );
}
