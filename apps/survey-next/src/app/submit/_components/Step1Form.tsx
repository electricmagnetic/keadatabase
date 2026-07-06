"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { GridTileSelectMap } from "../../_components/grid/GridTileSelectMap";
import { GridTileFieldset } from "./GridTileFieldset";
import { SelectedGridTiles } from "./SelectedGridTiles";
import { Step1Schema, type Step1FormData } from "../schema";
import { SubmitBar } from "./SubmitBar";
import Page from "@/app/_components/ui/Page";

/**
 * Step 1: Grid Tile Selection Form
 *
 * Collects the grid tiles to survey (via typeahead and map). Observer details
 * come from the logged-in account in Step 2.
 *
 * On submit: Navigates to Step 2 with the tiles in URL params
 */
export function Step1Form() {
  const router = useRouter();

  const methods = useForm<Step1FormData>({
    resolver: zodResolver(Step1Schema),
    mode: "onTouched", // validate on blur first, then on change
    reValidateMode: "onChange", // revalidate on every change after first blur
    criteriaMode: "all", // return all errors
    defaultValues: {
      gridTiles: [],
    },
  });

  const { handleSubmit, watch, setValue } = methods;

  const gridTiles = watch("gridTiles") || [];

  const handleMapSelectionChange = (tiles: string[]) => {
    setValue("gridTiles", tiles, { shouldValidate: true });
  };

  const onSubmit = async (data: Step1FormData) => {
    // encode form data as URL params
    const params = new URLSearchParams();
    data.gridTiles.forEach((tile) => {
      params.append("gridTiles", tile);
    });

    // navigate to Step 2 — keep isSubmitting true through the navigation
    // so the SubmitBar shows its loading state
    router.push(`/submit/details?${params.toString()}`);
    await new Promise(() => {});
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="form submit-page">
        <Page.Section>
          <h2>Step 1: Trip Details</h2>

          <div className="form__fields">
            <GridTileFieldset />
          </div>
        </Page.Section>

        <div className="submit__grid">
          <div className="submit__map">
            <GridTileSelectMap
              selectedTiles={gridTiles}
              onSelectionChange={handleMapSelectionChange}
              height="860px"
            />
          </div>
          <div className="submit__tiles">
            <SelectedGridTiles />
          </div>
        </div>

        <SubmitBar buttonText="Next" />
      </form>
    </FormProvider>
  );
}
