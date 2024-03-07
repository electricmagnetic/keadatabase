import { type PropsWithChildren } from "react";
import classNames from "classnames";

type SplitProps = PropsWithChildren<{
  className?: string;
  width?: string;
}>;

function Split({ children }: PropsWithChildren) {
  return <div className="row">{children}</div>;
}

function Scroll({
  className,
  children,
  width = "col-12 col-md-6",
}: SplitProps) {
  return (
    <main
      className={classNames(
        "split split-scroll", // selector for toggling visibility (see SplitToggler)
        width,
        className,
      )}
    >
      {children}
    </main>
  );
}

function Fixed({ className, children, width = "col-12 col-md-6" }: SplitProps) {
  return (
    <aside
      className={classNames(
        "split split-fixed", // selector for toggling visibility (see SplitToggler)
        width,
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
