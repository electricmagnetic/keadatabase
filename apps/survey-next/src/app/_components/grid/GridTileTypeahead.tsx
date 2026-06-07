"use client";

import { useState, useEffect } from "react";
import { searchGridTiles } from "./helpers";
import type { GridTileId } from "./types";

interface GridTileTypeaheadProps {
  selectedTiles: GridTileId[];
  onSelectionChange: (tiles: GridTileId[]) => void;
  maxTiles?: number;
  placeholder?: string;
  autoFocus?: boolean;
}

export function GridTileTypeahead({
  selectedTiles,
  onSelectionChange,
  maxTiles = 15,
  placeholder = "Search grid tiles (e.g., BQ48-NE)...",
  autoFocus = false,
}: GridTileTypeaheadProps) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (query.trim().length > 0) {
      const results = searchGridTiles(query);
      const filteredResults = results.filter(
        (id) => !selectedTiles.includes(id),
      );
      setSuggestions(filteredResults);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query, selectedTiles]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSelectTile = (tileId: string) => {
    if (selectedTiles.length < maxTiles) {
      onSelectionChange([...selectedTiles, tileId]);
      setQuery("");
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && suggestions.length === 1) {
      e.preventDefault();
      handleSelectTile(suggestions[0]);
    }
  };

  return (
    <div className="grid-tile-typeahead" style={{ position: "relative" }}>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        autoFocus={autoFocus}
        disabled={selectedTiles.length >= maxTiles}
        className="form__control"
        autoComplete="off"
      />

      {showSuggestions && suggestions.length > 0 && (
        <div
          className="typeahead-suggestions"
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            maxHeight: "300px",
            overflowY: "auto",
            backgroundColor: "white",
            border: "1px solid #ccc",
            borderTop: "none",
            zIndex: 1000,
          }}
        >
          {suggestions.map((tileId) => (
            <button
              key={tileId}
              type="button"
              onClick={() => handleSelectTile(tileId)}
              className="typeahead-suggestion-item"
              style={{
                display: "block",
                width: "100%",
                padding: "8px 12px",
                border: "none",
                backgroundColor: "transparent",
                textAlign: "left",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#f0f0f0";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              {tileId}
            </button>
          ))}
        </div>
      )}

      {selectedTiles.length >= maxTiles && (
        <small className="text-muted">
          Maximum of {maxTiles} tiles selected
        </small>
      )}
    </div>
  );
}
