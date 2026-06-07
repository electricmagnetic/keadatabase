"use client";

import { useMemo } from "react";
import { Source, Layer } from "react-map-gl/maplibre";
import { ZoomToGeoJSON } from "geospatial/layers";
import type { FeatureCollection, Polygon } from "geojson";

import { BaseMap } from "./BaseMap";
import { getGridTileById } from "./helpers";
import type { GridTileId, GridTileProperties } from "./types";

interface SelectedGridTilesMapProps {
  gridTileIds: GridTileId[];
  height?: string;
}

export function SelectedGridTilesMap({
  gridTileIds,
  height = "400px",
}: SelectedGridTilesMapProps) {
  const selectedTilesGeoJSON = useMemo<FeatureCollection<
    Polygon,
    GridTileProperties
  > | null>(() => {
    if (!gridTileIds || gridTileIds.length === 0) {
      return null;
    }

    const features = gridTileIds
      .map((tileId) => getGridTileById(tileId))
      .filter((tile): tile is NonNullable<typeof tile> => tile !== undefined);

    return {
      type: "FeatureCollection",
      features,
    };
  }, [gridTileIds]);

  return (
    <div style={{ height, width: "100%", position: "relative" }}>
      <BaseMap
        initialViewState={{
          longitude: 170.0,
          latitude: -43.5,
          zoom: 5,
        }}
        interactive={false}
      >
        {selectedTilesGeoJSON && (
          <>
            <ZoomToGeoJSON
              geoJSON={selectedTilesGeoJSON}
              options={{ padding: 40, maxZoom: 11 }}
            />

            <Source id="selected-tiles" type="geojson" data={selectedTilesGeoJSON}>
              <Layer
                id="selected-tiles-fill"
                type="fill"
                paint={{
                  "fill-color": "#df5206",
                  "fill-opacity": 0.3,
                }}
              />

              <Layer
                id="selected-tiles-border"
                type="line"
                paint={{
                  "line-color": "#df5206",
                  "line-width": 2,
                }}
              />

              <Layer
                id="selected-tiles-labels"
                type="symbol"
                layout={{
                  "text-field": ["get", "id"],
                  "text-size": 12,
                  "text-anchor": "center",
                }}
                paint={{
                  "text-color": "#000000",
                  "text-halo-color": "#ffffff",
                  "text-halo-width": 1,
                }}
              />
            </Source>
          </>
        )}
      </BaseMap>
    </div>
  );
}
