import { z } from "zod";

type FetcherReturnType<Schema extends z.ZodType> =
  | {
      success: true;
      data: z.output<Schema>;
    }
  | {
      // schema error
      success: false;
      error: unknown;
      errorType: "schema";
    }
  | {
      // fetch error
      success: false;
      status: number;
      errorType: "fetch";
    };

/**
 * Extended fetcher function that parses the results with the provided Zod schema, and returns data in a standardised format.
 *
 * @param url -- URL to fetch
 * @param schema -- ZodSchema to validate
 * @param init -- Any additional request init parameters (e.g. headers)
 * @returns -- a simple object with a success boolean, and either the data or the error
 */
export default async function fetcher<Schema extends z.ZodType>(
  url: string,
  schema: Schema,
  init?: RequestInit,
): Promise<FetcherReturnType<Schema>> {
  const response = await fetch(url, init);

  if (!response.ok)
    return { success: false, status: response.status, errorType: "fetch" };

  try {
    const data = schema.parse(await response.json());
    return { success: true, data };
  } catch (error) {
    console.error(error);
    return { success: false, error, errorType: "schema" };
  }
}
