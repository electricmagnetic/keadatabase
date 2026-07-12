import { z } from "zod";

import fetcher from "shared/api/fetcher";
import { ApiListResponseSchema } from "@/app/_components/api/schema";
import { getApiUrl } from "@/app/_components/api/url";
import { getUniqueGridTiles } from "./helpers";
import GridTileCards from "./GridTileCards";

const SurveyHourSchema = z.object({
  id: z.number().int(),
  grid_tile: z.string().nullable(),
});

const SurveyHoursApiListResponseSchema = ApiListResponseSchema.extend({
  results: z.array(SurveyHourSchema),
});

export default async function RecentGridTiles({
  limit = 8,
}: {
  limit?: number;
}) {
  // hours also arrive from the mobile app, so never serve a build-time snapshot
  const surveyHoursFetch = await fetcher(
    getApiUrl("/surveys/hours/?page_size=120"),
    SurveyHoursApiListResponseSchema,
    { cache: "no-store" },
  );

  if (!surveyHoursFetch.success) {
    return <p>Error loading recent grid tiles</p>;
  }

  const gridTileIds = getUniqueGridTiles(surveyHoursFetch.data.results).slice(
    0,
    limit,
  );

  return <GridTileCards gridTileIds={gridTileIds} />;
}
