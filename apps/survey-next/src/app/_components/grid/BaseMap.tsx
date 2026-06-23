"use client";

import { forwardRef, type PropsWithChildren } from "react";
import Map from "geospatial/map";
import { GeoJSONLayer, XYZRasterLayer } from "geospatial/layers";
import type { MapRef } from "react-map-gl/maplibre";

import tilesOutline from "../../../../public/geo/tilesOutline.json";
import tiles from "../../../../public/geo/tiles.json";
import type { GridOutlineCollection, GridTilesCollection } from "./types";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
const LINZ_API_KEY = process.env.NEXT_PUBLIC_LINZ_API_KEY;

const MAPBOX_STYLE = `https://api.mapbox.com/styles/v1/mapbox/outdoors-v9/tiles/256/{z}/{x}/{y}?access_token=${MAPBOX_TOKEN}`;

const LINZ_TOPO_50K = `https://tiles-{a-d}.data-cdn.linz.govt.nz/services;key=${LINZ_API_KEY}/tiles/v4/layer=50798/EPSG:3857/{z}/{x}/{y}.png`;
const LINZ_TOPO_250K = `https://tiles-{a-d}.data-cdn.linz.govt.nz/services;key=${LINZ_API_KEY}/tiles/v4/layer=50767/EPSG:3857/{z}/{x}/{y}.png`;
const GRID_TILES_OVERLAY = `https://geo.keadatabase.nz/grid/layer/{z}/{x}/{y}.png`;

type MapProps = React.ComponentProps<typeof Map>;

interface BaseMapProps extends Omit<MapProps, "children"> {
  hideGridTiles?: boolean;
  showGridOverlay?: boolean;
  navigationPosition?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  hideFullscreen?: boolean;
}

export const BaseMap = forwardRef<MapRef, PropsWithChildren<BaseMapProps>>(function BaseMap({
  children,
  hideGridTiles = false,
  showGridOverlay = true,
  ...mapProps
}, ref) {
  return (
    <Map
      ref={ref}
      mapStyle={{
        version: 8,
        sources: {},
        layers: [],
      }}
      style={{
        width: "100%",
        height: "100%",
      }}
      initialViewState={{
        longitude: 170.45,
        latitude: -43.9,
        zoom: 6,
      }}
      minZoom={5}
      maxZoom={14}
      {...mapProps}
      hideFullscreen
    >
      <XYZRasterLayer
        sourceId="basemap-raster"
        layerId="basemap-raster-layer"
        url={MAPBOX_STYLE}
        attribution="Mapbox"
        tileSize={256}
      />

      <XYZRasterLayer
        sourceId="linz-topo-50k"
        layerId="linz-topo-50k-layer"
        url={LINZ_TOPO_50K}
      />

      <XYZRasterLayer
        sourceId="linz-topo-250k"
        layerId="linz-topo-250k-layer"
        url={LINZ_TOPO_250K}
        attribution="LINZ, licensed for reuse (CC BY 4.0)."
      />

      {!hideGridTiles && (
        <XYZRasterLayer
          sourceId="grid-tiles-overlay"
          layerId="grid-tiles-overlay-layer"
          url={GRID_TILES_OVERLAY}
        />
      )}

      {/* All individual grid tiles */}
      {showGridOverlay && (
        <GeoJSONLayer
          sourceId="all-grid-tiles"
          layerId="all-grid-tiles-layer"
          geoJson={tiles as GridTilesCollection}
          layerProps={{
            type: "line",
            paint: {
              "line-color": "#222222",
              "line-width": 2,
              "line-opacity": 0.6,
            },
          }}
        />
      )}

      {/* Grid outline - the South Island boundary */}
      {!hideGridTiles && (
        <GeoJSONLayer
          sourceId="grid-tiles-outline"
          layerId="grid-tiles-outline-layer"
          geoJson={tilesOutline as GridOutlineCollection}
          layerProps={{
            type: "line",
            paint: {
              "line-color": "#000000",
              "line-width": 1,
              "line-opacity": 1,
              "line-dasharray": [3, 3],
            },
          }}
        />
      )}

      {children}
    </Map>
  );
});
