import { useEffect, useState } from "react";
import { LayersControl } from "react-leaflet";

import BaseMap from "components/map/BaseMap";
import ObservationsLayer, {
  LayerStatuses,
} from "components/map/ObservationsLayer";
import { TitleControl, MapLoader } from "components/map/utilities";

export default function HomeMap() {
  const [layerStatuses, setLayerStatuses] = useState<LayerStatuses>({});
  const loadedLayers = Object.entries(layerStatuses).filter(
    ([key, value]) => value.hasData === true
  ).length; // TODO abstract, de-duplicate and simplify
  const totalLayers = Object.entries(layerStatuses).length;

  return (
    <BaseMap>
      <LayersControl position="topright" collapsed={false}>
        <TitleControl>
          <h1>Recent Observations</h1>
          <span>
            Loaded {loadedLayers} of {totalLayers}
          </span>
        </TitleControl>
        <LayersControl.Overlay name={"Public Observations"} checked>
          <ObservationsLayer
            name="public"
            query={`?status=public`}
            setLayerStatuses={setLayerStatuses}
          />
        </LayersControl.Overlay>
        <LayersControl.Overlay name={"New Observations"} checked>
          <ObservationsLayer
            name="new"
            query={`?status=new`}
            setLayerStatuses={setLayerStatuses}
          />
        </LayersControl.Overlay>
        <LayersControl.Overlay name={"Radio Observations"} checked>
          <ObservationsLayer
            name="radio"
            query={`?status=radio`}
            setLayerStatuses={setLayerStatuses}
          />
        </LayersControl.Overlay>
      </LayersControl>
      {loadedLayers != totalLayers && <MapLoader />}
    </BaseMap>
  );
}
