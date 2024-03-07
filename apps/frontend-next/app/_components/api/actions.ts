import { notFound } from "next/navigation";
import { z } from "zod";

export async function getData<Schema extends z.Schema<unknown>>(
  url: string,
  schema: Schema,
): Promise<z.infer<Schema>> {
  return fetch(url)
    .then((result) => {
      if (!result.ok)
        throw result.status === 404
          ? notFound()
          : new Error("Error fetching data");
      return result.json() as Promise<unknown>;
    })
    .then((rawData) => schema.parseAsync(rawData));
}

export const validateSlug = (slug: unknown) => {
  try {
    return z.string().parse(slug);
  } catch {
    throw new Error("Error parsing provided slug (ID)");
  }
};
