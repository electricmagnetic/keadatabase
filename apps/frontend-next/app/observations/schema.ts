/* eslint-disable @typescript-eslint/naming-convention -- Enum naming fixed by back-end */
import { z } from "zod";

import { BirdSchema } from "../birds/schema";

// TODO validate against real data

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

export enum BandedEnum {
  unknown = "unknown",
  unreadable = "unreadable",
  readable = "readable",
  unbanded = "unbanded",
}

export enum SexGuessEnum {
  unsure = "",
  male = "male",
  female = "female",
}

export enum LifeStageGuessEnum {
  unsure = "",
  fledgling = "fledgling",
  juvenile = "juvenile",
  "sub-adult" = "sub-adult",
  adult = "adult",
}

/* Objects */

const PointSchema = z.object({
  type: z.literal("Point"),
  coordinates: z.array(z.number()).length(2),
});

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

export const BirdObservationSchema = z.object({
  id: z.number(),
  get_banded_display: z.string(),
  get_sex_guess_display: z.string().nullable(),
  get_life_stage_guess_display: z.string().nullable(),
  bird: BirdSchema.nullable(),
  sighting: ObservationSchema,
  sighting__point_location: PointSchema,
  banded: z.nativeEnum(BandedEnum),
  band_combo: z.string().nullable(),
  sex_guess: z.nativeEnum(SexGuessEnum).nullable(),
  life_stage_guess: z.nativeEnum(LifeStageGuessEnum).nullable(),
  revisit: z.boolean(),
});

export type BirdObservation = z.infer<typeof BirdObservationSchema>;

/* Filters */

export const ObservationsFilterSchema = z
  .object({
    sighting_type: z.nativeEnum(SightingTypeEnum).or(z.literal("")).default(""),
  })
  .partial();

export const BirdObservationsFilterSchema = z
  .object({
    bird: z.string(),
    sighting: z.string(),
  })
  .partial();
