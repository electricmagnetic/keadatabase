/**
 * Reusable types for Next page.tsx files
 */

export type Params = Record<string, string | string[] | undefined>;
export type PageParams = Promise<Params>;

export type SearchParams = Record<string, string | string[] | undefined>;
export type PageSearchParams = Promise<SearchParams>;

export interface PageWithParams {
  params: PageParams;
}
export interface PageWithSearchParams {
  searchParams: PageSearchParams;
}

export type PageWithParamsSearchParams = PageWithParams & PageWithSearchParams;
