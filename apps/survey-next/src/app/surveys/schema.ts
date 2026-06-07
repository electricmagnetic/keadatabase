import { z } from "zod";
import { ApiListResponseSchema } from "../_components/api/schema";

// TODO Provisional API schema, need to be validated and possibly made more specific (e.g. include enums?)

const SurveyHourSchema = z.object({
  id: z.number().int(),
  get_activity_display: z.string(),
  get_hour_display: z.string(),
  survey__date: z.coerce.date(),
  hour: z.number().int(),
  kea: z.boolean(),
  activity: z.string(),
  survey: z.number().int(),
  grid_tile: z.string().nullable(),
});

export const SurveySchema = z.object({
  id: z.number().int(),
  get_status_display: z.string(),
  observer: z.string(),
  hours: z.array(SurveyHourSchema),
  date: z.coerce.date(),
  purpose: z.string(),
  comments: z.string(),
  max_flock_size: z.number().int().nullable(),
  status: z.string(),
  date_created: z.coerce.date(),
  date_updated: z.coerce.date(),
});

export const SurveyApiListResponseSchema = ApiListResponseSchema.extend({
  results: z.array(SurveySchema),
});

export const SurveyHourApiListResponseSchema = ApiListResponseSchema.extend({
  results: z.array(SurveyHourSchema),
});
