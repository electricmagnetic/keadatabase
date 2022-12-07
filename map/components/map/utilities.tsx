import { CSSProperties, FC, PropsWithChildren } from "react";
import { latLng, latLngBounds, LatLngBoundsExpression } from "leaflet";
import { useMap } from "react-leaflet";
import { featureCollection, bbox, BBox } from "@turf/turf";

import { Loader } from "components/utilities";
import { LayerStatuses } from "./types";

const controlStyle: CSSProperties = {
  backgroundColor: "#fff",
  padding: "0.5rem",
  fontSize: "1rem",
};

export const CustomControl: FC<PropsWithChildren<{ className: string }>> = ({
  className,
  children,
}) => (
  <div className={className}>
    <div className="leaflet-control leaflet-bar" style={controlStyle}>
      {children}
    </div>
  </div>
);

/**
 * Basic map loading component
 */
export const MapLoader: FC = () => (
  <CustomControl className="leaflet-bottom leaflet-left">
    <Loader />
  </CustomControl>
);

/**
 * Simple bounds setter (used as a child component of MapContainer)
 */
export const SetBounds: FC<{ bounds?: LatLngBoundsExpression }> = ({
  bounds,
}) => {
  const map = useMap();
  if (bounds) map.fitBounds(bounds);
  return null;
};

export const convertBboxToLeafletBounds = (inputBbox: BBox) => {
  return latLngBounds(
    latLng(inputBbox[1], inputBbox[0]),
    latLng(inputBbox[3], inputBbox[2])
  );
};

/**
 * Given a set of layer statuses, calculate the overall bounding box and then set the bounds (if valid)
 */
export const SetBoundsToLayers: FC<{ layerStatuses: LayerStatuses }> = ({
  layerStatuses,
}) => {
  const bboxPolygons = featureCollection(
    Object.entries(layerStatuses)
      .map(([key, value]) => value.bboxPolygon)
      .filter((bboxPolygon) => !!bboxPolygon)
      .map((bboxPolygon) => bboxPolygon!)
  ); // TODO improve weird TypeScript

  const layersBbox = bboxPolygons.features.length > 0 && bbox(bboxPolygons);
  const layersBboxIsValid =
    layersBbox && !layersBbox.some((coordinate) => coordinate === Infinity);

  const bounds = layersBboxIsValid
    ? convertBboxToLeafletBounds(layersBbox)
    : undefined;

  return <SetBounds bounds={bounds} />;
};

/**
 * Given a set of layer statuses, show a loader so long as at least one layer hasn't finished loading.
 */
export const LayersLoader: FC<{ layerStatuses: LayerStatuses }> = ({
  layerStatuses,
}) => {
  const loadedLayers = Object.entries(layerStatuses).filter(
    ([key, value]) => value.hasData === true
  ).length;
  const totalLayers = Object.entries(layerStatuses).length;

  return loadedLayers != totalLayers ? <MapLoader /> : null;
};
