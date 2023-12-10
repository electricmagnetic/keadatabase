import { notFound } from "next/navigation";
import type * as z from "zod";

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

export async function postData<Schema extends z.Schema<unknown>>(
  url: string,
  schema: Schema,
  data: unknown,
): Promise<z.infer<Schema>> {
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((result) => result.json())
    .then((rawData) => schema.parseAsync(rawData));
}
