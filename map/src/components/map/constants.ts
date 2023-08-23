import { latLng, latLngBounds } from "leaflet";

const PADDING = 0.5;

export const DEFAULT_BOUNDS = latLngBounds(
  latLng(-47.3, 166.3),
  latLng(-39.5, 174.6),
);
export const MAX_BOUNDS = DEFAULT_BOUNDS.pad(PADDING);
export const FWF_BOUNDS = latLngBounds(
  latLng(-45.1, 167.0),
  latLng(-44.8, 167.94),
);
