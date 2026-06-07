import { z } from "zod";

export const ApiListResponseSchema = z.object({
  count: z.number(),
  next: z.url().nullable(),
  previous: z.url().nullable(),
  results: z.array(z.unknown()),
});
