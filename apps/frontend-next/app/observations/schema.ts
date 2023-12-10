import * as z from "zod";

import { SightingTypeEnum, StatusType } from "@/app/_components/enums";

export const ObservationSchema = z.object({
  id: z.number(),
  contributor: z.string(),
  get_status_display: z.string(),
  get_sighting_type_display: z.string(),
  date_sighted: z.string(),
  time_sighted: z.string(),
  region: z.string().nullable(),
  comments: z.string(),
  status: StatusType,
  date_created: z.string(),
  date_updated: z.string(),
  sighting_type: SightingTypeEnum,
  point_location: z.object({
    type: z.literal("Point"),
    coordinates: z.array(z.number()).length(2),
  }),
  precision: z.coerce.number(),
  number: z.number(),
  location_details: z.string(),
  behaviour: z.string(),
  favourite: z.boolean(),
  confirmed: z.boolean(),
  geocode: z.string(),
});

export type ObservationSchemaType = z.infer<typeof ObservationSchema>;

export const ObservationsFilterSchema = z.object({
  sighting_type: SightingTypeEnum.or(z.literal("")).default(""),
});
