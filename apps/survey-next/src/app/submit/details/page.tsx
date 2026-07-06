import { type Metadata } from "next";
import { redirect } from "next/navigation";
import { Step2Form } from "../_components/Step2Form";
import { getFieldOptions } from "../actions";
import { RequireAuth } from "@/app/_components/auth/RequireAuth";
import Error from "@/app/_components/ui/Error";

export const metadata: Metadata = {
  title: "Survey Details | Submit Survey | Kea Survey",
  description: "Enter survey details and observations.",
};

interface SearchParams {
  gridTiles?: string | string[];
}

export default async function SubmitDetailsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  // no tiles selected, redirect back to step 1
  if (!params.gridTiles) {
    redirect("/submit");
  }

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
    <RequireAuth>
      <Step2Form gridTiles={gridTiles} fieldOptions={fieldOptionsFetch.data} />
    </RequireAuth>
  );
}
