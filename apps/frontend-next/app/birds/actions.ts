"use server";

import { z } from "zod";

import { BirdSchema, BirdsFilterSchema } from "./schema";

import { ApiListResponseSchema } from "@/app/_components/api/schema";
import { getData, validateSlug } from "@/app/_components/api/actions";
import { validPage } from "@/app/_components/api/pagination";

const BIRDS_URL = `${process.env.NEXT_PUBLIC_DATABASE_API}/birds`;

export const getBird = async (slug: unknown) => {
  const parsedSlug = validateSlug(slug);

  return getData(`${BIRDS_URL}/${parsedSlug}`, BirdSchema);
};

export const getBirds = async ({
  page,
  ...rawFilters
}: Record<string, string>) => {
  const filters = BirdsFilterSchema.parse(rawFilters);

  const compiledFilters = new URLSearchParams({
    ...filters,
    page: `${validPage(page)}`,
  });
  return getData(
    `${BIRDS_URL}?${compiledFilters.toString()}`,
    ApiListResponseSchema.extend({
      results: z.array(BirdSchema),
    }),
  ).then((data) => data.results);
};
