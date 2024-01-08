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

import { MAP_INITIAL_VIEW } from "./constants";

type MapStyle = React.ComponentProps<typeof MapLibreMap>["mapStyle"];

export default function Map({ mapStyle, children }: PropsWithChildren<{ mapStyle?: MapStyle}>) {
  const mapRef = useRef<MapRef>(null);

  return (
    <MapProvider>
      <MapLibreMap
        initialViewState={MAP_INITIAL_VIEW}
        mapStyle={mapStyle}
        maxZoom={20}
        minZoom={1}
        ref={mapRef}
        reuseMaps
        style={{ width: "100%", height: "100%" }}
      >
        <FullscreenControl />
        <NavigationControl />
        {children}
      </MapLibreMap>
    </MapProvider>
  );
}
