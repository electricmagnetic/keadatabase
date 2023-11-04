"use client";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // eslint-disable-next-line -- allow console error for debugging
    console.error(error);
  }, [error]);

  return (
    <div className="alert alert-danger" role="alert">
      <h2 className="alert-heading">Error</h2>
      {error.message ? (
        <>
          <p>The following error has occurred:</p>
          <p className="font-monospace">{error.message}</p>
        </>
      ) : null}
      <button
        className="btn btn-danger"
        onClick={() => {
          reset();
        }}
        type="button"
      >
        Try again
      </button>
    </div>
  );
}
