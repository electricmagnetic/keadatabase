import { type Metadata } from "next";
import { Suspense } from "react";

import { getObservations } from "./actions";
import { ObservationAsBlock, ObservationsAsMap } from "./templates";

import Icon from "@/app/_components/ui/Icon";
import Page from "@/app/_components/layout/Page";
import { Paginator } from "@/app/_components/api/paginator";
import Split from "@/app/_components/layout/Split";
import Breadcrumbs from "@/app/_components/layout/Breadcrumbs";
import Loader from "@/app/_components/ui/Loader";

export const metadata: Metadata = {
  title: "View Observations",
};

export default async function ObservationsPage(props: {
  searchParams: Promise<Record<string, unknown>>;
}) {
  const searchParams = await props.searchParams;
  const {
    results: observations,
    isMore,
    count,
    total,
  } = await getObservations(searchParams);

  return (
    <Page noConstrainer>
      <Page.Container fullWidth>
        <Split
          whenFixed={
            <>
              <Icon name="card-list" />
              Show List
            </>
          }
          whenScroll={
            <>
              <Icon name="map" />
              Show Map
            </>
          }
        >
          <Split.Scroll>
            <Breadcrumbs breadcrumbs={[{ name: "Observations" }]} />
            <Page.Heading>View Observations</Page.Heading>
            <Page.Section>
              <Suspense fallback={<Loader />}>
                <ul className="list-unstyled row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-3">
                  {observations.map((observation) => (
                    <li className="col" key={observation.id}>
                      <ObservationAsBlock observation={observation} />
                    </li>
                  ))}
                </ul>
              </Suspense>
            </Page.Section>
            <Page.Section size="small">
              <Paginator count={count} isMore={isMore} total={total} />
            </Page.Section>
          </Split.Scroll>
          <Split.Fixed>
            <Suspense fallback={<Loader />}>
              <ObservationsAsMap observations={observations} />
            </Suspense>
          </Split.Fixed>
        </Split>
      </Page.Container>
    </Page>
  );
}
