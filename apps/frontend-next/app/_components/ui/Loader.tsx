import classNames from "classnames";

export default function Loader({ className }: { className?: string }) {
  return (
    <div
      className={classNames(
        "spinner-border",
        "m-1",
        className || "text-primary",
      )}
      role="status"
    >
      <span className="visually-hidden">Loading</span>
    </div>
  );
}

export function TextBlockPlaceholder() {
  return (
    <div>
      <span className="visually-hidden">Loading</span>
      <h2 className="placeholder-glow">
        <span className="placeholder col-6" />
      </h2>
      <p className="placeholder-glow">
        <span className="placeholder col-12" />
        <span className="placeholder col-12" />
        <span className="placeholder col-12" />
      </p>
    </div>
  );
}
