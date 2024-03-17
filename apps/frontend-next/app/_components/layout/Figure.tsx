import classNames from "classnames";
import { type PropsWithChildren } from "react";

export default function Figure({
  caption,
  className,
  children,
  hideCaption,
}: PropsWithChildren<{
  caption?: string;
  className?: string;
  hideCaption?: boolean;
}>) {
  return (
    <figure className={classNames("figure d-block", className)}>
      <div className={classNames("figure-img", hideCaption && "m-0")}>
        {children}
      </div>
      {caption ? (
        <figcaption
          className={classNames(
            "figure-caption text-end",
            hideCaption && "visually-hidden",
          )}
        >
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
