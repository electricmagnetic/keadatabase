"use server";

import fetcher from "shared/api/fetcher";
import { getApiUrl } from "@/app/_components/api/url";

import { SurveyApiListResponseSchema, SurveySchema, SurveyHourApiListResponseSchema, SurveyAnalysisSchema } from "./schema";

// surveys also arrive from the mobile app, so these lists must never be served
// from a build-time snapshot — always hit the backend
const FRESH: RequestInit = { cache: "no-store" };

export const getSurveys = async () =>
  await fetcher(
    getApiUrl("/surveys/surveys/?page_size=50"),
    SurveyApiListResponseSchema,
    FRESH,
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
    FRESH,
  );

export const getSurveyAnalysis = async (id: number) =>
  await fetcher(
    getApiUrl(`/analysis/surveys/${id}/`),
    SurveyAnalysisSchema,
  );
