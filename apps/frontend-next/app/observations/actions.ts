"use server";

import { z } from "zod";

import { ObservationSchema, ObservationsFilterSchema } from "./schema";

import { validPage } from "@/app/_components/api/pagination";
import { ApiListResponseSchema } from "@/app/_components/api/schema";
import { getData } from "@/app/_components/api/actions";

const OBSERVATIONS_URL = `${process.env.NEXT_PUBLIC_DATABASE_API}/observations`;

export const getObservation = async (id: number) =>
  await getData(`${OBSERVATIONS_URL}/${id}`, ObservationSchema);

export const getObservations = async ({
  page,
  ...rawFilters
}: Record<string, unknown>) => {
  const filters = ObservationsFilterSchema.parse(rawFilters);

  const compiledFilters = new URLSearchParams({
    ...filters,
    page: `${validPage(page)}`,
  });

  return await getData(
    `${OBSERVATIONS_URL}?${compiledFilters.toString()}`,
    ApiListResponseSchema.extend({
      results: z.array(ObservationSchema),
    }),
  ).then((data) => ({
    results: data.results,
    total: data.count,
    count: data.results.length,
    isMore: Boolean(data.next),
  })); // TODO de-duplicate
};
