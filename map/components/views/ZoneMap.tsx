import { useEffect, useState } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import { useRouter } from 'next/router';
import { stringify } from "qs";
import { LayersControl } from "react-leaflet";

import { Loader } from "components/utilities";
import { ZoneFilter } from "components/filters/ZoneFilter";
import { Filters } from "components/filters/filters";

import keaZones from 'static/kea-zones_2022-10-31.json';

const BaseMap = dynamic(() => import("components/map/BaseMap"), {
  ssr: false,
  loading: () => <Loader />,
});

const ObservationsLayer = dynamic(() => import("components/map/ObservationsLayer"), {
  ssr: false,
  loading: () => <Loader />,
});

export default function ZonesPage() {
  const router = useRouter();
  //const { zone } = router.query;
  //const foo = (typeof zone === 'string') ? zone : '';
  const [filters, setFilters] = useState<Filters>({});
  const [query, setQuery] = useState('');

  useEffect(() => {
    router.push({query: filters})
  }, [filters])

  useEffect(() => {
    if(filters.zone) {
      const zoneFeature = keaZones.features.filter(keaZone => keaZone.id === filters.zone)[0];
      const zoneGeometryString = JSON.stringify(zoneFeature?.geometry)

      if(zoneGeometryString) setQuery(stringify(Object.assign({}, { point_location: zoneGeometryString }), { addQueryPrefix: true }));
    }
  }, [filters]);


  return (
    <>
      <ZoneFilter filters={filters} setFilters={setFilters} />

      <span>Map:</span>
      <div style={{height: "640px"}}>
        <BaseMap>
          <LayersControl position="topright" collapsed={false}>
            <LayersControl.Overlay name="Observations" checked>
              <ObservationsLayer query={query} />
            </LayersControl.Overlay>
          </LayersControl>
        </BaseMap>
      </div>
    </>
  );
}
