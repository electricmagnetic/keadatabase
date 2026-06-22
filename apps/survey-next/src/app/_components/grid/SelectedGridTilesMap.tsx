"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Source, Layer, Marker } from "react-map-gl/maplibre";
import { ZoomToGeoJSON } from "geospatial/layers";
import { centerOfMass } from "@turf/turf";
import type { FeatureCollection, Polygon } from "geojson";

import { BaseMap } from "./BaseMap";
import { MapLayerToggle } from "../ui/MapLayerToggle";
import { getGridTileById, getNeighbours } from "./helpers";
import type { GridTileId, GridTileProperties } from "./types";

interface SelectedGridTilesMapProps {
  gridTileIds: GridTileId[];
  height?: string;
  showNeighbours?: boolean;
}

export function SelectedGridTilesMap({
  gridTileIds,
  height = "600px",
  showNeighbours = false,
}: SelectedGridTilesMapProps) {
  const [showGridOverlay, setShowGridOverlay] = useState(true);

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

  const neighbourTilesGeoJSON = useMemo<FeatureCollection<
    Polygon,
    GridTileProperties
  > | null>(() => {
    if (!showNeighbours || !gridTileIds || gridTileIds.length === 0) {
      return null;
    }

    const neighbourIds = getNeighbours(gridTileIds);
    const features = neighbourIds
      .map((tileId) => getGridTileById(tileId))
      .filter((tile): tile is NonNullable<typeof tile> => tile !== undefined);

    return {
      type: "FeatureCollection",
      features,
    };
  }, [gridTileIds, showNeighbours]);

  return (
    <div style={{ height, width: "100%", position: "relative" }}>
      <MapLayerToggle
        label="Grid Tiles"
        checked={showGridOverlay}
        onChange={setShowGridOverlay}
      />

      <BaseMap
        initialViewState={{
          longitude: 170.0,
          latitude: -43.5,
          zoom: 5,
        }}
        showGridOverlay={showGridOverlay}
        interactive={false}
      >
        {selectedTilesGeoJSON && (
          <>
            <ZoomToGeoJSON
              geoJson={selectedTilesGeoJSON}
              options={{ padding: 40, maxZoom: 10 }}
            />

            {neighbourTilesGeoJSON && (
              <>
                <Source
                  id="neighbour-tiles"
                  type="geojson"
                  data={neighbourTilesGeoJSON}
                >
                  <Layer
                    id="neighbour-tiles-fill"
                    type="fill"
                    paint={{
                      "fill-color": "#000000",
                      "fill-opacity": 0.1,
                    }}
                  />

                  <Layer
                    id="neighbour-tiles-border"
                    type="line"
                    paint={{
                      "line-color": "#000000",
                      "line-width": 1,
                    }}
                  />
                </Source>

                {/* Neighbour tile labels as Markers */}
                {neighbourTilesGeoJSON.features.map((feature) => {
                  const center = centerOfMass(feature);
                  const [lng, lat] = center.geometry.coordinates;

                  return (
                    <Marker
                      key={`neighbour-${feature.id}`}
                      longitude={lng}
                      latitude={lat}
                      anchor="center"
                    >
                      <Link
                        href={`/grid/${feature.id}`}
                        style={{
                          backgroundColor: "#ffffff",
                          padding: "2px 5px",
                          borderRadius: "2px",
                          fontWeight: "normal",
                          fontStyle: "italic",
                          fontSize: "9px",
                          fontFamily: "Arial, Helvetica, sans-serif",
                          color: "#df5206",
                          whiteSpace: "nowrap",
                          boxShadow: "0 1px 2px rgba(0,0,0,0.2)",
                          textDecoration: "none",
                          display: "inline-block",
                          cursor: "pointer",
                        }}
                      >
                        {feature.id}
                      </Link>
                    </Marker>
                  );
                })}
              </>
            )}

            <Source
              id="selected-tiles"
              type="geojson"
              data={selectedTilesGeoJSON}
            >
              <Layer
                id="selected-tiles-fill"
                type="fill"
                paint={{
                  "fill-color": "#000000",
                  "fill-opacity": 0.3,
                }}
              />

              <Layer
                id="selected-tiles-border"
                type="line"
                paint={{
                  "line-color": "#000000",
                  "line-width": 3,
                }}
              />
            </Source>

            {/* Selected tile labels as Markers */}
            {selectedTilesGeoJSON.features.map((feature) => {
              const center = centerOfMass(feature);
              const [lng, lat] = center.geometry.coordinates;

              return (
                <Marker
                  key={`selected-${feature.id}`}
                  longitude={lng}
                  latitude={lat}
                  anchor="center"
                >
                  <div
                    style={{
                      backgroundColor: "#ffffff",
                      padding: "3px 6px",
                      borderRadius: "3px",
                      fontWeight: "bold",
                      fontSize: "11px",
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
