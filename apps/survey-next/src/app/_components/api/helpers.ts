import { z } from "zod";

export const SurveyIdSchema = z.object({ id: z.coerce.number() });
