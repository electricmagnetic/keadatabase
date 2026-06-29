"use client";

interface AuthSubmitButtonProps {
  /** Label while the form is submitting, e.g. "Saving…". */
  pendingLabel: string;
  /** Label at rest, e.g. "Save". */
  children: string;
  isSubmitting: boolean;
}

/** The primary submit button shared by the auth forms. */
export function AuthSubmitButton({
  pendingLabel,
  children,
  isSubmitting,
}: AuthSubmitButtonProps) {
  return (
    <button type="submit" className="btn btn--primary" disabled={isSubmitting}>
      {isSubmitting ? pendingLabel : children}
    </button>
  );
}
