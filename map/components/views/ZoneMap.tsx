import { useEffect, useState } from "react";
import { stringify } from "qs";
import { LayersControl } from "react-leaflet";

import BaseMap from "components/map/BaseMap";
import ObservationsLayer from "components/map/ObservationsLayer";
import { Loader } from "components/utilities";
import { ZoneFilter } from "components/filters/ZoneFilter";
import { Filters } from "components/filters/filters";
import { MapLoader, TitleControl } from "components/map/utilities";

export default function ZoneMap() {
  const [filters, setFilters] = useState<Filters>({});
  const [query, setQuery] = useState("");
  const [isValidating, setValidating] = useState(false);

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
            <ObservationsLayer query={query} setValidating={setValidating} />
          </LayersControl.Overlay>
        </LayersControl>
      )}
      {isValidating && <MapLoader />}
    </BaseMap>
  );
}
