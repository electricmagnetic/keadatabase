"use client";

import { useEffect, useState } from "react";
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
import { profileFetch } from "@/app/_components/auth/client";
import type { Profile } from "@/app/_components/auth/schema";
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
  // lock the name field only once the profile actually returns one, so
  // accounts without a saved name can still type it
  const [nameLocked, setNameLocked] = useState(false);

  // when logged in, pre-fill the observer fields from the session and lock them
  const methods = useForm<Step1FormData>({
    resolver: zodResolver(Step1Schema),
    mode: "onTouched", // validate on blur first, then on change
    reValidateMode: "onChange", // revalidate on every change after first blur
    criteriaMode: "all", // return all errors
    defaultValues: {
      observer: {
        name: "",
        email: isAuthenticated ? (user?.email ?? "") : "",
      },
      gridTiles: [],
    },
  });

  const { handleSubmit, watch, setValue } = methods;

  // the session resolves after mount, so defaultValues miss it — fill the
  // observer email once it arrives. The name isn't in the session payload, so
  // fetch it from /me/; both fields are locked while logged in.
  useEffect(() => {
    if (!isAuthenticated) return;
    setValue("observer.email", user?.email ?? "");
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
            <ObserverFieldset
              emailReadOnly={isAuthenticated}
              nameReadOnly={nameLocked}
            />
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
