import * as z from "zod";

import {
  ApiListResponseSchema,
  ObservationSchema,
  ObservationsFilterSchema,
} from "./validations";

import { validPage } from "@/app/_components/api/pagination";

const OBSERVATIONS_URL = `${process.env.NEXT_PUBLIC_DATABASE_API}/observations/`;

export async function getObservations({
  page,
  ...rawFilters
}: Record<string, string>) {
  const filters = ObservationsFilterSchema.parse(rawFilters);

  const compiledFilters = new URLSearchParams({
    ...filters,
    page: `${validPage(page)}`,
  });

  return fetch(`${OBSERVATIONS_URL}?${compiledFilters.toString()}`)
    .then((request) => request.json())
    .then((rawData) =>
      ApiListResponseSchema.extend({
        results: z.array(ObservationSchema),
      }).parseAsync(rawData),
    )
    .then((data) => data.results);
}
