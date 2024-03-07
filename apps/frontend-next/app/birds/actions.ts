"use server";

import { BirdSchema } from "./schema";

import { getData, validateSlug } from "@/app/_components/api/actions";

export const getBird = async (slug: unknown) => {
  const parsedSlug = validateSlug(slug);

  return getData(
    `${process.env.NEXT_PUBLIC_DATABASE_API}/birds/${parsedSlug}`,
    BirdSchema,
  );
};
