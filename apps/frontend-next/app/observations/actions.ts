import * as z from "zod";

import { ApiListResponse, ObservationSchema } from "./validations";

const OBSERVATIONS_URL = `${process.env.NEXT_PUBLIC_DATABASE_API}/observations/`;

export async function getObservations() {
  return fetch(`${OBSERVATIONS_URL}`)
    .then((request) => request.json())
    .then((rawData) =>
      ApiListResponse.extend({
        results: z.array(ObservationSchema),
      }).parseAsync(rawData),
    )
    .then((data) => data.results);
}
