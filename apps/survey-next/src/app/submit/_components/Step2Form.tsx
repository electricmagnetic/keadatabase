"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState, useMemo, useEffect } from "react";

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
} from "../schema";
import { generateInitialHours, transformFormDataToPayload } from "../utils";
import { submitSurvey } from "../actions";
import { useSession } from "@/app/_components/auth/useSession";
import { profileFetch } from "@/app/_components/auth/client";
import type { Profile } from "@/app/_components/auth/schema";

interface Step2FormProps {
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
export function Step2Form({ gridTiles, fieldOptions }: Step2FormProps) {
  const router = useRouter();
  const { user, sessionToken } = useSession();
  const [submitError, setSubmitError] = useState<string | null>(null);
  // lock the name field only once the profile actually returns one, so
  // accounts without a saved name can still type it
  const [nameLocked, setNameLocked] = useState(false);

  // memoize default values to prevent hydration mismatches; RequireAuth
  // guarantees the session has resolved before this renders, so the email
  // is available here
  const defaultValues = useMemo(
    () => ({
      observer: { name: "", email: user?.email ?? "" },
      date: "", // empty so the field shows "required" on blur (matches Step 1)
      hours: generateInitialHours(gridTiles),
      purpose: "",
      comments: "",
      challenge: "kea", // anti-spam field (fixed value)
    }),
    [user?.email, gridTiles],
  );

  const methods = useForm<Step2FormInput, unknown, Step2FormData>({
    resolver: zodResolver(Step2Schema),
    mode: "onTouched", // validate on blur first, then on change
    reValidateMode: "onChange", // revalidate on every change after first blur
    criteriaMode: "all", // return all errors
    defaultValues,
  });

  const { handleSubmit, setValue } = methods;

  // the name isn't in the session payload — fetch it from /me/ and lock the
  // field once it returns one (setValue, not reset: reset on a mounted form
  // drops typed values under the React Compiler)
  useEffect(() => {
    (async () => {
      const result = await profileFetch<Profile>();
      if (!result.ok || !result.data) return;
      const name = [result.data.first_name, result.data.last_name]
        .filter(Boolean)
        .join(" ");
      if (name) {
        setValue("observer.name", name);
        setNameLocked(true);
      }
    })();
  }, [setValue]);

  const onSubmit = async (data: Step2FormData) => {
    setSubmitError(null);

    // transform form data to API payload
    const payload = transformFormDataToPayload(data);

    // when logged in, forward the allauth session token so the backend can
    // attach the user to the record
    const result = await submitSurvey(payload, sessionToken);

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
                nameLocked={nameLocked}
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
