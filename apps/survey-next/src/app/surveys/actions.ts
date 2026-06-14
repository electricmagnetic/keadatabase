"use server";

import fetcher from "shared/api/fetcher";
import { getApiUrl } from "@/app/_components/api/url";

import { SurveyApiListResponseSchema, SurveySchema, SurveyHourApiListResponseSchema, SurveyAnalysisSchema } from "./schema";

export const getSurveys = async () =>
  await fetcher(
    getApiUrl("/surveys/surveys/?page_size=50"),
    SurveyApiListResponseSchema,
  );

export const getSurvey = async (id: number) =>
  await fetcher(
    getApiUrl(`/surveys/surveys/${id}/`),
    SurveySchema,
  );

export const getSurveyHours = async () =>
  await fetcher(
    getApiUrl("/surveys/hours/?page_size=120"),
    SurveyHourApiListResponseSchema,
  );

export const getSurveyAnalysis = async (id: number) =>
  await fetcher(
    getApiUrl(`/analysis/surveys/${id}/`),
    SurveyAnalysisSchema,
  );
