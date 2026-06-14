import "./Spinner.css";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

/**
 * Loading spinner component
 * Provides a rotating circular border animation similar to Bootstrap's spinner
 */
export function Spinner({ size = "md", className = "" }: SpinnerProps) {
  return (
    <div className={`spinner-container ${className}`}>
      <div className={`spinner spinner--${size}`} role="status">
        <span className="spinner__label">Loading...</span>
      </div>
    </div>
  );
}
