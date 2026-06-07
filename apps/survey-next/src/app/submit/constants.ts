export const SEASONS = {
  summer: [10, 11, 12, 1, 2, 3],
  winter: [4, 5, 6, 7, 8, 9],
} as const;

export const SURVEY_HOURS = {
  summer: [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
  winter: [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
} as const;

export const MAX_GRID_TILES = 15;

export type Season = "summer" | "winter";
