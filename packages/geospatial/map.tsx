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

export default function Map({ children }: PropsWithChildren) {
  const mapRef = useRef<MapRef>(null);

  return (
    <MapProvider>
      <MapLibreMap
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
