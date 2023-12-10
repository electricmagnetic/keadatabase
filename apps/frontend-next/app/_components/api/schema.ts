import * as z from "zod";

/**
 * Standard paginated Django REST Framework API response
 */
export const ApiListResponseSchema = z.object({
  count: z.number(),
  next: z.string().url().nullable(),
  previous: z.string().url().nullable(),
  results: z.array(z.unknown()),
});
