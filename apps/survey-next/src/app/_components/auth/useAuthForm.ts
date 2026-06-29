"use client";

import { useForm, type UseFormProps, type FieldValues } from "react-hook-form";

/**
 * useForm preset shared by every auth form: live validation (validate on blur,
 * then revalidate on change). Pass the resolver and defaultValues as usual.
 */
export function useAuthForm<T extends FieldValues>(options: UseFormProps<T>) {
  return useForm<T>({
    mode: "onTouched",
    reValidateMode: "onChange",
    ...options,
  });
}
