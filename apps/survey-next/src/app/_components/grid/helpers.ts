import { point as turfPoint, booleanPointInPolygon } from "@turf/turf";
import tiles from "../../../../public/geo/tiles.json";
import type { GridTilesCollection, GridTileFeature } from "./types";

const gridTiles = tiles as GridTilesCollection;

export function getGridTileByCoordinates(
  lat: number,
  lng: number,
): GridTileFeature | undefined {
  const clickPoint = turfPoint([lng, lat]);

  return gridTiles.features.find((tile) =>
    booleanPointInPolygon(clickPoint, tile.geometry),
  );
}

export function getGridTileById(id: string): GridTileFeature | undefined {
  return gridTiles.features.find((tile) => tile.id === id);
}

export function getAllGridTiles(): GridTileFeature[] {
  return gridTiles.features;
}

export function getAllGridTileIds(): string[] {
  return gridTiles.features.map((tile) => tile.id);
}

export function searchGridTiles(query: string): string[] {
  const upperQuery = query.toUpperCase();
  return gridTiles.features
    .filter((tile) => tile.id.toUpperCase().includes(upperQuery))
    .map((tile) => tile.id)
    .slice(0, 50);
}
