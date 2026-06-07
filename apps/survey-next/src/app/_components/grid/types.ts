import type { Feature, FeatureCollection, Polygon, MultiPolygon, Point } from "geojson";

export interface GridTileProperties {
  get_large_image: string;
  get_small_image: string;
  min: Point;
  max: Point;
  centroid: Point;
  neighbours: string[];
}

export interface GridTileFeature extends Feature<Polygon> {
  id: string;
  properties: GridTileProperties;
}

export interface GridTilesCollection extends FeatureCollection<Polygon, GridTileProperties> {
  count: number;
  next: string | null;
  previous: string | null;
  features: GridTileFeature[];
}

export interface GridOutlineCollection extends FeatureCollection<MultiPolygon> {
  name: string;
  crs?: {
    type: string;
    properties: {
      name: string;
    };
  };
}

export type GridTileId = string;

export type SelectedGridTiles = GridTileId[];
