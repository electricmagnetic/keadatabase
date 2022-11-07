import { useEffect, useState } from "react";
import { stringify } from "qs";
import { LayersControl } from "react-leaflet";

import BaseMap from "components/map/BaseMap";
import ObservationsLayer, {
  LayerStatuses,
} from "components/map/ObservationsLayer";
import { ZoneFilter } from "components/filters/ZoneFilter";
import { Filters } from "components/filters/filters";
import { MapLoader, TitleControl } from "components/map/utilities";

export default function ZoneMap() {
  const [filters, setFilters] = useState<Filters>({});
  const [query, setQuery] = useState("");
  const [layerStatuses, setLayerStatuses] = useState<LayerStatuses>({});

  const loadedLayers = Object.entries(layerStatuses).filter(
    ([key, value]) => value.hasData === true
  ).length; // TODO abstract, de-duplicate and simplify
  const totalLayers = Object.entries(layerStatuses).length;

  useEffect(() => {
    if (filters.zone) {
      const zoneGeometryString = JSON.stringify(filters.zone.geometry);
      if (zoneGeometryString)
        setQuery(
          stringify(Object.assign({}, { point_location: zoneGeometryString }), {
            addQueryPrefix: true,
          })
        );
    }
  }, [filters]);

  return (
    <BaseMap>
      <TitleControl>
        <ZoneFilter filters={filters} setFilters={setFilters} />
      </TitleControl>
      {filters.zone && (
        <LayersControl position="topright" collapsed={false}>
          <LayersControl.Overlay
            name={filters.zone.properties?.name || "Observations"}
            checked
          >
            <ObservationsLayer
              name="zones"
              query={query}
              setLayerStatuses={setLayerStatuses}
            />
          </LayersControl.Overlay>
        </LayersControl>
      )}
      {loadedLayers != totalLayers && <MapLoader />}
    </BaseMap>
  );
}
