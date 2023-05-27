/**
  From a given set of survey hours, this will create a list of unique grid tiles.
*/
const getUniqueGridTiles = hours => {
  return [
    ...new Set(
      hours.filter(surveyHour => surveyHour.grid_tile).map(surveyHour => surveyHour.grid_tile)
    ),
  ];
};

export default getUniqueGridTiles;
