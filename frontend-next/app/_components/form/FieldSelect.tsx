import { useEffect } from "react";
import classNames from "classnames";
import { useController } from "react-hook-form";

import Wrapper from "./Wrapper";
import type FieldProperties from "./Properties";

export default function FieldSelect({
  options,
  name,
  label,
  ...others
}: FieldProperties & {
  options: { id: string; name: string }[];
}) {
  const {
    field: { value, onChange, ...fieldOthers },
    fieldState: { invalid, error },
  } = useController({ name });

  return (
    <Wrapper error={error} label={label} name={name}>
      <select
        className={classNames("form-select", invalid && "is-invalid")}
        onChange={(event) => {
          onChange(event.target.value || null);
        }}
        value={value || ""}
        {...fieldOthers}
        {...others}
      >
        <option value="" />
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </Wrapper>
  );
}
