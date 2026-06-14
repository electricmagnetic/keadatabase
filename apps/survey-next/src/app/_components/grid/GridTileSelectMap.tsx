"use client";

import { useEffect, useRef, useState } from "react";
import { Source, Layer, Marker } from "react-map-gl/maplibre";
import type { MapRef } from "react-map-gl/maplibre";
import type { MapLayerMouseEvent } from "maplibre-gl";
import type { FeatureCollection, Polygon } from "geojson";
import { bbox, centerOfMass } from "@turf/turf";

import { BaseMap } from "./BaseMap";
import { getGridTileByCoordinates, getGridTileById } from "./helpers";
import type { GridTileId, GridTileProperties } from "./types";
import { MapLayerToggle } from "../ui/MapLayerToggle";

interface GridTileSelectMapProps {
  selectedTiles: GridTileId[];
  onSelectionChange: (tiles: GridTileId[]) => void;
  maxTiles?: number;
  height?: string;
}

export function GridTileSelectMap({
  selectedTiles,
  onSelectionChange,
  maxTiles = 15,
  height = "500px",
}: GridTileSelectMapProps) {
  const mapRef = useRef<MapRef>(null);
  const [showGridOverlay, setShowGridOverlay] = useState(true);

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

  // auto-zoom to selected tiles or reset to initial view when cleared
  useEffect(() => {
    if (!mapRef.current) return;

    if (selectedTilesGeoJSON && selectedTiles.length > 0) {
      // zoom to selected tiles
      const bounds = bbox(selectedTilesGeoJSON);
      const [minLng, minLat, maxLng, maxLat] = bounds;

      mapRef.current.fitBounds(
        [
          [minLng, minLat],
          [maxLng, maxLat],
        ],
        {
          padding: 60,
          maxZoom: 11,
          duration: 1000,
        }
      );
    } else if (selectedTiles.length === 0) {
      // reset to initial view when all tiles are cleared
      mapRef.current.flyTo({
        center: [170.45, -43.9],
        zoom: 6,
        duration: 1000,
      });
    }
  }, [selectedTilesGeoJSON, selectedTiles.length]);

  const handleMapClick = (event: MapLayerMouseEvent) => {
    const { lat, lng } = event.lngLat;
    const clickedTile = getGridTileByCoordinates(lat, lng);

    if (!clickedTile) {
      return;
    }

    const tileId = clickedTile.id;
    const isSelected = selectedTiles.includes(tileId);

    if (isSelected) {
      const newTiles = selectedTiles.filter((id) => id !== tileId);
      onSelectionChange(newTiles);
    } else {
      if (selectedTiles.length < maxTiles) {
        const newTiles = [...selectedTiles, tileId];
        onSelectionChange(newTiles);
      }
    }
  };

  return (
    <div style={{ width: "100%", height, position: "relative" }}>
      <MapLayerToggle
        label="Grid Tiles"
        checked={showGridOverlay}
        onChange={setShowGridOverlay}
      />

      <BaseMap
        ref={mapRef}
        onClick={handleMapClick}
        showGridOverlay={showGridOverlay}
        navigationPosition="top-left"
        hideFullscreen
        cursor="pointer"
        interactiveLayerIds={["all-grid-tiles-layer"]}
      >
      {selectedTilesGeoJSON && (
        <>
          <Source data={selectedTilesGeoJSON} type="geojson" id="selected-tiles">
            <Layer
              id="selected-tiles-outline"
              type="line"
              paint={{
                "line-color": "#ff0000",
                "line-width": 3,
              }}
            />
          </Source>

          {/* Labels as Markers for each selected tile */}
          {selectedTilesGeoJSON.features.map((feature) => {
            const center = centerOfMass(feature);
            const [lng, lat] = center.geometry.coordinates;

            return (
              <Marker
                key={feature.id}
                longitude={lng}
                latitude={lat}
                anchor="center"
              >
                <div
                  style={{
                    backgroundColor: "#ffffff",
                    padding: "3px 6px",
                    borderRadius: "3px",
                    fontWeight: "normal",
                    fontSize: "12px",
                    fontFamily: "Arial, Helvetica, sans-serif",
                    color: "#000000",
                    whiteSpace: "nowrap",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
                    pointerEvents: "none",
                  }}
                >
                  {feature.id}
                </div>
              </Marker>
            );
          })}
        </>
      )}
      </BaseMap>
    </div>
  );
}
