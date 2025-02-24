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
  const filters = BirdObservationsFilterSchema.parse(rawFilters);

  const compiledFilters = new URLSearchParams({
    ...(Boolean(filters.page_size) && { page_size: `${filters.page_size}` }),
    ...(Boolean(filters.has_bird) && { has_bird: "true" }),
    ...(Boolean(filters.sighting) && { sighting: `${filters.sighting}` }),
    ...(Boolean(filters.bird) && { bird: filters.bird }),
    page: `${validPage(page)}`,
  });

  return await getData(
    `${BIRD_OBSERVATIONS_URL}?${compiledFilters.toString()}`,
    ApiListResponseSchema.extend({
      results: z.array(BirdObservationSchema),
    }),
  ).then((data) => ({
    results: data.results,
    total: data.count,
    count: data.results.length,
    isMore: Boolean(data.next),
  })); // TODO de-duplicate
};
