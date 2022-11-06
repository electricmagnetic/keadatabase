import { Dispatch, SetStateAction } from "react";

export interface Filters {
  [name: string]: any;
}

export type SetFilters<T> = Dispatch<SetStateAction<T>>;
