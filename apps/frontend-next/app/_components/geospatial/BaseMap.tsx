"use client";

import { type PropsWithChildren } from "react";
import Map from "geospatial/map";

export default function BaseMap({ children }: PropsWithChildren) {
  return (
    <Map mapStyle={process.env.NEXT_PUBLIC_BASEMAP_MAP_STYLE}>{children}</Map>
  );
}
