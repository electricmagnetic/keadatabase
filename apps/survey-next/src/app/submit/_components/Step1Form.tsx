"use client";

import { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { GridTileSelectMap } from "../../_components/grid/GridTileSelectMap";
import { ObserverFieldset } from "./ObserverFieldset";
import { GridTileFieldset } from "./GridTileFieldset";
import { SelectedGridTiles } from "./SelectedGridTiles";
import { Step1Schema, type Step1FormData } from "../schema";
import { SubmitBar } from "./SubmitBar";
import Page from "@/app/_components/ui/Page";
import { useSession } from "@/app/_components/auth/useSession";
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
  const { user, isAuthenticated } = useSession();

  // when logged in, pre-fill the observer fields from the session and lock them
  const methods = useForm<Step1FormData>({
    resolver: zodResolver(Step1Schema),
    mode: "onTouched", // validate on blur first, then on change
    reValidateMode: "onChange", // revalidate on every change after first blur
    criteriaMode: "all", // return all errors
    defaultValues: {
      observer: {
        // name is always typed by the observer — allauth has no name field yet
        name: "",
        email: isAuthenticated ? (user?.email ?? "") : "",
      },
      gridTiles: [],
    },
  });

  const { handleSubmit, watch, setValue } = methods;

  // the session resolves after mount, so defaultValues miss it — fill the
  // observer email once it arrives. name stays as the observer typed it.
  useEffect(() => {
    if (!isAuthenticated) return;
    setValue("observer.email", user?.email ?? "");
  }, [isAuthenticated, user?.email, setValue]);

  const gridTiles = watch("gridTiles") || [];

  const handleMapSelectionChange = (tiles: string[]) => {
    setValue("gridTiles", tiles, { shouldValidate: true });
  };

  const onSubmit = async (data: Step1FormData) => {
    // encode form data as URL params
    const params = new URLSearchParams();
    params.set("observer_name", data.observer.name);
    params.set("observer_email", data.observer.email);
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
          <h2>Step 1: Observer and Trip Details</h2>

          <div className="form__fields">
            <ObserverFieldset emailReadOnly={isAuthenticated} />
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
