"use server";

import { z } from "zod";
import type { SurveySubmissionPayload } from "./schema";
import { getApiUrl } from "@/app/_components/api/url";

/**
 * Schema for field options from API OPTIONS request
 */
const FieldOptionsSchema = z.object({
  actions: z.object({
    POST: z.record(z.string(), z.any()), // field options structure varies
  }),
});

/**
 * Schema for survey submission response
 */
const SurveySubmissionResponseSchema = z.object({
  id: z.number(),
});

/**
 * Get field options from the API (activity choices, etc.)
 *
 * Makes an OPTIONS request to get form field metadata
 */
export async function getFieldOptions() {
  const url = getApiUrl("/report/survey/");

  const response = await fetch(url, { method: "OPTIONS" });

  if (!response.ok) {
    return {
      success: false,
      status: response.status,
      errorType: response.status === 404 ? "NOT_FOUND" : "FETCH",
    } as const;
  }

  try {
    const data = FieldOptionsSchema.parse(await response.json());
    return { success: true, data: data.actions.POST } as const;
  } catch (error) {
    console.error(error);
    return { success: false, error, errorType: "SCHEMA" } as const;
  }
}

/**
 * Submit survey to the API
 *
 * @param payload - Survey submission data
 */
export async function submitSurvey(payload: SurveySubmissionPayload) {
  const url = getApiUrl("/report/survey/");

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    // try to get error details from response
    try {
      const errorData = await response.json();
      return {
        success: false,
        status: response.status,
        errorType: response.status === 404 ? "NOT_FOUND" : "FETCH",
        errors: errorData, // field-specific errors from API
      } as const;
    } catch {
      return {
        success: false,
        status: response.status,
        errorType: response.status === 404 ? "NOT_FOUND" : "FETCH",
      } as const;
    }
  }

  try {
    const data = SurveySubmissionResponseSchema.parse(await response.json());
    return { success: true, data } as const;
  } catch (error) {
    console.error(error);
    return { success: false, error, errorType: "SCHEMA" } as const;
  }
}
