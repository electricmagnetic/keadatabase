import { useController } from "react-hook-form";
import classNames from "classnames";
import type { HTMLInputTypeAttribute } from "react";

import Wrapper from "./Wrapper";
import type FieldProperties from "./Properties";

export default function FieldInput({
  type = "text",
  name,
  label,
  ...others
}: FieldProperties & {
  type: HTMLInputTypeAttribute;
}) {
  const {
    field: { value, onChange, ...fieldOthers },
    fieldState: { invalid, error },
  } = useController({ name });

  return (
    <Wrapper error={error} label={label} name={name}>
      <input
        className={classNames("form-control", invalid && "is-invalid")}
        id={name}
        onChange={(event) => {
          onChange(event.target.value || null);
        }}
        placeholder={label}
        type={type}
        value={value || ""}
        {...fieldOthers}
        {...others}
      />
    </Wrapper>
  );
}
