"use server";

import fetcher from "shared/api/fetcher";

import { SurveyApiListResponseSchema, SurveySchema } from "./schema";

export const getSurveys = async () =>
  await fetcher(
    `${process.env.NEXT_PUBLIC_API_PATH}/surveys/surveys/`,
    SurveyApiListResponseSchema,
  );

export const getSurvey = async (id: number) =>
  await fetcher(
    `${process.env.NEXT_PUBLIC_API_PATH}/surveys/surveys/${id}`,
    SurveySchema,
  );
