/**
  Exports specified months on a per-season basis.
 */
export const seasons = {
  summer: [10, 11, 12, 1, 2, 3],
  winter: [4, 5, 6, 7, 8, 9],
};

/**
  Exports specified survey hours on a per-season basis.
 */
export const surveyHours = {
  summer: [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
  winter: [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
};

/**
  Exports maximum allowable number of grid tiles per given survey.
 */
export const maximumGridTiles = 15;

/**
  Exports default qs settings to ensure consistency across components.
  */
export const qsOptions = {
  encode: false,
  arrayFormat: 'brackets',
  ignoreQueryPrefix: true,
  addQueryPrefix: true,
  allowDots: true,
};
