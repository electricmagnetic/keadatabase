"use client";

import { forwardRef, type PropsWithChildren } from "react";
import {
  Map as MapLibreMap,
  type MapRef,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
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

const Map = forwardRef<
  MapRef,
  PropsWithChildren<
    MapLibreMapProps & {
      hideFullscreen?: boolean;
      hideNavigation?: boolean;
      navigationPosition?:
        | "top-left"
        | "top-right"
        | "bottom-left"
        | "bottom-right";
    }
  >
>(function Map(
  {
    children,
    hideFullscreen,
    hideNavigation,
    navigationPosition = "top-left",
    ...others
  },
  ref,
) {
  const mapProps = { ...DEFAULT_MAP_PROPS, ...others };

  return (
    <MapLibreMap
      ref={ref}
      style={{ width: "100%", height: "100%" }}
      {...mapProps}
    >
      {!hideFullscreen ? <FullscreenControl position="top-left" /> : null}
      {!hideNavigation ? (
        <NavigationControl position={navigationPosition} showCompass={false} />
      ) : null}
      <ScaleControl />
      {children}
    </MapLibreMap>
  );
});

export default Map;
