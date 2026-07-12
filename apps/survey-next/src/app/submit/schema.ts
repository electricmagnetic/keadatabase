import { z } from "zod";
import { getAllGridTileIds } from "../_components/grid/helpers";
import { getLocalDateString } from "./utils";

const MESSAGES = {
  required: "This field is required.",
  email: "Invalid email address.",
  number: "This field must be a number.",
  date: "Date format invalid.",
  maxDate: "Date must be today or earlier.",
  gridTileMin: "Please select at least one grid tile.",
  gridTileMax: "Too many grid tiles have been selected.",
  gridTileInvalid: "One or more grid tiles are invalid.",
  hourRequired: "At least one survey hour is required.",
  maxSeenRequired: "Enter how many kea you saw this hour.",
};

export const ObserverSchema = z.object({
  name: z.string().min(1, MESSAGES.required),
  email: z.string().min(1, MESSAGES.required).email(MESSAGES.email),
});

export const GridTilesSchema = z
  .array(z.string().max(7))
  .min(1, MESSAGES.gridTileMin)
  .max(15, MESSAGES.gridTileMax)
  .refine(
    (tiles) => {
      const validTileIds = getAllGridTileIds();
      return tiles.every((tileId) => validTileIds.includes(tileId));
    },
    { message: MESSAGES.gridTileInvalid },
  );

export const Step1Schema = z.object({
  gridTiles: GridTilesSchema,
});

// form schema - grid_tile is an array (for typeahead compatibility)
export const SurveyHourSchema = z.object({
  hour: z.number().int().min(0).max(23),
  activity: z.string().min(1, MESSAGES.required),
  kea: z.boolean().nullable(),
  max_seen: z.number().int().min(1, MESSAGES.maxSeenRequired).nullable(),
  grid_tile: z.array(z.string()).nullable(), // array for typeahead
});

// superRefine (not refine) so errors attach to the specific field paths
// (activity / grid_tile) rather than the object root — RHF needs per-field
// paths to surface field-level validation, and an object-root error would
// otherwise clobber the per-field `activity` required error
export const SurveyHourSchemaWithValidation = SurveyHourSchema.superRefine(
  (data, ctx) => {
    // when actively surveying, a grid tile must be chosen for the hour
    if (data.activity !== "X" && data.activity !== "") {
      if (data.grid_tile === null || data.grid_tile.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: MESSAGES.required,
          path: ["grid_tile"],
        });
      }
    }

    // when kea were observed this hour, a count is required
    if (data.kea === true && data.max_seen === null) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: MESSAGES.maxSeenRequired,
        path: ["max_seen"],
      });
    }
  },
);

// accepts the raw YYYY-MM-DD string from <input type="date">; empty is
// "required", anything else is "format invalid", and a future date fails
// maxDate. Kept as a string rather than a Date: ISO dates compare correctly
// lexically, so "today or earlier" needs no timezone reasoning at all — which
// is what broke this (new Date("2025-07-13") is UTC midnight, i.e. noon in NZ,
// so today read as being in the future).
export const DateSchema = z
  .string()
  .min(1, MESSAGES.required)
  .regex(/^\d{4}-\d{2}-\d{2}$/, MESSAGES.date)
  .refine((value) => !Number.isNaN(new Date(value).getTime()), MESSAGES.date)
  .refine((value) => value <= getLocalDateString(), MESSAGES.maxDate);

export const Step2Schema = z.object({
  observer: ObserverSchema,
  date: DateSchema,
  hours: z.array(SurveyHourSchemaWithValidation).min(1, MESSAGES.hourRequired),
  purpose: z.string().optional(),
  comments: z.string().optional(),
  challenge: z.string().min(1, MESSAGES.required),
});

export type Observer = z.infer<typeof ObserverSchema>;
export type GridTiles = z.infer<typeof GridTilesSchema>;
export type Step1FormData = z.infer<typeof Step1Schema>;
export type SurveyHour = z.infer<typeof SurveyHourSchema>;
// date stays a YYYY-MM-DD string end to end — the form field, the validation
// and the API payload all speak calendar dates, so there is no Date to mistime
export type Step2FormInput = z.input<typeof Step2Schema>;
export type Step2FormData = z.infer<typeof Step2Schema>;

// max flock size fields are derived from the hours, not entered directly
export type SurveySubmissionPayload = Omit<Step2FormData, "date" | "hours"> & {
  date: string;
  hours: Array<Omit<SurveyHour, "grid_tile"> & { grid_tile: string }>;
  max_flock_size: number | null;
  max_flock_size_grid_tile: string | null;
};
