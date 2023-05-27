import { useContext, useState } from "react";
import { LayersControl, GeoJSON } from "react-leaflet";
import { Feature, FeatureCollection, Point } from "geojson";
import { Layer } from "leaflet";

import BaseMap from "@/components/map/BaseMap";
import ObservationsLayer from "@/components/map/ObservationsLayer";
import {
  SetBoundsToLayers,
  LayersLoader,
  convertBboxToLeafletBounds,
} from "@/components/map/utilities";
import { bbox } from "@turf/turf";
import Menu from "@/components/Menu";
import { ShowMenuContext } from "@/components/context";
import { LayerStatuses } from "@/components/map/types";

const fwfBlocks: FeatureCollection = require("public/geo/fwf-blocks_2022-10-31.json");
const fwfBlocksBbox = bbox(fwfBlocks);

export default function FWFMap() {
  const showMenu = useContext(ShowMenuContext);

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
    <>
      {showMenu && <Menu title="FWF Observations" />}
      <BaseMap bounds={convertBboxToLeafletBounds(fwfBlocksBbox)}>
        <LayersControl position="topright" collapsed={false}>
          <LayersControl.Overlay name={"FWF Observations"} checked>
            <ObservationsLayer
              name="fwfLayer"
              query={`?status=fwf`}
              setLayerStatuses={setLayerStatuses}
              fwfObservations
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
    </>
  );
}
