"use client";

import { useRef, type PropsWithChildren } from "react";
import {
  Map as MapLibreMap,
  type MapRef,
  MapProvider,
  NavigationControl,
  FullscreenControl,
} from "react-map-gl/maplibre";

import "maplibre-gl/dist/maplibre-gl.css";

import { MAP_INITIAL_VIEW, NZ_BOUNDS_BUFFERED } from "./constants";

type MapLibreMapProps = React.ComponentProps<typeof MapLibreMap>;

const DEFAULT_MAP_PROPS = {
  initialViewState: MAP_INITIAL_VIEW,
  maxBounds: NZ_BOUNDS_BUFFERED,
  maxZoom: 20,
  minZoom: 1,
  reuseMaps: true,
} as MapLibreMapProps;

export default function Map({
  children,
  hideFullscreen,
  hideNavigation,
  ...others
}: PropsWithChildren<MapLibreMapProps & { hideFullscreen?: boolean, hideNavigation?: boolean }>) {
  const mapRef = useRef<MapRef>(null);

  const mapProps = { ...DEFAULT_MAP_PROPS, ...others };

  return (
    <MapProvider>
      <MapLibreMap
        ref={mapRef}
        style={{ width: "100%", height: "100%" }}
        {...mapProps}
      >
        {!hideFullscreen ? <FullscreenControl /> : null}
        {!hideNavigation ? <NavigationControl /> : null}
        {children}
      </MapLibreMap>
    </MapProvider>
  );
}
