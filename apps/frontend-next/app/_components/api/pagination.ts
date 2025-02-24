import { z } from "zod";

const SMALLEST_PAGE = 1;
const DEFAULT_PAGE = 1;

export const validPage = (page: unknown) =>
  z.coerce.number().gte(SMALLEST_PAGE).catch(DEFAULT_PAGE).parse(page);
