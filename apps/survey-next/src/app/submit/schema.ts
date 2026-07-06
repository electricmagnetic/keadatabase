import { z } from "zod";
import { getAllGridTileIds } from "../_components/grid/helpers";

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

// accepts the raw string from <input type="date">; empty is "required",
// unparseable is "format invalid", and a future date fails maxDate.
// output is a Date so the payload transform can call toISOString()
export const DateSchema = z
  .string()
  .min(1, MESSAGES.required)
  .refine((value) => !Number.isNaN(new Date(value).getTime()), MESSAGES.date)
  .transform((value) => new Date(value))
  .refine((date) => {
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    return date.getTime() <= today.getTime();
  }, MESSAGES.maxDate);

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
// input type accepts the raw date string from <input type="date">,
// output type (post-coercion) has date as a Date
export type Step2FormInput = z.input<typeof Step2Schema>;
export type Step2FormData = z.infer<typeof Step2Schema>;

// max flock size fields are derived from the hours, not entered directly
export type SurveySubmissionPayload = Omit<Step2FormData, "date" | "hours"> & {
  date: string;
  hours: Array<Omit<SurveyHour, "grid_tile"> & { grid_tile: string }>;
  max_flock_size: number | null;
  max_flock_size_grid_tile: string | null;
};
