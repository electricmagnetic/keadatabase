import classNames from "classnames";

export default function Loader({ isButton = false }: { isButton?: boolean }) {
  return (
    <div
      className={classNames(
        "spinner-border",
        isButton ? "spinner-border-sm" : "text-primary m-1",
      )}
      role="status"
    >
      <span className="visually-hidden">Loading...</span>
    </div>
  );
}
