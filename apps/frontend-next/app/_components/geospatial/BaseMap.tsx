"use client";

import { type PropsWithChildren } from "react";
import Map from "geospatial/map";

type MapProps = React.ComponentProps<typeof Map>;

export default function BaseMap({
  children,
  ...others
}: PropsWithChildren<MapProps>) {
  return (
    <Map
      mapStyle={process.env.NEXT_PUBLIC_BASEMAP_MAP_STYLE}
      maxZoom={17}
      {...others}
    >
      {children}
    </Map>
  );
}
