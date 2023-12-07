import classNames from "classnames";

export default function Loader({ small = false }: { small?: boolean }) {
  return (
    <div
      className={classNames(
        "spinner-border",
        small ? "spinner-border-sm" : "text-primary m-1",
      )}
      role="status"
    >
      <span className="visually-hidden">Loading...</span>
    </div>
  );
}
