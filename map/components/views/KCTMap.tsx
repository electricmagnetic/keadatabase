import { useContext, useState } from "react";
import { LayersControl } from "react-leaflet";
import { FeatureCollection } from "geojson";

import BaseMap from "components/map/BaseMap";
import ObservationsLayer from "components/map/ObservationsLayer";
import {
  SetBoundsToLayers,
  LayersLoader,
  convertBboxToLeafletBounds,
} from "components/map/utilities";
import { bbox } from "@turf/turf";
import Menu from "components/Menu";
import { ShowMenuContext } from "components/context";
import { LayerStatuses } from "components/map/types";

const fwfBlocks: FeatureCollection = require("public/geo/fwf-blocks_2022-10-31.json");
const fwfBlocksBbox = bbox(fwfBlocks);

export default function FWFMap() {
  const showMenu = useContext(ShowMenuContext);

  const [layerStatuses, setLayerStatuses] = useState<LayerStatuses>({});

  return (
    <>
      {showMenu && <Menu title="KCT Observations" />}
      <BaseMap bounds={convertBboxToLeafletBounds(fwfBlocksBbox)}>
        <LayersControl position="topright" collapsed={false}>
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
