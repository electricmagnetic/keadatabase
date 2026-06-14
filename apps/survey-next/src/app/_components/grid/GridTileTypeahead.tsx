"use client";

import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";

import tiles from "../../../../public/geo/tiles.json";
import type { GridTileId, GridTilesCollection } from "./types";

interface GridTileTypeaheadProps {
  selectedTiles: GridTileId[];
  onSelectionChange: (tiles: GridTileId[]) => void;
  onBlur?: () => void;
  maxTiles?: number;
  placeholder?: string;
  options?: string[]; // optional: limit to specific tiles
}

export function GridTileTypeahead({
  selectedTiles,
  onSelectionChange,
  onBlur,
  maxTiles = 15,
  placeholder = "Grid ID (XXXX-XX)",
  options,
}: GridTileTypeaheadProps) {
  const tilesData = tiles as GridTilesCollection;
  const allTileIds = tilesData.features.map((feature) => feature.id);
  const availableOptions = options || allTileIds;
  const isFull = selectedTiles.length >= maxTiles;

  return (
    <div
      className={`grid-tile-typeahead${isFull ? " grid-tile-typeahead--full" : ""}`}
    >
      <Typeahead
        id="grid-tile-typeahead"
        multiple
        options={availableOptions}
        selected={selectedTiles}
        onChange={(selected) => {
          if (selected.length <= maxTiles) {
            onSelectionChange(selected as GridTileId[]);
          }
        }}
        onBlur={onBlur}
        placeholder={placeholder}
        minLength={options ? 0 : 3}
        maxResults={options ? 15 : 8}
        paginate={!options}
        highlightOnlyResult
        // when full: hide the menu and make the text input read-only/non-focusable
        // so it appears disabled, but keep the control enabled so the selected
        // token's clear (×) button stays clickable
        open={isFull ? false : undefined}
        inputProps={isFull ? { readOnly: true, tabIndex: -1 } : undefined}
        renderMenuItemChildren={(option) => {
          const tileId = option as string;
          const tile = tilesData.features.find((f) => f.id === tileId);

          if (!tile) return <div>{tileId}</div>;

          return (
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <img
                src={tile.properties.get_small_image}
                alt={`Tile ${tileId}`}
                style={{
                  width: "50px",
                  height: "50px",
                  objectFit: "cover",
                  borderRadius: "4px",
                }}
              />
              <span>{tileId}</span>
            </div>
          );
        }}
      />
    </div>
  );
}
