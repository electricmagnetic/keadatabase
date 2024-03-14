import { z } from "zod";

export const PointSchema = z.object({
  type: z.literal("Point"),
  coordinates: z.array(z.number()).length(2),
});
