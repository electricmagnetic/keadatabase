/**
 * From a given set of survey hours, this will create a list of unique grid tiles.
 */
export function getUniqueGridTiles(
  hours: Array<{ grid_tile: string | null }>
): string[] {
  return [
    ...new Set(
      hours
        .filter((surveyHour) => surveyHour.grid_tile)
        .map((surveyHour) => surveyHour.grid_tile as string)
    ),
  ];
}
