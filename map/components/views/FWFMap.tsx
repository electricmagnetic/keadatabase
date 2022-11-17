import { useState } from "react";
import { LayersControl, GeoJSON } from "react-leaflet";
import { Feature, FeatureCollection, Point } from "geojson";
import { Layer } from "leaflet";

import BaseMap from "components/map/BaseMap";
import ObservationsLayer, {
  LayerStatuses,
} from "components/map/ObservationsLayer";
import {
  TitleControl,
  SetBoundsToLayers,
  LayersLoader,
} from "components/map/utilities";

const fwfBlocks: FeatureCollection = require("public/geo/fwf-blocks_2022-10-31.json");

export default function FWFMap() {
  const [layerStatuses, setLayerStatuses] = useState<LayerStatuses>({});

  const blockOnEachFeature = (feature: Feature<Point>, layer: Layer) => {
    layer.bindTooltip(
      `
      ${feature?.properties?.HuntBlockN || "Unknown"}
    `,
      { direction: "center" }
    );
  };

  return (
    <BaseMap>
      <LayersControl position="topright" collapsed={false}>
        <TitleControl>
          <h1>FWF Observations</h1>
        </TitleControl>
        <LayersControl.Overlay name={"FWF Observations"} checked>
          <ObservationsLayer
            name="publicLayer"
            query={`?status=fwf`}
            setLayerStatuses={setLayerStatuses}
          />
        </LayersControl.Overlay>
        <LayersControl.Overlay name={"FWF Blocks"} checked>
          <GeoJSON
            data={fwfBlocks}
            style={{
              color: "#222222",
              weight: 2,
              opacity: 0.6,
              fillOpacity: 0,
            }}
            onEachFeature={blockOnEachFeature}
          />
        </LayersControl.Overlay>
      </LayersControl>
      <SetBoundsToLayers layerStatuses={layerStatuses} />
      <LayersLoader layerStatuses={layerStatuses} />
    </BaseMap>
  );
}
