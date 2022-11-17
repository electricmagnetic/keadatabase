import { useState } from "react";
import { LayersControl, GeoJSON } from "react-leaflet";
import { FeatureCollection } from "geojson";

import BaseMap from "components/map/BaseMap";
import ObservationsLayer, {
  LayerStatuses,
} from "components/map/ObservationsLayer";
import {
  TitleControl,
  MapLoader,
  SetBoundsToLayers,
} from "components/map/utilities";

const fwfBlocks: FeatureCollection = require("public/geo/fwf-blocks_2022-10-31.json");

export default function FWFMap() {
  const [layerStatuses, setLayerStatuses] = useState<LayerStatuses>({});
  const loadedLayers = Object.entries(layerStatuses).filter(
    ([key, value]) => value.hasData === true
  ).length; // TODO abstract, de-duplicate and simplify
  const totalLayers = Object.entries(layerStatuses).length;

  return (
    <BaseMap>
      <LayersControl position="topright" collapsed={false}>
        <TitleControl>
          <h1>FWF Observations</h1>
          <span>
            Loaded {loadedLayers} of {totalLayers}
          </span>
        </TitleControl>
        <LayersControl.Overlay name={"FWF Observations"} checked>
          <ObservationsLayer
            name="publicLayer"
            query={`?status=fwf`}
            setLayerStatuses={setLayerStatuses}
          />
        </LayersControl.Overlay>
        <LayersControl.Overlay name={"FWF Blocks"} checked>
          <GeoJSON data={fwfBlocks} />
        </LayersControl.Overlay>
      </LayersControl>
      <SetBoundsToLayers layerStatuses={layerStatuses} />
      {loadedLayers != totalLayers && <MapLoader />}
    </BaseMap>
  );
}
