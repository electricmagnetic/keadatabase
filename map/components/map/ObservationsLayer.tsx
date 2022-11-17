import React, { Dispatch, FC, SetStateAction, useEffect } from "react";
import useSWR from "swr";
import { GeoJSON } from "react-leaflet";
import { Feature, FeatureCollection, Point, Polygon } from "geojson";
import { LatLng, Layer, CircleMarker, CircleMarkerOptions } from "leaflet";
import { bbox, featureCollection, bboxPolygon } from "@turf/turf";

import "leaflet/dist/leaflet.css";

const defaultPointMarkerOptions = {
  color: "#000",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8,
  filColor: "#df5206",
};

interface BaseResponse extends FeatureCollection<any> {
  next?: string;
  previous?: string;
  count?: number;
} // TODO make more specific

export type LayerStatus = {
  isValidating?: boolean;
  hasData?: boolean;
  bboxPolygon?: Feature<Polygon>;
  key?: string;
};

export type LayerStatuses = {
  [name: string]: LayerStatus;
};

const observationPointToLayer = (feature: Feature<Point>, latlng: LatLng) => {
  var pointMarkerOptions: CircleMarkerOptions = defaultPointMarkerOptions;

  // Color based on status
  switch (feature.properties?.status) {
    case "fwf":
      pointMarkerOptions.fillColor = "#df9306";
      break;
    case "new":
      pointMarkerOptions.fillColor = "#ffffff";
      break;
    case "radio":
      pointMarkerOptions.fillColor = "#00ff00";
      break;
  }

  // Radius based on number
  if (feature.properties?.number > 10) pointMarkerOptions.radius = 10;
  else if (feature.properties?.number > 5 && feature.properties?.number <= 10)
    pointMarkerOptions.radius = 7;
  else pointMarkerOptions.radius = 5;

  return new CircleMarker(latlng, pointMarkerOptions);
};

const observationOnEachFeature = (feature: any, layer: Layer) => {
  layer.bindPopup(`
    <a href="https://keadatabase.nz/observations/${feature.id}" rel="noopener noreferrer" target="_blank">
      <strong>${feature.id}</strong>: ${feature.properties.get_sighting_type_display} ${feature.properties.number} on ${feature.properties.date_sighted}
    </a>
  `);
};

const OBSERVATIONS_URL = `${process.env.NEXT_PUBLIC_API_BASE}/geojson/observations/`;

const ObservationsLayer: FC<{
  name: string;
  query?: string;
  setLayerStatuses: Dispatch<SetStateAction<LayerStatuses>>;
}> = ({ name, query, setLayerStatuses }) => {
  const url = query ? `${OBSERVATIONS_URL}${query}` : OBSERVATIONS_URL;

  const { data, error, isValidating } = useSWR<BaseResponse>(url);

  // Update loading
  useEffect(() => {
    setLayerStatuses((prevState) => ({
      ...prevState,
      [name]: { ...prevState[name], isValidating: isValidating },
    }));
  }, [name, setLayerStatuses, isValidating]);

  // Update has data
  useEffect(() => {
    setLayerStatuses((prevState) => ({
      ...prevState,
      [name]: { ...prevState[name], hasData: !!data },
    }));
  }, [name, setLayerStatuses, data]);

  // Create a polygon representing the bounding box
  useEffect(() => {
    if (data?.features) {
      const featuresBboxPolygon = bboxPolygon(
        bbox(featureCollection(data.features))
      );

      setLayerStatuses((prevState) => ({
        ...prevState,
        [name]: { ...prevState[name], bboxPolygon: featuresBboxPolygon },
      }));
    }
  }, [name, setLayerStatuses, data]);

  if (isValidating) return null;
  else if (error) return <span>Error</span>;
  else if (data) {
    return (
      <GeoJSON
        data={data}
        key={url}
        pointToLayer={observationPointToLayer}
        onEachFeature={observationOnEachFeature}
        attribution="Data: KSP, KCT"
      />
    );
  } else return null;
};

export default ObservationsLayer;
