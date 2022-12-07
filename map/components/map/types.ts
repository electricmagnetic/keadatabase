import { Feature, FeatureCollection, Polygon } from "geojson";

/**
 * Standard pattern for paginated API
 */
export interface BaseResponse extends FeatureCollection<any> {
  next?: string;
  previous?: string;
  count?: number;
}

/**
 * Data on each layer in the map (loading status, bounding box)
 */
export type LayerStatus = {
  isValidating?: boolean;
  hasData?: boolean;
  bboxPolygon?: Feature<Polygon>;
  key?: string;
};

export type LayerStatuses = {
  [name: string]: LayerStatus;
};
