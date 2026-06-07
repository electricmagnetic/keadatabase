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
  observer: ObserverSchema,
  gridTiles: GridTilesSchema,
});

export const SurveyHourSchema = z.object({
  hour: z.number().int().min(0).max(23),
  activity: z.string().min(1, MESSAGES.required),
  kea: z.boolean().nullable(),
  grid_tile: z.string().nullable(),
});

export const SurveyHourSchemaWithValidation = SurveyHourSchema.refine(
  (data) => {
    if (data.activity !== "X") {
      return data.kea !== null && data.grid_tile !== null;
    }
    return true;
  },
  {
    message: "Kea observation and grid tile are required when activity is recorded",
  },
);

export const Step2Schema = z.object({
  observer: ObserverSchema,
  date: z.coerce.date().max(new Date(), MESSAGES.maxDate),
  hours: z.array(SurveyHourSchemaWithValidation).min(1, MESSAGES.hourRequired),
  max_flock_size: z.number().int().min(0).nullable(),
  purpose: z.string().optional(),
  comments: z.string().optional(),
  challenge: z.string().min(1, MESSAGES.required),
});

export type Observer = z.infer<typeof ObserverSchema>;
export type GridTiles = z.infer<typeof GridTilesSchema>;
export type Step1FormData = z.infer<typeof Step1Schema>;
export type SurveyHour = z.infer<typeof SurveyHourSchema>;
export type Step2FormData = z.infer<typeof Step2Schema>;

export type SurveySubmissionPayload = Omit<Step2FormData, "date"> & {
  date: string;
  hours: Array<Omit<SurveyHour, "grid_tile"> & { grid_tile: string }>;
};
