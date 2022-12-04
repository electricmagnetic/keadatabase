import { useState } from "react";
import { LayersControl } from "react-leaflet";

import BaseMap from "components/map/BaseMap";
import ObservationsLayer, {
  LayerStatuses,
} from "components/map/ObservationsLayer";
import {
  TitleControl,
  SetBoundsToLayers,
  LayersLoader,
} from "components/map/utilities";

export default function DefaultMap() {
  const [layerStatuses, setLayerStatuses] = useState<LayerStatuses>({});

  return (
    <BaseMap>
      <LayersControl position="topright" collapsed={false}>
        <TitleControl>
          <h1>Recent Observations</h1>
        </TitleControl>
        <LayersControl.Overlay name={"Public Observations"} checked>
          <ObservationsLayer
            name="publicLayer"
            query={`?status=public`}
            setLayerStatuses={setLayerStatuses}
          />
        </LayersControl.Overlay>
        <LayersControl.Overlay name={"New Observations"} checked>
          <ObservationsLayer
            name="newLayer"
            query={`?status=new`}
            setLayerStatuses={setLayerStatuses}
          />
        </LayersControl.Overlay>
        <LayersControl.Overlay name={"Radio Observations"} checked>
          <ObservationsLayer
            name="radioLayer"
            query={`?status=radio`}
            setLayerStatuses={setLayerStatuses}
          />
        </LayersControl.Overlay>
        <LayersControl.Overlay name={"KCT Observations"} checked>
          <ObservationsLayer
            name="kctLayer"
            query={`?status=kct`}
            setLayerStatuses={setLayerStatuses}
          />
        </LayersControl.Overlay>
      </LayersControl>
      <SetBoundsToLayers layerStatuses={layerStatuses} />
      <LayersLoader layerStatuses={layerStatuses} />
    </BaseMap>
  );
}
