import * as z from "zod";

import { ObservationSchema, ObservationsFilterSchema } from "./schema";

import { validPage } from "@/app/_components/api/pagination";
import { ApiListResponseSchema } from "@/app/_components/api/schema";
import { getData } from "@/app/_components/api/actions";

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

  return getData(
    `${OBSERVATIONS_URL}?${compiledFilters.toString()}`,
    ApiListResponseSchema.extend({
      results: z.array(ObservationSchema),
    }),
  ).then((data) => data.results);
}
