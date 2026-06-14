import { type Metadata } from "next";
import { redirect } from "next/navigation";
import { Step2Form } from "../_components/Step2Form";
import { getFieldOptions } from "../actions";
import Error from "@/app/_components/ui/Error";
import type { Observer } from "../schema";

export const metadata: Metadata = {
  title: "Survey Details | Submit Survey | Kea Survey",
  description: "Enter survey details and observations.",
};

interface SearchParams {
  observer_name?: string;
  observer_email?: string;
  gridTiles?: string | string[];
}

export default async function SubmitDetailsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  // validate required params
  if (!params.observer_name || !params.observer_email || !params.gridTiles) {
    // missing params, redirect back to step 1
    redirect("/submit");
  }

  // parse observer data
  const observer: Observer = {
    name: params.observer_name,
    email: params.observer_email,
  };

  // parse grid tiles (can be string or array)
  const gridTiles = Array.isArray(params.gridTiles)
    ? params.gridTiles
    : [params.gridTiles];

  // fetch field options from API
  const fieldOptionsFetch = await getFieldOptions();

  if (!fieldOptionsFetch.success) {
    return (
      <div className="container my-5">
        <Error message="Failed to load form options. Please try again later." />
      </div>
    );
  }

  return (
    <>
      <Step2Form
        observer={observer}
        gridTiles={gridTiles}
        fieldOptions={fieldOptionsFetch.data}
      />
    </>
  );
}
