import { feature, featureCollection } from "@turf/turf";
import { type Geometry } from "geojson";

/**
 * Function to transform a regular array of data (objects) into a GeoJSON feature collection.
 * @param idKey -- key for obtaining the ID
 * @param geometryKey -- key for obtaining the geometry
 * @param data -- dataset
 * @returns -- FeatureCollection
 */
export const generateGeoJson = (idKey: string, geometryKey: string, data: Record<string, unknown>[]) => {
  return featureCollection(data.map(datum => {
    const { [idKey]: id, [geometryKey]: geometry } = datum;

    if(!(typeof id === "string" || typeof id === "number")) throw new Error("Unexpected ID format");

    return feature(geometry as Geometry, datum, { id }); // TODO assertion
  }));
}