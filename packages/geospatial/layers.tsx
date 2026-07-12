"use client";

import { bbox as TurfBbox } from "@turf/turf";
import { type GeoJSON } from "geojson";
import { useEffect, useState } from "react";
import { Source, Layer, useMap, type LayerProps } from "react-map-gl/maplibre";

const PADDING = 150;
const DURATION = 500;

export const PointLayerProps: LayerProps = {
  type: "circle",
  paint: {
    "circle-color": "rgba(223, 82, 7, 0.2)",
    "circle-stroke-color": "rgba(223, 82, 7, 1)",
    "circle-stroke-width": 2,
  },
};

export function GeoJSONLayer({
  geoJson,
  layerProps = PointLayerProps,
  zoomToLayer = false,
  sourceId,
  layerId,
}: {
  geoJson: GeoJSON;
  layerProps?: LayerProps;
  zoomToLayer?: boolean;
  sourceId: string;
  layerId?: string;
}) {
  const actualLayerId = layerId || `${sourceId}-layer`;

  return (
    <>
      <Source id={sourceId} data={geoJson} type="geojson">
        <Layer id={actualLayerId} {...layerProps} />
      </Source>
      {zoomToLayer ? <ZoomToGeoJSON geoJson={geoJson} /> : null}
    </>
  );
}

export function ZoomToGeoJSON({
  geoJson,
  options = {},
}: {
  geoJson: GeoJSON | null;
  options?: {
    padding?: number;
    duration?: number;
    maxZoom?: number;
  };
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
      if (!map || !geoJson) return;

      const bbox = TurfBbox(geoJson);

      if (bbox.some((coordinate) => coordinate === Infinity)) return; // checks that bounds are valid

      const [minLng, minLat, maxLng, maxLat] = bbox;

      map.fitBounds(
        [
          [minLng, minLat],
          [maxLng, maxLat],
        ],
        {
          padding: options.padding ?? PADDING,
          duration: options.duration ?? DURATION,
          maxZoom: options.maxZoom,
        },
      );
    };

    if (loaded && geoJson) {
      zoomMap();
    }
  }, [geoJson, map, loaded, options]);

  return null;
}

export function XYZRasterLayer({
  attribution = "",
  tileSize = 512,
  urls,
  sourceId,
  layerId,
  minzoom,
  maxzoom,
}: {
  attribution?: string;
  tileSize?: number;
  urls: string[];
  sourceId: string;
  layerId?: string;
  minzoom?: number;
  maxzoom?: number;
}) {
  const actualLayerId = layerId || `${sourceId}-layer`;

  return (
    <Source
      id={sourceId}
      attribution={attribution}
      tileSize={tileSize}
      tiles={urls}
      minzoom={minzoom}
      maxzoom={maxzoom}
      type="raster"
    >
      <Layer id={actualLayerId} type="raster" />
    </Source>
  );
}

export function RasterLayer({
  maxzoom,
  url,
  sourceId,
  layerId,
}: {
  maxzoom?: number;
  url: string;
  sourceId: string;
  layerId?: string;
}) {
  const actualLayerId = layerId || `${sourceId}-layer`;

  return (
    <Source id={sourceId} maxzoom={maxzoom} type="raster" url={url}>
      <Layer id={actualLayerId} type="raster" />
    </Source>
  );
}

export function VectorLayer({
  url,
  sourceId,
}: {
  url: string;
  sourceId: string;
}) {
  return (
    <Source id={sourceId} type="vector" url={url}>
      {/* <Layer  /> */}
    </Source>
  );
}
