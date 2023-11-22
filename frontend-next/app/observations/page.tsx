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
import ObservationsPagination from "./ObservationsPagination";

import Page from "@/app/_components/layout/Page";
import Loading from "@/app/loading";
// import BaseMap from "@/app/_components/geospatial/BaseMap";
import { getData, type PaginatedResponse } from "@/app/_components/api";

export const metadata: Metadata = {
  title: "View Observations",
};

const BASE_URL = `${process.env.NEXT_PUBLIC_DATABASE_API}/observations`;

export interface Observation {
  id: string;
}

export default async function Observations({
  searchParams,
}: {
  searchParams: ReadonlyURLSearchParams;
}) {
  const values = getValuesFromSearchParam<ObservationsFilters>(
    searchParams,
    ObservationsFilterSchema,
  );
  const valuesAsString = new URLSearchParams(values).toString();

  const data = await getData<PaginatedResponse<Observation>>(
    `${BASE_URL}?${valuesAsString}`,
  );

  const observations = data.results;

  return (
    <Page>
      <Page.Heading>Observations</Page.Heading>
      <ObservationsQueryBuilder />
      <ObservationsPagination />
      <Suspense fallback={<Loading />} key={valuesAsString}>
        <div className="row">
          <div className="col-md-4">
            <ObservationsList observations={observations} />
          </div>
          <div className="col-md-8">
            {/* <BaseMap height="100%"></BaseMap> */}
          </div>
        </div>
      </Suspense>
    </Page>
  );
}
