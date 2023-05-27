import { point, polygon, booleanPointInPolygon } from '@turf/turf';

import tiles from '../../assets/geo/tiles.json';

/**
 * Returns a GridTile if one exists for a given latitude/longitude
 */
export const getGridTile = (latitude, longitude) => {
  const coordinates = point([longitude, latitude]);

  return tiles.features.reduce(
    (accumulator, tile) =>
      booleanPointInPolygon(coordinates, polygon(tile.geometry.coordinates)) ? tile : accumulator,
    null
  );
};
