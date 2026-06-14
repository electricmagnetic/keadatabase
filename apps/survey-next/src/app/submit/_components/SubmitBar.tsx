"use client";

import { useFormState } from "react-hook-form";
import { Spinner } from "@/app/_components/ui/Spinner";

interface SubmitBarProps {
  /** Text shown on the submit button (e.g. "Next", "Submit") */
  buttonText: string;
}

/**
 * Fixed bottom submission bar shared across the survey submit steps.
 *
 * Reads form state from context, so it must be rendered inside a
 * FormProvider. Disables the button while the form is invalid or
 * submitting, and shows a loading spinner during submission.
 */
export function SubmitBar({ buttonText }: SubmitBarProps) {
  const { isValid, isSubmitting } = useFormState();

  return (
    <div className="submit__bar">
      <div className="holder holder--sm">
        <div>
          {!isValid && (
            <small>Form can be submitted once data entered.</small>
          )}
          {isSubmitting && <Spinner size="sm" />}
        </div>
        <div>
          <button
            type="submit"
            className="btn btn--primary"
            disabled={!isValid || isSubmitting}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}
