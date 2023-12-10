import * as z from "zod";

const SightingTypeEnum = z.enum(["sighted", "distant", "heard"]);

export const ObservationSchema = z.object({
  id: z.number(),
  contributor: z.string(),
  get_status_display: z.string(),
  get_sighting_type_display: z.string(),
  date_sighted: z.string(),
  time_sighted: z.string(),
  region: z.string().nullable(),
  comments: z.string(),
  status: z.string(),
  date_created: z.string(),
  date_updated: z.string(),
  sighting_type: SightingTypeEnum,
  point_location: z.object({
    type: z.literal("Point"),
    coordinates: z.array(z.number()).length(2),
  }),
  precision: z.number(),
  number: z.number(),
  location_details: z.string(),
  behaviour: z.string(),
  favourite: z.boolean(),
  confirmed: z.boolean(),
  geocode: z.string(),
});

export const ObservationsFilterSchema = z.object({
  sighting_type: SightingTypeEnum.or(z.literal("")).default(""),
});
