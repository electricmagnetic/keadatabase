import { useEffect, useState } from "react";
import useSWR from "swr";
import { Polyline } from "react-leaflet";
import { GeoJSON as LeafletGeoJSON, LatLngExpression } from "leaflet";

import { BaseResponse, LayerStatuses } from "./types";

const BIRD_OBSERVATIONS_URL = `${process.env.NEXT_PUBLIC_API_BASE}/geojson/bird_observations/`;
const BIRD_PATH_PROPERTIES = {
  color: "#000000",
  weight: 2,
  opacity: 0.7,
};

const BirdPathLayer = ({
  name,
  query,
  setLayerStatuses,
}: {
  name: string;
  query?: string;
  setLayerStatuses: React.Dispatch<React.SetStateAction<LayerStatuses>>;
}) => {
  const [birdPath, setBirdPath] = useState<LatLngExpression[] | null>(null);

  const url = `${BIRD_OBSERVATIONS_URL}${query ? query : ""}`;

  const { data, error, isValidating } = useSWR<BaseResponse>(url);

  // Update loading
  useEffect(() => {
    setLayerStatuses((prevState) => ({
      ...prevState,
      [name]: { ...prevState[name], isValidating: isValidating },
    }));
  }, [name, setLayerStatuses, isValidating]);

  // Update has data
  useEffect(() => {
    setLayerStatuses((prevState) => ({
      ...prevState,
      [name]: { ...prevState[name], hasData: !!data },
    }));
  }, [name, setLayerStatuses, data]);

  // Calculate bird line
  useEffect(() => {
    if (data?.features) {
      setBirdPath(
        data.features.map((feature) =>
          LeafletGeoJSON.coordsToLatLng(feature.geometry.coordinates),
        ),
      );
    }
  }, [name, setBirdPath, data]);

  if (isValidating) return null;
  else if (error) return <span>Error</span>;
  else if (data && birdPath) {
    return <Polyline positions={birdPath} {...BIRD_PATH_PROPERTIES} />;
  } else return null;
};

export default BirdPathLayer;
