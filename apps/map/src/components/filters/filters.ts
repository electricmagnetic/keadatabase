import { Feature } from "geojson";
import { Dispatch, SetStateAction } from "react";

export interface Filters {
  [name: string]: any; // catch-all for misc filters
  zone?: Feature;
  birdId?: string;
  pageSize?: number;
}

export type SetFilters<T> = Dispatch<SetStateAction<T>>;
