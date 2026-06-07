"use client";

import { useState, useMemo } from "react";
import { Source, Layer, Popup } from "react-map-gl/maplibre";
import Link from "next/link";
import type { FeatureCollection, Polygon, Feature } from "geojson";

import { BaseMap } from "../_components/grid/BaseMap";
import { getGridTileById } from "../_components/grid/helpers";
import type { GridTileProperties } from "../_components/grid/types";
import { getAnalysisTileStyle } from "./styling";
import type { GridTileAnalysis } from "./schema";

interface GridTileAnalysesMapProps {
  analyses: GridTileAnalysis[];
}

// Extend GridTileProperties to include analysis data
interface AnalysisFeatureProperties extends GridTileProperties {
  analysis_id: string;
  fill_color: string;
  fill_opacity: number;
  line_color: string;
}

/**
 * Map component displaying grid tile analyses
 *
 * Features:
 * - Color-coded tiles based on survey data
 * - Orange tiles: surveyed with kea (darker = higher kea ratio)
 * - Grey tiles: surveyed without kea (darker = >10 hours)
 * - Popups showing statistics on click
 */
export function GridTileAnalysesMap({ analyses }: GridTileAnalysesMapProps) {
  console.log("=== MAP COMPONENT CLIENT DEBUG ===");
  console.log("analyses received:", analyses);
  console.log("analyses length:", analyses?.length);
  console.log("first analysis:", analyses?.[0]);

  const [selectedAnalysis, setSelectedAnalysis] =
    useState<GridTileAnalysis | null>(null);

  // Create GeoJSON with embedded style properties
  const analysesGeoJSON = useMemo<FeatureCollection<
    Polygon,
    AnalysisFeatureProperties
  > | null>(() => {
    console.log("useMemo: creating GeoJSON from", analyses?.length, "analyses");

    if (!analyses || !Array.isArray(analyses) || analyses.length === 0) {
      console.log("useMemo: no valid analyses, returning null");
      return null;
    }

    const features: Feature<Polygon, AnalysisFeatureProperties>[] = [];
    let tilesNotFound = 0;

    for (const analysis of analyses) {
      if (!analysis || !analysis.id) {
        console.log("useMemo: skipping invalid analysis:", analysis);
        continue;
      }

      const tile = getGridTileById(analysis.id);
      if (!tile) {
        tilesNotFound++;
        continue;
      }

      const style = getAnalysisTileStyle(analysis);

      // Create feature with embedded style properties
      features.push({
        ...tile,
        properties: {
          ...tile.properties,
          analysis_id: analysis.id,
          fill_color: style.fillColor,
          fill_opacity: style.fillOpacity,
          line_color: style.lineColor,
        },
      });
    }

    console.log("useMemo: created", features.length, "features");
    console.log("useMemo: tiles not found:", tilesNotFound);

    if (features.length === 0) {
      console.log("useMemo: no features created, returning null");
      return null;
    }

    const geojson = {
      type: "FeatureCollection" as const,
      features,
    };
    console.log(
      "useMemo: returning GeoJSON with",
      geojson.features.length,
      "features",
    );
    return geojson;
  }, [analyses]);

  console.log("analysesGeoJSON:", analysesGeoJSON);
  console.log("analysesGeoJSON type:", analysesGeoJSON?.type);
  console.log(
    "analysesGeoJSON features count:",
    analysesGeoJSON?.features?.length,
  );

  // Don't render anything if no valid data
  if (!analysesGeoJSON) {
    console.log("No GeoJSON to render - showing 'No analysis data'");
    return (
      <BaseMap hideGridTiles>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "white",
            padding: "20px",
            borderRadius: "4px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          No analysis data to display
        </div>
      </BaseMap>
    );
  }

  console.log("About to render BaseMap with Source component");
  console.log("Source data:", analysesGeoJSON);

  return (
    <BaseMap hideGridTiles>
      <Source type="geojson" data={analysesGeoJSON} id="analysis-tiles">
        {/* Fill layer - use pre-computed colors from properties */}
        <Layer
          id="analysis-tiles-fill"
          type="fill"
          paint={{
            "fill-color": ["get", "fill_color"],
            "fill-opacity": ["get", "fill_opacity"],
          }}
        />

        {/* Outline layer - use pre-computed colors from properties */}
        <Layer
          id="analysis-tiles-outline"
          type="line"
          paint={{
            "line-color": ["get", "line_color"],
            "line-width": 1,
            "line-opacity": 0.6,
          }}
        />
      </Source>

      {/* Popup for selected tile */}
      {selectedAnalysis &&
        (() => {
          const tile = getGridTileById(selectedAnalysis.id);
          if (!tile) return null;

          const [lng, lat] = tile.properties.centroid.coordinates;

          return (
            <Popup
              longitude={lng}
              latitude={lat}
              onClose={() => setSelectedAnalysis(null)}
              closeButton={true}
              closeOnClick={false}
            >
              <div style={{ padding: "8px" }}>
                <h3 style={{ margin: "0 0 8px 0" }}>{selectedAnalysis.id}</h3>
                <dl style={{ margin: 0, fontSize: "14px" }}>
                  <dt style={{ fontWeight: "bold" }}>Total hours:</dt>
                  <dd style={{ margin: "0 0 4px 0" }}>
                    {selectedAnalysis.hours_total.total}
                  </dd>
                  <dt style={{ fontWeight: "bold" }}>Hours with kea:</dt>
                  <dd style={{ margin: "0 0 8px 0" }}>
                    {selectedAnalysis.hours_total.with_kea}
                  </dd>
                </dl>
                <Link
                  href={`/grid/${selectedAnalysis.id}`}
                  style={{ fontSize: "14px" }}
                >
                  View tile details →
                </Link>
              </div>
            </Popup>
          );
        })()}
    </BaseMap>
  );
}
