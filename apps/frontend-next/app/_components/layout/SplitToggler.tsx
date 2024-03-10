"use client";

import { useEffect, useState, type ReactElement } from "react";
import classNames from "classnames";

export interface SplitTogglerProps {
  whenFixed: ReactElement;
  whenScroll: ReactElement;
}

/**
 * By design 'SplitToggler' goes outside of the ReactDOM to adjust the classes of the Split.Scroll/Split.Fixed elements.
 * This enables the use of the toggle functionality in server components (which do not support React refs).
 */
export function SplitToggler({ whenFixed, whenScroll }: SplitTogglerProps) {
  const [hideScroll, setHideScroll] = useState(false);

  // toggle 'split-hide' depending on the state
  useEffect(() => {
    document
      .querySelector(".split-scroll")
      ?.classList.toggle("split-hide", hideScroll);
    document
      .querySelector(".split-fixed")
      ?.classList.toggle("split-hide", !hideScroll);
  }, [hideScroll]);

  // when toggler is used, add class 'split-toggler-active'
  useEffect(() => {
    const splitElements = document.querySelectorAll(".split");
    splitElements.forEach((element) => {
      element.classList.add("split-toggler-active");
    });
  }, []);

  return (
    <button
      className={classNames("split-toggler btn btn-secondary")}
      onClick={() => {
        setHideScroll(!hideScroll);
      }}
      type="button"
    >
      {hideScroll ? whenFixed : whenScroll}
    </button>
  );
}
