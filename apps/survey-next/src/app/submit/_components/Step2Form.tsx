"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState, useMemo } from "react";

import { Messages } from "../_components/Messages";
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

  // Compute today's date once to prevent hydration mismatches
  const todayDate = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  }, []);

  // Memoize default values to prevent hydration mismatches
  const defaultValues = useMemo(
    () => ({
      observer,
      date: "", // empty so the field shows "required" on blur (matches Step 1)
      hours: generateInitialHours(todayDate, gridTiles),
      max_flock_size: null,
      purpose: "",
      comments: "",
      challenge: "kea", // Anti-spam field (fixed value)
    }),
    [observer, todayDate, gridTiles],
  );

  const methods = useForm<Step2FormInput, unknown, Step2FormData>({
    resolver: zodResolver(Step2Schema),
    mode: "onTouched", // Validate on blur first, then on change
    reValidateMode: "onChange", // Revalidate on every change after first blur
    criteriaMode: "all", // Return all errors
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data: Step2FormData) => {
    setSubmitError(null);

    // Transform form data to API payload
    const payload = transformFormDataToPayload(data);

    // Submit to API
    const result = await submitSurvey(payload);

    if (!result.success) {
      setSubmitError(
        "errors" in result
          ? "There were errors in your submission. Please check the form and try again."
          : "Failed to submit survey. Please try again later.",
      );
      return;
    }

    // Redirect to success page
    router.push(`/submit/success/${result.data.id}`);
  };

  return (
    <FormProvider {...methods}>
      <Toast message={submitError} onDismiss={() => setSubmitError(null)} />
      <section className="form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Page.Section>
            <h2>Step 2: Survey Details</h2>

            <Messages />

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
