import { type PropsWithChildren } from "react";

import Page from "../layout/Page";

export default function Alert({
  title,
  type,
  children,
}: PropsWithChildren<{ title?: string; type: "success" | "danger" }>) {
  return (
    <Page.Section size="small">
      <div className={`alert alert-${type}`} role="alert">
        {title ? <h2 className="alert-heading">{title}</h2> : null}
        {children}
      </div>
    </Page.Section>
  );
}
