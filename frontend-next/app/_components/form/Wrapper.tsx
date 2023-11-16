import classNames from "classnames";
import { type FC, type PropsWithChildren } from "react";

import type FieldProperties from "./Properties";

const CLASS_FIELD_MARGIN = "mb-3";

function WrapperCheck({
  name,
  label,
  error,
  children,
}: PropsWithChildren<FieldProperties>) {
  return (
    <div className={`${CLASS_FIELD_MARGIN} form-check`}>
      {children}
      <label className="form-check-label" htmlFor={name}>
        {label}
      </label>
      {error ? (
        <div className="invalid-feedback">{error.message?.toString()}</div>
      ) : null}
    </div>
  );
}

// As per Bootstrap Docs, input groups with floating labels have different placement rules which makes for a complex component
function WrapperInputGroup({
  name,
  label,
  error,
  children,
  renderInputGroupLabel: RenderLabel,
  renderInputGroupButton: RenderButton,
}: PropsWithChildren<
  FieldProperties & {
    renderInputGroupLabel?: FC;
    renderInputGroupButton?: FC;
  }
>) {
  return (
    <div className={CLASS_FIELD_MARGIN}>
      <div className={classNames("input-group", error && "has-validation")}>
        <div className={classNames("form-floating", error && "is-invalid")}>
          {children}
          {(RenderLabel && <RenderLabel />) || (
            <label className="form-label" htmlFor={name}>
              {label}
            </label>
          )}
        </div>
        {RenderButton ? <RenderButton /> : null}
        {error ? (
          <div className="invalid-feedback">{error.message?.toString()}</div>
        ) : null}
      </div>
    </div>
  );
}

function Wrapper({
  name,
  label,
  error,
  children,
}: PropsWithChildren<FieldProperties>) {
  return (
    <div className={`${CLASS_FIELD_MARGIN} form-floating`}>
      {children}
      <label className="form-label" htmlFor={name}>
        {label}
      </label>
      {error ? (
        <div className="invalid-feedback">{error.message?.toString()}</div>
      ) : null}
    </div>
  );
}

Wrapper.Check = WrapperCheck;
Wrapper.InputGroup = WrapperInputGroup;

export default Wrapper;
