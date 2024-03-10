import { type PropsWithChildren } from "react";
import classNames from "classnames";

import { SplitToggler, type SplitTogglerProps } from "./SplitToggler";

type SplitPartProps = PropsWithChildren<{
  className?: string;
  width?: string;
}>;

function Split({ children, ...others }: PropsWithChildren<SplitTogglerProps>) {
  return (
    <>
      <SplitToggler {...others} />
      <div className="split-container">{children}</div>
    </>
  );
}

function Scroll({ className, children }: SplitPartProps) {
  return (
    <main
      className={classNames(
        "split split-scroll", // selector for toggling visibility (see SplitToggler)
        "col-lg-6",
        className,
      )}
    >
      {children}
    </main>
  );
}

function Fixed({ className, children }: SplitPartProps) {
  return (
    <aside
      className={classNames(
        "split split-fixed", // selector for toggling visibility (see SplitToggler)
        "col-lg-6",
        className,
      )}
    >
      {children}
    </aside>
  );
}

Split.Scroll = Scroll;
Split.Fixed = Fixed;

export default Split;
