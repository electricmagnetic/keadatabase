import classNames from "classnames";
import { type PropsWithChildren } from "react";

export default function Figure({
  caption,
  className,
  children,
}: PropsWithChildren<{ caption?: string; className?: string }>) {
  return (
    <figure className={classNames("figure d-inline", className)}>
      <div className="figure-img">{children}</div>
      {caption ? (
        <figcaption className="figure-caption text-end">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
