import { SEASONS, SURVEY_HOURS, type Season } from "./constants";
import type { SurveyHour, SurveySubmissionPayload, Step2FormData } from "./schema";

export function getCurrentSeason(date: Date = new Date()): Season {
  const month = date.getMonth() + 1;
  return (SEASONS.summer as readonly number[]).includes(month) ? "summer" : "winter";
}

export function getSurveyHoursForSeason(season: Season): readonly number[] {
  return SURVEY_HOURS[season];
}

export function getSurveyHoursForDate(date: Date): readonly number[] {
  const season = getCurrentSeason(date);
  return getSurveyHoursForSeason(season);
}

export function generateInitialHours(gridTiles?: string[]): SurveyHour[] {
  // always use summer hours which includes all possible hours (6-20)
  // hours 6, 19, 20 will show "summer only" in the UI
  const hours = SURVEY_HOURS.summer;
  // grid_tile is an array of one for typeahead compatibility
  const singleGridTile = gridTiles?.length === 1 ? [gridTiles[0]] : [];

  return hours.map((hour) => ({
    hour,
    activity: "",
    kea: false,
    max_seen: null,
    grid_tile: singleGridTile.length > 0 ? singleGridTile : null,
  }));
}

export function transformFormDataToPayload(
  formData: Step2FormData,
): SurveySubmissionPayload {
  const { date, hours, ...rest } = formData;

  // the hour with the most kea seen supplies the max flock size and its tile;
  // ties go to the earliest such hour
  const maxHour = hours.reduce<SurveyHour | null>(
    (best, hour) =>
      hour.kea === true &&
      hour.max_seen !== null &&
      hour.max_seen > (best?.max_seen ?? 0)
        ? hour
        : best,
    null,
  );

  return {
    ...rest,
    date: date.toISOString().split("T")[0],
    max_flock_size: maxHour?.max_seen ?? null,
    max_flock_size_grid_tile: maxHour?.grid_tile?.[0] ?? null,
    hours: hours
      .filter((hour) => hour.grid_tile !== null && hour.grid_tile.length > 0)
      .map(({ grid_tile, ...hour }) => ({
        ...hour,
        // transform array of one to string for API
        grid_tile: grid_tile![0],
      })),
  };
}

export function formatHourDisplay(hour: number): string {
  const start = hour.toString().padStart(2, "0");
  const end = ((hour + 1) % 24).toString().padStart(2, "0");
  return `${start}:00-${end}:00`;
}
