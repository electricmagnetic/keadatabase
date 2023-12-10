import * as z from "zod";

import { type ReportDTOType } from "./schema";

import { postData } from "@/app/_components/api/actions";

const REPORT_URL = `${process.env.NEXT_PUBLIC_DATABASE_API}/report/observation/`;

// The returned object differs from the output of the /observations endpoint, so we are just looking for the ID to be able to redirect
const PartialObservationSchema = z.object({ id: z.number() });
type PartialObservationType = z.infer<typeof PartialObservationSchema>;

export async function createReport(
  dto: ReportDTOType,
): Promise<PartialObservationType> {
  try {
    return postData(REPORT_URL, PartialObservationSchema, dto);
    // TODO handle 400 errors, report back to schema
  } catch {
    throw new Error(
      "An error occurred while attempting to report your observation",
    );
  }
}
