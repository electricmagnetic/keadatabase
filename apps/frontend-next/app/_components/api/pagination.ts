const DEFAULT_PAGE = 1;

export const validPage = (page: number | string | null | undefined) =>
  Number(page) >= 1 ? Number(page) : DEFAULT_PAGE;
