/* eslint-disable @typescript-eslint/naming-convention -- Enum naming fixed by back-end */
import { z } from "zod";

import { ObservationSchema } from "../observations/schema";
import { BirdSchema } from "../birds/schema";

import { PointSchema } from "@/app/_components/geospatial/schema";

/* Enums */

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

export const BirdObservationsFilterSchema = z
  .object({
    bird: z.string(),
    sighting: z.coerce.number(),
  })
  .partial();
