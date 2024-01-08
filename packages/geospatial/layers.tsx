"use client";

import { bbox as TurfBbox } from "@turf/turf";
import { type GeoJSON } from "geojson";
import { useEffect, useState } from "react";
import { Source, Layer, useMap, type LayerProps } from "react-map-gl/maplibre";

const PADDING = 100;
const DURATION = 500;

export const PointLayerProps: LayerProps = {
  type: "circle",
  paint: { "circle-color": "rgba(223, 82, 7, 0.2)", "circle-stroke-color": "rgba(223, 82, 7, 1)", "circle-stroke-width": 2 },
};

export function GeoJSONLayer({
  geoJsonString,
  layerProps = PointLayerProps,
  zoomToLayer = false,
}: {
  geoJsonString: string;
  layerProps?: LayerProps;
  zoomToLayer?: boolean;
}) {
  return (
    <>
      <Source data={JSON.parse(geoJsonString) as GeoJSON} type="geojson">
        <Layer {...layerProps} />
      </Source>
      {zoomToLayer ? <ZoomToGeoJSON geoJsonString={geoJsonString} /> : null}
    </>
  );
}

export function ZoomToGeoJSON({
  geoJsonString,
}: {
  geoJsonString: string | null;
}) {
  const { current: map } = useMap();

  const [loaded, setLoaded] = useState(false);

  // add timeout to improve reliability of zooming to GeoJSON (after map has loaded)
  useEffect(() => {
    const waiting = () => {
      if (!map?.isStyleLoaded()) {
        setTimeout(waiting, 200);
      } else {
        setLoaded(true);
      }
    };
    waiting();
  }, [map]);

  useEffect(() => {
    const zoomMap = () => {
      if (!map || !geoJsonString) return;

      const geoJson = JSON.parse(geoJsonString) as GeoJSON; // TODO assertion, maybe should check this
      const bbox = TurfBbox(geoJson);

      if (bbox.some((coordinate) => coordinate === Infinity)) return; // checks that bounds are valid

      const [minLng, minLat, maxLng, maxLat] = bbox;

      map.fitBounds(
        [
          [minLng, minLat],
          [maxLng, maxLat],
        ],
        { padding: PADDING, duration: DURATION },
      );
    };

    if (loaded && geoJsonString) {
      zoomMap();
    }
  }, [geoJsonString, map, loaded]);

  return null;
}

export function XYZRasterLayer({
  attribution = "",
  tileSize = 512,
  url,
}: {
  attribution?: string;
  tileSize?: number;
  url: string;
}) {
  return (
    <Source
      attribution={attribution}
      tileSize={tileSize}
      tiles={[url]}
      type="raster"
    >
      <Layer type="raster" />
    </Source>
  );
}

export function RasterLayer({
  maxzoom,
  url,
}: {
  maxzoom?: number;
  url: string;
}) {
  return (
    <Source maxzoom={maxzoom} type="raster" url={url}>
      <Layer type="raster" />
    </Source>
  );
}

export function VectorLayer({
  url,
}: {
  url: string;
}) {
  return (
    <Source
      type="vector"
      url={url}
    >
      {/* <Layer  /> */}
    </Source>
  );
}