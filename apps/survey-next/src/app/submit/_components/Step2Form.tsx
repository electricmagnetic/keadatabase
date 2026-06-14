"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState, useMemo } from "react";

import { TripFieldset } from "../_components/TripFieldset";
import { SurveyHourFieldset } from "../_components/SurveyHourFieldset";
import { FurtherInformationFieldset } from "../_components/FurtherInformationFieldset";
import { SubmitBar } from "../_components/SubmitBar";
import { Toast } from "@/app/_components/ui/Toast";
import Page from "@/app/_components/ui/Page";
import {
  Step2Schema,
  type Step2FormInput,
  type Step2FormData,
  type Observer,
} from "../schema";
import { generateInitialHours, transformFormDataToPayload } from "../utils";
import { submitSurvey } from "../actions";

interface Step2FormProps {
  observer: Observer;
  gridTiles: string[];
  fieldOptions?: Record<string, any>;
}

/**
 * Step 2: Survey Details Form
 *
 * Collects:
 * - Survey date and purpose
 * - Hour-by-hour observations
 * - Max flock size and comments
 *
 * On submit: Posts to API and redirects to success page
 */
export function Step2Form({
  observer,
  gridTiles,
  fieldOptions,
}: Step2FormProps) {
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);

  // memoize default values to prevent hydration mismatches
  const defaultValues = useMemo(
    () => ({
      observer,
      date: "", // empty so the field shows "required" on blur (matches Step 1)
      hours: generateInitialHours(gridTiles),
      max_flock_size: null,
      purpose: "",
      comments: "",
      challenge: "kea", // anti-spam field (fixed value)
    }),
    [observer, gridTiles],
  );

  const methods = useForm<Step2FormInput, unknown, Step2FormData>({
    resolver: zodResolver(Step2Schema),
    mode: "onTouched", // validate on blur first, then on change
    reValidateMode: "onChange", // revalidate on every change after first blur
    criteriaMode: "all", // return all errors
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data: Step2FormData) => {
    setSubmitError(null);

    // transform form data to API payload
    const payload = transformFormDataToPayload(data);

    // submit to API
    const result = await submitSurvey(payload);

    if (!result.success) {
      setSubmitError(
        "errors" in result
          ? "There were errors in your submission. Please check the form and try again."
          : "Failed to submit survey. Please try again later.",
      );
      return;
    }

    // redirect to success page
    router.push(`/submit/success/${result.data.id}`);
  };

  const onInvalid = () => {
    setSubmitError(
      "Invalid data provided. Please double-check the form for errors.",
    );
  };

  return (
    <FormProvider {...methods}>
      <Toast message={submitError} onDismiss={() => setSubmitError(null)} />
      <section className="form">
        <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
          <Page.Section>
            <h2>Step 2: Survey Details</h2>

            <div className="form__fields">
              <TripFieldset
                observerName={observer.name}
                observerEmail={observer.email}
                gridTiles={gridTiles}
                fieldOptions={fieldOptions}
              />

              <SurveyHourFieldset
                gridTiles={gridTiles}
                fieldOptions={fieldOptions?.hours?.child?.children}
              />

              <FurtherInformationFieldset />
            </div>

          </Page.Section>

          <SubmitBar buttonText="Submit" />
        </form>
      </section>
    </FormProvider>
  );
}
