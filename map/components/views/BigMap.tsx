import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { stringify } from "qs";
import { LayersControl } from "react-leaflet";

import BaseMap from "components/map/BaseMap";
import ObservationsLayer, {
  LayerStatuses,
} from "components/map/ObservationsLayer";
import { PageSizeFilter } from "components/filters/PageSizeFilter";
import { Filters } from "components/filters/filters";
import {
  TitleControl,
  SetBoundsToLayers,
  LayersLoader,
} from "components/map/utilities";

export default function BigMap() {
  const { query } = useRouter();
  const [filters, setFilters] = useState<Filters>({});
  const [apiQuery, setApiQuery] = useState("");
  const [layerStatuses, setLayerStatuses] = useState<LayerStatuses>({});

  // Convert filters into API query
  useEffect(() => {
    if (filters.pageSize) {
      setApiQuery(
        stringify(Object.assign({}, { page_size: filters.pageSize }), {
          addQueryPrefix: true,
        })
      );
    }
  }, [filters]);

  // Convert page query into filter
  useEffect(() => {
    if (query.pageSize && typeof query.pageSize === "string")
      setFilters({ pageSize: parseInt(query.pageSize, 10) });
  }, [query]);

  return (
    <BaseMap>
      <TitleControl>
        <PageSizeFilter />
      </TitleControl>
      {filters.pageSize && (
        <LayersControl position="topright" collapsed={false}>
          <LayersControl.Overlay name="Recent Observations" checked>
            <ObservationsLayer
              name="observationsLayer"
              query={apiQuery}
              setLayerStatuses={setLayerStatuses}
            />
          </LayersControl.Overlay>
        </LayersControl>
      )}
      <SetBoundsToLayers layerStatuses={layerStatuses} />
      <LayersLoader layerStatuses={layerStatuses} />
    </BaseMap>
  );
}
