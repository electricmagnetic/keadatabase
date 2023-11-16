import type { FieldError } from "react-hook-form";

interface FieldProperties {
  name: string;
  label: string;
  error?: FieldError;
}

export default FieldProperties;
