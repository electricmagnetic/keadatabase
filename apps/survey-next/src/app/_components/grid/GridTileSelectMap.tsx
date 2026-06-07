"use client";

import { useEffect } from "react";
import { Source, Layer, Popup } from "react-map-gl/maplibre";
import type { MapLibreEvent } from "react-map-gl/maplibre";
import { ZoomToGeoJSON } from "geospatial/layers";
import type { FeatureCollection, Polygon } from "geojson";

import { BaseMap } from "./BaseMap";
import { getGridTileByCoordinates, getGridTileById } from "./helpers";
import type { GridTileId, GridTileProperties } from "./types";

interface GridTileSelectMapProps {
  selectedTiles: GridTileId[];
  onSelectionChange: (tiles: GridTileId[]) => void;
  maxTiles?: number;
}

export function GridTileSelectMap({
  selectedTiles,
  onSelectionChange,
  maxTiles = 15,
}: GridTileSelectMapProps) {
  const selectedTilesGeoJSON: FeatureCollection<
    Polygon,
    GridTileProperties
  > | null =
    selectedTiles.length > 0
      ? {
          type: "FeatureCollection",
          features: selectedTiles
            .map((tileId) => getGridTileById(tileId))
            .filter(
              (tile): tile is NonNullable<typeof tile> => tile !== undefined,
            ),
        }
      : null;

  const handleMapClick = (event: MapLibreEvent) => {
    const { lat, lng } = event.lngLat;
    const clickedTile = getGridTileByCoordinates(lat, lng);

    if (!clickedTile) return;

    const tileId = clickedTile.id;
    const isSelected = selectedTiles.includes(tileId);

    if (isSelected) {
      onSelectionChange(selectedTiles.filter((id) => id !== tileId));
    } else {
      if (selectedTiles.length < maxTiles) {
        onSelectionChange([...selectedTiles, tileId]);
      } else {
        console.warn(`Maximum of ${maxTiles} tiles can be selected`);
      }
    }
  };

  return (
    <BaseMap onClick={handleMapClick} showGridOverlay={true}>
      {selectedTilesGeoJSON && (
        <>
          <Source data={selectedTilesGeoJSON} type="geojson" id="selected-tiles">
            <Layer
              id="selected-tiles-fill"
              type="fill"
              paint={{
                "fill-color": "#df5206",
                "fill-opacity": 0.3,
              }}
            />

            <Layer
              id="selected-tiles-outline"
              type="line"
              paint={{
                "line-color": "#df5206",
                "line-width": 2,
                "line-opacity": 0.8,
              }}
            />

            <Layer
              id="selected-tiles-labels"
              type="symbol"
              layout={{
                "text-field": ["get", "id"],
                "text-size": 14,
                "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
              }}
              paint={{
                "text-color": "#333333",
                "text-halo-color": "#ffffff",
                "text-halo-width": 2,
              }}
            />
          </Source>

          <ZoomToGeoJSON geoJson={selectedTilesGeoJSON} />
        </>
      )}
    </BaseMap>
  );
}
