import { z } from "zod";

const DEFAULT_PAGE = 1;

export const validPage = (page: unknown) =>
  z.coerce.number().gte(1).catch(DEFAULT_PAGE).parse(page);
