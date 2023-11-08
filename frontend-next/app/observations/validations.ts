import { z } from "zod";

export const ObservationsFilterSchema = z.object({
  sighting_type: z.enum(["sighted", "heard", "distant"]).optional(),
  status: z.enum(["new", "public"]).optional(),
});

export type ObservationsFilters = z.infer<typeof ObservationsFilterSchema>;
