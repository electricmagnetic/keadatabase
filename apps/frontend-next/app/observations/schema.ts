/* eslint-disable @typescript-eslint/naming-convention -- Enum naming fixed by back-end */
import { z } from "zod";

import { PointSchema } from "@/app/_components/geospatial/schema";

/* Enums */

export enum SightingTypeEnum {
  sighted = "sighted",
  distant = "distant",
  heard = "heard",
}

export enum StatusType {
  new = "new",
  public = "public",
  private = "private",
  bad = "bad",
  fwf = "fwf",
  kct = "kct",
  nztf = "nztf",
  captive = "captive",
  radio = "radio",
  camera = "camera",
}

/* Objects */

export const ObservationSchema = z.object({
  id: z.number(),
  contributor: z.string(),
  get_status_display: z.string(),
  get_sighting_type_display: z.string(),
  date_sighted: z.string(),
  time_sighted: z.string(),
  region: z.string().nullable(),
  comments: z.string(),
  status: z.nativeEnum(StatusType),
  date_created: z.coerce.date(),
  date_updated: z.coerce.date(),
  sighting_type: z.nativeEnum(SightingTypeEnum),
  point_location: PointSchema,
  precision: z.coerce.number(),
  number: z.number(),
  location_details: z.string(),
  behaviour: z.string(),
  favourite: z.boolean(),
  confirmed: z.boolean(),
  geocode: z.string(),
});

export type Observation = z.infer<typeof ObservationSchema>;

/* Filters */

export const ObservationsFilterSchema = z
  .object({
    sighting_type: z.nativeEnum(SightingTypeEnum).or(z.literal("")).default(""),
  })
  .partial();
