import { FC, PropsWithChildren, useContext } from "react";
import { LatLngBounds } from "leaflet";
import { MapContainer, TileLayer } from "react-leaflet";

import { ShowMenuContext } from "@/components/context";
import { DEFAULT_BOUNDS, MAX_BOUNDS } from "./constants";

import "leaflet/dist/leaflet.css";

const BaseMap: FC<PropsWithChildren<{ bounds?: LatLngBounds }>> = ({
  bounds,
  children,
}) => {
  const showMenu = useContext(ShowMenuContext);

  return (
    <div className={["Map", showMenu && "has-menu"].join(" ")}>
      <MapContainer
        minZoom={6}
        maxZoom={16}
        bounds={bounds ? bounds : DEFAULT_BOUNDS}
        maxBounds={MAX_BOUNDS}
        style={{ height: "100%", width: "100%" }}
      >
        {children}
        <TileLayer
          attribution="Mapbox"
          maxZoom={14}
          url={`https://api.mapbox.com/styles/v1/mapbox/outdoors-v9/tiles/256/{z}/{x}/{y}?access_token=${process.env.NEXT_PUBLIC_MAPBOX_API_KEY}`}
        />
        <TileLayer
          url={`https://tiles-{s}.data-cdn.linz.govt.nz/services;key=${process.env.NEXT_PUBLIC_LINZ_API_KEY}/tiles/v4/layer=50798/EPSG:3857/{z}/{x}/{y}.png`}
          minZoom={10}
          maxZoom={12}
          subdomains={"abcd"}
        />
        <TileLayer
          url={`https://tiles-{s}.data-cdn.linz.govt.nz/services;key=${process.env.NEXT_PUBLIC_LINZ_API_KEY}/tiles/v4/layer=50767/EPSG:3857/{z}/{x}/{y}.png`}
          attribution="LINZ, licensed for reuse (CC BY 4.0)"
          minZoom={12}
          subdomains={"abcd"}
        />
      </MapContainer>
    </div>
  );
};

export default BaseMap;
