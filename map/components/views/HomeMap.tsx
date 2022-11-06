import { useState } from "react";
import { LayersControl } from "react-leaflet";

import BaseMap from "components/map/BaseMap";
import ObservationsLayer from "components/map/ObservationsLayer";
import { TitleControl, MapLoader } from "components/map/utilities";

export default function HomeMap() {
  const [isValidating, setValidating] = useState(false);

  return (
    <BaseMap>
      <LayersControl position="topright" collapsed={false}>
        <TitleControl>
          <h1>Recent Observations</h1>
        </TitleControl>
        <LayersControl.Overlay name={"Public Observations"} checked>
          <ObservationsLayer
            query={`?status=public`}
            setValidating={setValidating}
          />
        </LayersControl.Overlay>
        <LayersControl.Overlay name={"New Observations"} checked>
          <ObservationsLayer
            query={`?status=new`}
            setValidating={setValidating}
          />
        </LayersControl.Overlay>
        <LayersControl.Overlay name={"Radio Observations"} checked>
          <ObservationsLayer
            query={`?status=radio`}
            setValidating={setValidating}
          />
        </LayersControl.Overlay>
      </LayersControl>
      {isValidating && <MapLoader />}
    </BaseMap>
  );
}
