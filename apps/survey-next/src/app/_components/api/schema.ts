import { z } from "zod";

/**
 * Standard paginated Django REST Framework API response
 */
export const ApiListResponseSchema = z.object({
  count: z.number(),
  next: z.url().nullable(),
  previous: z.url().nullable(),
  results: z.array(z.unknown()),
});
