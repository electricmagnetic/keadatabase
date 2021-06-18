import { latLng, latLngBounds } from 'leaflet';

/**
  Default map bounds for South Island.
 */
export const DEFAULT_BOUNDS = latLngBounds(latLng(-47.3, 166.3), latLng(-40.5, 174.6)).pad(0.5);

/**
  Default zoom level, approximate for New Zealand based on typical map sizes.
 */
export const DEFAULT_ZOOM = 6;

/**
  Zoom level once point specified.
 */
export const POINT_ZOOM = 14.5;
