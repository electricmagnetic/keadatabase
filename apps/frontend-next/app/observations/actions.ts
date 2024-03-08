"use server";

import { z } from "zod";

import {
  BirdObservationSchema,
  BirdObservationsFilterSchema,
  ObservationSchema,
  ObservationsFilterSchema,
} from "./schema";

import { validPage } from "@/app/_components/api/pagination";
import { ApiListResponseSchema } from "@/app/_components/api/schema";
import { getData, validateId } from "@/app/_components/api/actions";

const OBSERVATIONS_URL = `${process.env.NEXT_PUBLIC_DATABASE_API}/observations`;
const BIRD_OBSERVATIONS_URL = `${process.env.NEXT_PUBLIC_DATABASE_API}/bird_observations`;

export const getObservation = async (id: unknown) => {
  const parsedId = validateId(id);

  return getData(`${OBSERVATIONS_URL}/${parsedId}`, ObservationSchema);
};

export const getObservations = async ({
  page,
  ...rawFilters
}: Record<string, string>) => {
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
};

export const getBirdObservations = async ({
  page,
  ...rawFilters
}: Record<string, string>) => {
  const filters = BirdObservationsFilterSchema.parse(rawFilters);

  const compiledFilters = new URLSearchParams({
    ...filters,
    page: `${validPage(page)}`,
  });

  return getData(
    `${BIRD_OBSERVATIONS_URL}?${compiledFilters.toString()}`,
    ApiListResponseSchema.extend({
      results: z.array(BirdObservationSchema),
    }),
  ).then((data) => data.results);
};
