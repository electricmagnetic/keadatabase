import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { stringify } from "qs";
import { LayersControl, GeoJSON } from "react-leaflet";
import { FeatureCollection } from "geojson";

import BaseMap from "components/map/BaseMap";
import ObservationsLayer, {
  LayerStatuses,
} from "components/map/ObservationsLayer";
import { ZoneFilter } from "components/filters/ZoneFilter";
import { Filters } from "components/filters/filters";
import {
  MapLoader,
  TitleControl,
  SetBoundsToLayers,
} from "components/map/utilities";

const keaZones: FeatureCollection = require("public/geo/kea-zones_2022-10-31.json");

export default function ZoneMap() {
  const { query } = useRouter();
  const [filters, setFilters] = useState<Filters>({});
  const [apiQuery, setApiQuery] = useState("");
  const [layerStatuses, setLayerStatuses] = useState<LayerStatuses>({});

  const loadedLayers = Object.entries(layerStatuses).filter(
    ([key, value]) => value.hasData === true
  ).length; // TODO abstract, de-duplicate and simplify
  const totalLayers = Object.entries(layerStatuses).length;

  // Convert filters into API query
  useEffect(() => {
    if (filters.zone) {
      const zoneGeometryString = JSON.stringify(filters.zone.geometry);
      if (zoneGeometryString)
        setApiQuery(
          stringify(Object.assign({}, { point_location: zoneGeometryString }), {
            addQueryPrefix: true,
          })
        );
    }
  }, [filters]);

  // Convert page query into filter
  useEffect(() => {
    if (query.zone) {
      const zone = keaZones.features.filter(
        (keaZone) => keaZone.id === query.zone
      )[0];

      if (zone) setFilters({ zone: zone });
    }
  }, [query]);

  return (
    <BaseMap>
      <TitleControl>
        <ZoneFilter />
      </TitleControl>
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
      {loadedLayers != totalLayers && <MapLoader />}
    </BaseMap>
  );
}
