import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { stringify } from "qs";
import { LayersControl } from "react-leaflet";

import BaseMap from "components/map/BaseMap";
import ObservationsLayer, {
  LayerStatuses,
} from "components/map/ObservationsLayer";
import { BirdFilter } from "components/filters/BirdFilter";
import { Filters } from "components/filters/filters";
import {
  TitleControl,
  SetBoundsToLayers,
  LayersLoader,
} from "components/map/utilities";

export default function TrackMap() {
  const { query } = useRouter();
  const [filters, setFilters] = useState<Filters>({});
  const [apiQuery, setApiQuery] = useState("");
  const [layerStatuses, setLayerStatuses] = useState<LayerStatuses>({});

  // Convert filters into API query
  useEffect(() => {
    if (filters.birdId) {
      setApiQuery(
        stringify(Object.assign({}, { bird: filters.birdId }), {
          addQueryPrefix: true,
        })
      );
    }
  }, [filters]);

  // Convert page query into filter
  useEffect(() => {
    if (query.bird && typeof query.bird === "string")
      setFilters({ birdId: query.bird });
  }, [query]);

  return (
    <BaseMap>
      <TitleControl>
        <BirdFilter />
      </TitleControl>
      {filters.birdId && (
        <LayersControl position="topright" collapsed={false}>
          <LayersControl.Overlay name="Bird Observations" checked>
            <ObservationsLayer
              name="birdLayer"
              query={apiQuery}
              setLayerStatuses={setLayerStatuses}
              birdObservations
            />
          </LayersControl.Overlay>
        </LayersControl>
      )}
      <SetBoundsToLayers layerStatuses={layerStatuses} />
      <LayersLoader layerStatuses={layerStatuses} />
    </BaseMap>
  );
}
