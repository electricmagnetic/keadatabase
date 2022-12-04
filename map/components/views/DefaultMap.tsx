import { useContext, useState } from "react";
import { LayersControl } from "react-leaflet";

import BaseMap from "components/map/BaseMap";
import ObservationsLayer, {
  LayerStatuses,
} from "components/map/ObservationsLayer";
import { SetBoundsToLayers, LayersLoader } from "components/map/utilities";
import Menu from "components/Menu";
import { ShowMenuContext } from "components/context";

export default function DefaultMap() {
  const showMenu = useContext(ShowMenuContext);

  const [layerStatuses, setLayerStatuses] = useState<LayerStatuses>({});

  return (
    <>
      {showMenu && <Menu title="Recent Observations" />}
      <BaseMap>
        <LayersControl position="topright" collapsed={false}>
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
    </>
  );
}
