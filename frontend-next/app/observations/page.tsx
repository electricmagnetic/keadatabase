import { Suspense } from "react";
import { type Metadata } from "next";
import { type ReadonlyURLSearchParams } from "next/navigation";

import { getValuesFromSearchParam } from "./helpers";
import {
  ObservationsFilterSchema,
  type ObservationsFilters,
} from "./validations";
import ObservationsQueryBuilder from "./ObservationsQueryBuilder";
import ObservationsList from "./ObservationsList";

import Page from "@/app/_components/layout/Page";
import Loading from "@/app/loading";
import ObservationsPagination from "./ObservationsPagination";

export const metadata: Metadata = {
  title: "View Observations",
};

export default function Observations({
  searchParams,
}: {
  searchParams: ReadonlyURLSearchParams;
}) {
  const values = getValuesFromSearchParam<ObservationsFilters>(
    searchParams,
    ObservationsFilterSchema,
  );
  const valuesAsString = new URLSearchParams(values).toString();

  return (
    <Page>
      <Page.Heading>Observations</Page.Heading>
      <ObservationsQueryBuilder />
      <ObservationsPagination />
      <Suspense fallback={<Loading />} key={valuesAsString}>
        <ObservationsList query={valuesAsString} />
      </Suspense>
    </Page>
  );
}
