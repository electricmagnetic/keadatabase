import { notFound } from "next/navigation";
import { z } from "zod";

const HTTP_NOT_FOUND = 404;

export async function getData<Schema extends z.Schema<unknown>>(
  url: string,
  schema: Schema,
): Promise<z.infer<Schema>> {
  return await fetch(url)
    .then(async (result) => {
      if (!result.ok)
        throw result.status === HTTP_NOT_FOUND
          ? notFound()
          : new Error("Error fetching data");
      return await (result.json() as Promise<unknown>);
    })
    .then(async (rawData) => await schema.parseAsync(rawData));
}

export const validateSlug = (slug: unknown) => {
  try {
    return z.string().parse(slug);
  } catch {
    return undefined;
  }
};

export const validateId = (id: unknown) => {
  try {
    return z.coerce.number().parse(id);
  } catch {
    return undefined;
  }
};
