"use client";

import { type PropsWithChildren } from "react";
import Map from "geospatial/map";
import { GeoJSONLayer, XYZRasterLayer } from "geospatial/layers";
import type { MapLibreEvent } from "react-map-gl/maplibre";

import tilesOutline from "../../../../public/geo/tilesOutline.json";
import type { GridOutlineCollection } from "./types";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
const LINZ_API_KEY = process.env.NEXT_PUBLIC_LINZ_API_KEY;

const MAPBOX_STYLE = `https://api.mapbox.com/styles/v1/mapbox/outdoors-v12/tiles/512/{z}/{x}/{y}@2x?access_token=${MAPBOX_TOKEN}`;

const LINZ_TOPO_50K = `https://tiles-{a-d}.data-cdn.linz.govt.nz/services;key=${LINZ_API_KEY}/tiles/v4/layer=50798/EPSG:3857/{z}/{x}/{y}.png`;
const LINZ_TOPO_250K = `https://tiles-{a-d}.data-cdn.linz.govt.nz/services;key=${LINZ_API_KEY}/tiles/v4/layer=50767/EPSG:3857/{z}/{x}/{y}.png`;

interface BaseMapProps {
  hideGridTiles?: boolean;
  onClick?: (event: MapLibreEvent) => void;
  showGridOverlay?: boolean;
}

export function BaseMap({
  children,
  hideGridTiles = false,
  onClick,
  showGridOverlay = false,
}: PropsWithChildren<BaseMapProps>) {
  return (
    <Map
      onClick={onClick}
      mapStyle={{
        version: 8,
        sources: {},
        layers: [],
      }}
      style={{
        width: "100%",
        height: "600px",
      }}
      minZoom={7}
      maxZoom={14}
    >
      <XYZRasterLayer url={MAPBOX_STYLE} attribution="Mapbox" tileSize={512} />

      <GeoJSONLayer
        geoJson={tilesOutline as GridOutlineCollection}
        layerProps={{
          type: "line",
          paint: {
            "line-color": "#333333",
            "line-width": 2,
            "line-opacity": 0.6,
          },
        }}
      />

      {children}
    </Map>
  );
}
