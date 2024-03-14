"use server";

import { z } from "zod";

import { BirdObservationSchema, BirdObservationsFilterSchema } from "./schema";

import { validPage } from "@/app/_components/api/pagination";
import { ApiListResponseSchema } from "@/app/_components/api/schema";
import { getData } from "@/app/_components/api/actions";

const BIRD_OBSERVATIONS_URL = `${process.env.NEXT_PUBLIC_DATABASE_API}/bird_observations`;

export const getBirdObservations = async ({
  page,
  ...rawFilters
}: Record<string, unknown>) => {
  const filters = BirdObservationsFilterSchema.partial().parse(rawFilters);

  const compiledFilters = new URLSearchParams({
    ...(filters.sighting && { sighting: `${filters.sighting}` }),
    ...(filters.bird && { bird: filters.bird }),
    page: `${validPage(page)}`,
  });

  return getData(
    `${BIRD_OBSERVATIONS_URL}?${compiledFilters.toString()}`,
    ApiListResponseSchema.extend({
      results: z.array(BirdObservationSchema),
    }),
  ).then((data) => data.results);
};
