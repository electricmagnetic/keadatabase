"use client";

import { useRouter } from "next/navigation";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  type ReportFormInput,
  type ReportFormOutput,
  emptyValues,
  ReportFormSchema,
  formToDto,
} from "./schema";
import { createReport } from "./actions";

import { Field, SubmitButton } from "@/app/_components/forms";
import Alert from "@/app/_components/ui/Alert";
import { PrecisionEnum, SightingTypeEnum } from "@/app/_components/enums";

// TODO error handling in second validation (transformation)
// TODO error handling of API errors
// TODO birds/array implementation
// TODO map selection
// TODO add helper text

export default function ReportForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ReportFormInput, unknown, ReportFormOutput>({
    defaultValues: emptyValues,
    resolver: zodResolver(ReportFormSchema),
  });

  const onSubmit: SubmitHandler<ReportFormOutput> = async (rawData) => {
    try {
      const reportDto = await formToDto(rawData);
      const partialObservation = await createReport(reportDto);

      router.refresh();
      router.push(`/observations/${partialObservation.id}?success=true`); // CHECK THIS: replace because we don't want to add ?success=true into browser history
    } catch (error) {
      setError("root.submissionError", {
        type: "submission",
        message:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset>
        <legend>1. About You</legend>
        <Field
          error={errors.contributor?.name}
          field={
            <input
              placeholder="Your name"
              type="text"
              {...register("contributor.name")}
            />
          }
          id="contributor__name"
          label="Name"
        />
        <Field
          error={errors.contributor?.email}
          field={
            <input
              placeholder="Your email"
              type="text"
              {...register("contributor.email")}
            />
          }
          id="contributor__email"
          label="Email"
        />
      </fieldset>
      <fieldset>
        <legend>2. Observation Details</legend>
        <div className="row">
          <div className="col-md-6">
            <Field
              error={errors.date_sighted}
              field={<input type="date" {...register("date_sighted")} />}
              id="date_sighted"
              label="Date"
            />
          </div>
          <div className="col-md-6">
            <Field
              error={errors.time_sighted}
              field={<input type="time" {...register("time_sighted")} />}
              id="time_sighted"
              label="Time"
            />
          </div>
        </div>
        <div className="p-3 bg-light-subtle border">
          <div className="row">
            <div className="col-md-4">
              <Field
                error={errors.precision}
                field={
                  <select {...register("precision")}>
                    {Object.keys(PrecisionEnum.enum).map((key) => (
                      <option key={key} value={key}>
                        {key}
                      </option>
                    ))}
                  </select>
                }
                id="precision"
                label="Precision"
              />
            </div>
            <div className="col-md-4">
              <Field
                error={errors.longitude}
                field={
                  <input
                    placeholder="e.g. 171.562"
                    step={0.000001}
                    type="number"
                    {...register("longitude")}
                  />
                }
                id="longitude"
                label="Longitude"
              />
            </div>
            <div className="col-md-4">
              <Field
                error={errors.latitude}
                field={
                  <input
                    placeholder="e.g. -42.940"
                    step={0.000001}
                    type="number"
                    {...register("latitude")}
                  />
                }
                id="latitude"
                label="Latitude"
              />
            </div>
            <Field
              error={errors.location_details}
              field={
                <textarea
                  placeholder="e.g. Beside the Arthur's Pass Store"
                  {...register("location_details")}
                />
              }
              id="location_details"
              label="Location details (optional)"
            />
          </div>
        </div>
      </fieldset>
      <fieldset>
        <legend>3. Birds</legend>
        <div className="row">
          <div className="col-md-4">
            <Field
              error={errors.sighting_type}
              field={
                <select {...register("sighting_type")}>
                  {Object.keys(SightingTypeEnum.enum).map((key) => (
                    <option key={key} value={key}>
                      {key}
                    </option>
                  ))}
                </select>
              }
              id="sighting_type"
              label="Observation type"
            />
          </div>
          <div className="col-md-4">
            <Field
              error={errors.number}
              field={<input type="number" {...register("number")} min={1} />}
              id="number"
              label="Number of birds observed"
            />
          </div>
        </div>
      </fieldset>
      <fieldset>
        <legend>4. Comments</legend>
        <Field
          error={errors.comments}
          field={
            <textarea
              placeholder="i.e. activities, behaviours observed"
              {...register("comments")}
            />
          }
          id="comments"
          label="Comments (optional)"
        />
      </fieldset>
      <fieldset>
        <legend>5. Confirmation</legend>
        {/* TODO add confirmation text */}
        <SubmitButton />
        {errors.root?.message || errors.root?.submissionError?.message ? (
          <Alert type="danger">
            {errors.root.submissionError?.message ? (
              <p>{errors.root.submissionError.message}</p>
            ) : null}
            {errors.root.message ? <p>{errors.root.message}</p> : null}
          </Alert>
        ) : null}
      </fieldset>
    </form>
  );
}
