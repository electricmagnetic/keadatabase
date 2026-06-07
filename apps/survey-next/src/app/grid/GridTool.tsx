"use client";

import { useState } from "react";
import { GridTileSelectMap } from "../_components/grid/GridTileSelectMap";
import { GridTileTypeahead } from "../_components/grid/GridTileTypeahead";
import { GridTileCard } from "../_components/grid/GridTileCard";
import type { GridTileId } from "../_components/grid/types";

/**
 * Interactive grid tile tool
 *
 * Provides:
 * - Interactive map for tile selection
 * - Typeahead search
 * - List of selected tiles
 * - Print functionality
 */
export function GridTool() {
  const [selectedTiles, setSelectedTiles] = useState<GridTileId[]>([]);

  const handleRemoveTile = (tileId: GridTileId) => {
    setSelectedTiles(selectedTiles.filter((id) => id !== tileId));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      {selectedTiles.length > 0 && (
        <h2>
          <small>Grid Tiles, Kea Survey Tool</small>
          <br />
          {selectedTiles.join(" ")}
        </h2>
      )}

      <div className="submit__grid">
        <div className="submit__map">
          <GridTileSelectMap
            selectedTiles={selectedTiles}
            onSelectionChange={setSelectedTiles}
          />
        </div>

        <div className="submit__tiles submit__tiles--offset">
          <div className="bg-light p-3">
            <div className="d-print-none mb-3">
              <label htmlFor="gridTileSearch">Select grid tiles to view</label>
              <GridTileTypeahead
                selectedTiles={selectedTiles}
                onSelectionChange={setSelectedTiles}
                autoFocus
              />
            </div>

            <div className="result">
              {selectedTiles.length > 0 ? (
                selectedTiles.map((tileId) => (
                  <GridTileCard
                    key={tileId}
                    id={tileId}
                    hideImage
                    addLink
                    onRemove={handleRemoveTile}
                  />
                ))
              ) : (
                <div>No grid tiles selected</div>
              )}
            </div>

            {selectedTiles.length > 0 && (
              <div className="submit__print">
                <button
                  type="button"
                  className="btn btn--primary"
                  onClick={handlePrint}
                >
                  <i className="fas fa-print me-2"></i>
                  Print
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
