import { z } from "zod";

const COORDINATE_LENGTH = 2; // we know API returns in 2D

export const PointSchema = z.object({
  type: z.literal("Point"),
  coordinates: z.array(z.number()).length(COORDINATE_LENGTH),
});
