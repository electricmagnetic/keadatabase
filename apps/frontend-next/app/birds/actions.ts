"use server";

import { z } from "zod";

import { BirdSchema, BirdsFilterSchema } from "./schema";

import { ApiListResponseSchema } from "@/app/_components/api/schema";
import { getData } from "@/app/_components/api/actions";
import { validPage } from "@/app/_components/api/pagination";

const BIRDS_URL = `${process.env.NEXT_PUBLIC_DATABASE_API}/birds`;

export const getBird = async (slug: string) => {
  return getData(`${BIRDS_URL}/${slug}`, BirdSchema);
};

export const getBirds = async ({
  page,
  ...rawFilters
}: Record<string, unknown>) => {
  const filters = BirdsFilterSchema.partial().parse(rawFilters);

  const compiledFilters = new URLSearchParams({
    ...(filters.is_featured && { is_featured: "true" }),
    ...(filters.page_size && { page_size: `${filters.page_size}` }),
    ...(filters.ordering && { ordering: filters.ordering }),
    page: `${validPage(page)}`,
  });
  return getData(
    `${BIRDS_URL}?${compiledFilters.toString()}`,
    ApiListResponseSchema.extend({
      results: z.array(BirdSchema),
    }),
  ).then((data) => ({
    results: data.results,
    total: data.count,
    count: data.results.length,
    isMore: Boolean(data.next),
  })); // TODO de-duplicate
};
