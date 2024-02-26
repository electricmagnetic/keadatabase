/* eslint import/no-unresolved: [2, { ignore: ['geojson'] }] -- geojson is type definition only */

import * as z from "zod";
import { DateTime } from "luxon";
import { type Point } from "geojson";

import {
  BandedEnum,
  LifeStageEnum,
  PrecisionEnum,
  SexEnum,
  SightingTypeEnum,
} from "@/app/_components/enums";
import { SouthIslandBbox } from "@/app/_components/constants";

/* The 'FormSchema' refers to validating the form values submitted by users. The 'DTOSchema' refers to the values sent to the API (obtained by transforming the form values). */

const locationErrorMessage = (type: string, reason: string) => ({
  message: `The ${type} is outside of the South Island/Te Waipounamu (${reason})`,
});

/* Common to form and DTO */

const InlineBirdSchema = z.object({
  banded: BandedEnum,
  band_combo: z.string().optional(),
  sex_guess: SexEnum,
  life_stage_guess: LifeStageEnum,
});

type InlineBirdType = z.infer<typeof InlineBirdSchema>;

const ReportCommonSchema = z.object({
  date_sighted: z.coerce.string(), // TODO change to date type, check date validity
  time_sighted: z.coerce.string(),
  precision: PrecisionEnum,
  sighting_type: SightingTypeEnum,
  birds: z.array(InlineBirdSchema).min(0),
  number: z.coerce.number().min(1),
  contributor: z.object({
    name: z.string().min(2, { message: "Your name is required" }),
    email: z.string().email(),
    communications: z.coerce.boolean().default(false),
  }),

  // optional fields
  location_details: z.string().optional(),
  behaviour: z.string().optional(),
  comments: z.string().optional(),
});

/* Form */

export const ReportFormSchema = ReportCommonSchema.extend({
  longitude: z
    .union([z.string(), z.number()])
    .pipe(
      z.coerce
        .number()
        .min(SouthIslandBbox[0], locationErrorMessage("longitude", "too small"))
        .max(SouthIslandBbox[2], locationErrorMessage("longitude", "too big")),
    ),
  latitude: z
    .union([z.string(), z.number()])
    .pipe(
      z.coerce
        .number()
        .min(SouthIslandBbox[1], locationErrorMessage("latitude", "too small"))
        .max(SouthIslandBbox[3], locationErrorMessage("latitude", "too small")),
    ),
});

export type ReportFormInput = z.input<typeof ReportFormSchema>;
export type ReportFormOutput = z.output<typeof ReportFormSchema>;

export const emptyValues: ReportFormInput = {
  date_sighted: DateTime.now().toISODate(),
  time_sighted: DateTime.now().toFormat("HH:mm"),
  precision: "200",
  latitude: "",
  longitude: "",
  sighting_type: "sighted",
  birds: [],
  number: 0,
  contributor: {
    name: "",
    email: "",
    communications: false,
  },
  location_details: "",
  behaviour: "",
  comments: "",
};

export const emptyInlineBirdValues: InlineBirdType = {
  banded: "unknown",
  band_combo: "",
  sex_guess: "",
  life_stage_guess: "",
};

/* DTO */

export const ReportDTOSchema = ReportCommonSchema.extend({
  point_location: z.object({
    type: z.literal("Point"),
    coordinates: z.array(z.coerce.number()).length(2),
  }) satisfies z.ZodType<Point>,
  challenge: z.literal("kea"),
});

export type ReportDTOType = z.infer<typeof ReportDTOSchema>;

/**
 * Transform the parsed form values into a DTO suitable for sending to the API
 */
export const formToDto = async (
  data: ReportFormOutput,
): Promise<ReportDTOType> => {
  const { longitude, latitude, ...others } = data;
  return ReportDTOSchema.parseAsync({
    challenge: "kea",
    point_location: {
      type: "Point",
      coordinates: [longitude.toFixed(6), latitude.toFixed(6)], // 6 decimal points is more than accurate enough
    },
    ...others,
  });
};
