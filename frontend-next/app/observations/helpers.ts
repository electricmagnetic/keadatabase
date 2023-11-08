import { type ReadonlyURLSearchParams } from "next/navigation";
import { type ZodSchema } from "zod";

export const searchParamsAsObject = (searchParams: ReadonlyURLSearchParams) =>
  Object.fromEntries(new URLSearchParams(searchParams));

export function getValuesFromSearchParam<T>(
  searchParams: ReadonlyURLSearchParams,
  schema: ZodSchema<T>,
): T {
  return schema.parse(searchParamsAsObject(searchParams));
}
