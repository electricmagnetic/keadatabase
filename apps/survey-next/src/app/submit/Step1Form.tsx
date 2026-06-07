"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { GridTileSelectMap } from "../_components/grid/GridTileSelectMap";
import { ObserverFieldset } from "./_components/ObserverFieldset";
import { GridTileFieldset } from "./_components/GridTileFieldset";
import { SelectedGridTiles } from "./_components/SelectedGridTiles";
import { Step1Schema, type Step1FormData } from "./schema";
import Page from "@/app/_components/ui/Page";
/**
 * Step 1: Observer and Grid Tile Selection Form
 *
 * Collects:
 * - Observer name and email
 * - Grid tiles to survey (via typeahead and map)
 *
 * On submit: Navigates to Step 2 with data in URL params
 */
export function Step1Form() {
  const router = useRouter();

  const methods = useForm<Step1FormData>({
    resolver: zodResolver(Step1Schema),
    mode: "onTouched", // Validate on blur first, then on change
    reValidateMode: "onChange", // Revalidate on every change after first blur
    criteriaMode: "all", // Return all errors
    defaultValues: {
      observer: {
        name: "",
        email: "",
      },
      gridTiles: [],
    },
  });

  const {
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitting, isValid },
  } = methods;

  const gridTiles = watch("gridTiles") || [];

  const handleMapSelectionChange = (tiles: string[]) => {
    setValue("gridTiles", tiles, { shouldValidate: true });
  };

  const onSubmit = (data: Step1FormData) => {
    // Encode form data as URL params
    const params = new URLSearchParams();
    params.set("observer_name", data.observer.name);
    params.set("observer_email", data.observer.email);
    data.gridTiles.forEach((tile) => {
      params.append("gridTiles", tile);
    });

    // Navigate to Step 2
    router.push(`/submit/details?${params.toString()}`);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="form submit-page">
        <Page.Section>
          <h2>Step 1: Observer and Trip Details</h2>

          <div className="form__fields">
            <ObserverFieldset />
            <GridTileFieldset />
          </div>
        </Page.Section>

        <div className="submit__grid">
          <div className="submit__map">
            <GridTileSelectMap
              selectedTiles={gridTiles}
              onSelectionChange={handleMapSelectionChange}
            />
          </div>
          <div className="submit__tiles">
            <SelectedGridTiles />
          </div>
        </div>

        <div className="submit__bar">
          <div className="holder holder--sm">
            <div>
              {!isValid && (
                <small>Form can be submitted once data entered.</small>
              )}
            </div>
            <div>
              <button
                type="submit"
                className="btn btn--primary"
                disabled={!isValid}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
