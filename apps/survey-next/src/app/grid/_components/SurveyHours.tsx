"use client";

import useSWR from "swr";
import type { GridTileId } from "@/app/_components/grid/types";
import { SurveyHourItem } from "@/app/_components/SurveyHourItem";
import { Spinner } from "@/app/_components/ui/Spinner";

interface SurveyHoursProps {
  gridTile?: GridTileId;
  pageSize?: number;
  swapGridTileSurvey?: boolean;
}

interface SurveyHourData {
  id: number;
  hour: number;
  kea: boolean;
  activity: string;
  get_hour_display: string;
  get_activity_display: string;
  survey: number;
  survey__date: string;
  grid_tile: string | null;
}

interface SurveyHoursResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: SurveyHourData[];
}

/**
 * Fetch and display survey hours
 */
export function SurveyHours({
  gridTile,
  pageSize = 25,
  swapGridTileSurvey = false,
}: SurveyHoursProps) {
  const queryParams = new URLSearchParams();
  if (gridTile) queryParams.set("grid_tile", gridTile);
  if (pageSize) queryParams.set("page_size", pageSize.toString());

  const queryString = queryParams.toString()
    ? `?${queryParams.toString()}`
    : "";

  const url = `${process.env.NEXT_PUBLIC_API_BASE}/surveys/hours/${queryString}`;

  const { data, error, isLoading } = useSWR<SurveyHoursResponse>(url);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <>Unable to fetch survey hours</>;
  }

  if (!data || data.results.length === 0) {
    return <>No hours found</>;
  }

  return (
    <div className="data-table data-table--hours">
      {data.results.map((surveyHour) => (
        <SurveyHourItem
          key={surveyHour.id}
          surveyHour={surveyHour}
          swapGridTileSurvey={swapGridTileSurvey}
        />
      ))}
    </div>
  );
}
