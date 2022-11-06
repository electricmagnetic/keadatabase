import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { stringify } from "qs";
import { LayersControl } from "react-leaflet";

import { Loader } from "components/utilities";
import { ZoneFilter } from "components/filters/ZoneFilter";
import { Filters } from "components/filters/filters";

const BaseMap = dynamic(() => import("components/map/BaseMap"), {
  ssr: false,
  loading: () => <Loader />,
});

const ObservationsLayer = dynamic(
  () => import("components/map/ObservationsLayer"),
  {
    ssr: false,
    loading: () => <Loader />,
  }
);

export default function ZonesPage() {
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
    <>
      <ZoneFilter filters={filters} setFilters={setFilters} />
      <dl>
        <dt>Zone:</dt>
        <dd>{filters.zone?.id}</dd>
        <dt>Loading:</dt>
        <dd>{isValidating ? <Loader /> : "No"}</dd>
      </dl>

      <span>Map:</span>
      <div style={{ height: "640px" }}>
        <BaseMap>
          <LayersControl position="topright" collapsed={false}>
            {filters.zone && (
              <LayersControl.Overlay
                name={filters.zone.properties?.name || "Observations"}
                checked
              >
                <ObservationsLayer
                  query={query}
                  setValidating={setValidating}
                />
              </LayersControl.Overlay>
            )}
          </LayersControl>
        </BaseMap>
      </div>
    </>
  );
}
