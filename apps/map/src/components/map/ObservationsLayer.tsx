import React, { Dispatch, FC, SetStateAction, useEffect } from "react";
import useSWR from "swr";
import { GeoJSON } from "react-leaflet";
import { Feature, Point } from "geojson";
import { LatLng, Layer, CircleMarker, CircleMarkerOptions } from "leaflet";
import { bbox, featureCollection, bboxPolygon } from "@turf/turf";

import { BaseResponse, LayerStatuses } from "./types";

const DEFAULT_MARKER_OPTIONS = {
  color: "#000",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8,
};

const observationPointToLayer = (feature: Feature<Point>, latlng: LatLng) => {
  var pointMarkerOptions: CircleMarkerOptions = DEFAULT_MARKER_OPTIONS;

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
    default:
      pointMarkerOptions.fillColor = "#df5206";
  }

  // Radius based on number
  if (feature.properties?.number > 10) pointMarkerOptions.radius = 10;
  else if (feature.properties?.number > 5 && feature.properties?.number <= 10)
    pointMarkerOptions.radius = 7;
  else pointMarkerOptions.radius = 5;

  return new CircleMarker(latlng, pointMarkerOptions);
};

const OBSERVATIONS_URL = `${process.env.NEXT_PUBLIC_API_BASE}/geojson/observations/`;
const BIRD_OBSERVATIONS_URL = `${process.env.NEXT_PUBLIC_API_BASE}/geojson/bird_observations/`;

const ObservationsLayer: FC<{
  name: string;
  query?: string;
  setLayerStatuses: Dispatch<SetStateAction<LayerStatuses>>;
  birdObservations?: boolean;
  fwfObservations?: boolean;
}> = ({
  name,
  query,
  setLayerStatuses,
  birdObservations = false,
  fwfObservations = false,
}) => {
  const url = `${birdObservations ? BIRD_OBSERVATIONS_URL : OBSERVATIONS_URL}${
    query ? query : ""
  }`;

  const { data, error, isValidating } = useSWR<BaseResponse>(url);

  // Create popup based on data type (FWF, Bird Observation or Observation)
  const createPopup = (feature: any, layer: Layer) => {
    if (fwfObservations) {
      // TODO replace with 'periods' data
      layer.bindPopup(`
        <a href="https://keadatabase.nz/observations/${feature.id}" rel="noopener noreferrer" target="_blank">
          <strong>FWF ${feature.id}</strong>: ${feature.properties.get_sighting_type_display} ${feature.properties.number} on ${feature.properties.date_sighted}
        </a>
      `);
      return;
    }
    if (birdObservations) {
      layer.bindPopup(`
      <a href="https://keadatabase.nz/observations/${feature.properties.sighting.id}" rel="noopener noreferrer" target="_blank">
        <strong>${feature.properties.sighting.date_sighted}</strong> (#${feature.properties.sighting.id})
      </a>
    `);
      return;
    }
    layer.bindPopup(`
      <a href="https://keadatabase.nz/observations/${feature.id}" rel="noopener noreferrer" target="_blank">
        <strong>${feature.id}</strong>: ${feature.properties.get_sighting_type_display} ${feature.properties.number} on ${feature.properties.date_sighted}
      </a>
    `);
  };

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
        bbox(featureCollection(data.features)),
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
        onEachFeature={createPopup}
        attribution="Data: KSP, KCT"
      />
    );
  } else return null;
};

export default ObservationsLayer;
