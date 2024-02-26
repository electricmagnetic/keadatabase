import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { stringify } from "qs";
import { LayersControl, GeoJSON } from "react-leaflet";
import { FeatureCollection } from "geojson";

import BaseMap from "@/components/map/BaseMap";
import ObservationsLayer from "@/components/map/ObservationsLayer";
import { ZoneFilter } from "@/components/filters/ZoneFilter";
import { Filters } from "@/components/filters/filters";
import { SetBoundsToLayers, LayersLoader } from "@/components/map/utilities";
import Menu from "@/components/Menu";
import { ShowMenuContext } from "@/components/context";
import { LayerStatuses } from "@/components/map/types";

const keaZones: FeatureCollection = require("@/geo/kea-zones_2023-05-02.json");

export default function ZoneMap() {
  const showMenu = useContext(ShowMenuContext);

  const { query } = useRouter();
  const [filters, setFilters] = useState<Filters>({});
  const [apiQuery, setApiQuery] = useState("");
  const [layerStatuses, setLayerStatuses] = useState<LayerStatuses>({});

  // Convert filters into API query
  useEffect(() => {
    if (filters.zone) {
      const zoneGeometryString = JSON.stringify(filters.zone.geometry);
      if (zoneGeometryString)
        setApiQuery(
          stringify(Object.assign({}, { point_location: zoneGeometryString }), {
            addQueryPrefix: true,
          }),
        );
    }
  }, [filters]);

  // Convert page query into filter
  useEffect(() => {
    if (query.zone) {
      const zone = keaZones.features.filter(
        (keaZone) => keaZone.id === query.zone,
      )[0];

      if (zone) setFilters({ zone: zone });
    }
  }, [query]);

  return (
    <>
      {showMenu && (
        <Menu title="Observations by zone">
          <ZoneFilter />
        </Menu>
      )}
      <BaseMap>
        {filters.zone && (
          <LayersControl position="topright" collapsed={false}>
            <LayersControl.Overlay
              name={filters.zone.properties?.name || "Observations"}
              checked
            >
              <ObservationsLayer
                name="zonesLayer"
                query={apiQuery}
                setLayerStatuses={setLayerStatuses}
              />
            </LayersControl.Overlay>
            <LayersControl.Overlay name="Zone Boundary" checked>
              <GeoJSON
                data={filters.zone}
                key={filters.zone.id}
                style={{ fill: false, color: "#000000" }}
              />
            </LayersControl.Overlay>
          </LayersControl>
        )}
        <SetBoundsToLayers layerStatuses={layerStatuses} />
        <LayersLoader layerStatuses={layerStatuses} />
      </BaseMap>
    </>
  );
}
