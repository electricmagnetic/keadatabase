import { SEASONS, SURVEY_HOURS, type Season } from "./constants";
import type { SurveyHour, SurveySubmissionPayload, Step2FormData } from "./schema";

export function getCurrentSeason(date: Date = new Date()): Season {
  const month = date.getMonth() + 1;
  return SEASONS.summer.includes(month) ? "summer" : "winter";
}

export function getSurveyHoursForSeason(season: Season): readonly number[] {
  return SURVEY_HOURS[season];
}

export function getSurveyHoursForDate(date: Date): readonly number[] {
  const season = getCurrentSeason(date);
  return getSurveyHoursForSeason(season);
}

export function generateInitialHours(
  date: Date,
  gridTiles?: string[],
): SurveyHour[] {
  const hours = getSurveyHoursForDate(date);
  const singleGridTile = gridTiles?.length === 1 ? gridTiles[0] : null;

  return hours.map((hour) => ({
    hour,
    activity: "",
    kea: null,
    grid_tile: singleGridTile,
  }));
}

export function transformFormDataToPayload(
  formData: Step2FormData,
): SurveySubmissionPayload {
  return {
    ...formData,
    date: formData.date.toISOString().split("T")[0],
    hours: formData.hours
      .filter((hour) => hour.grid_tile !== null)
      .map((hour) => ({
        ...hour,
        grid_tile: hour.grid_tile!,
      })),
  };
}

export function formatHourDisplay(hour: number): string {
  const start = hour.toString().padStart(2, "0");
  const end = ((hour + 1) % 24).toString().padStart(2, "0");
  return `${start}:00-${end}:00`;
}
