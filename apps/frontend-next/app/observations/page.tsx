import { type Metadata } from "next";

import { getObservations } from "./actions";

import Page from "@/app/_components/layout/Page";
import { Paginator } from "@/app/_components/api/paginator";

export const metadata: Metadata = {
  title: "View Observations",
};

export default async function ObservationsPage({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const observations = await getObservations(searchParams);

  return (
    <Page>
      <Page.Heading>Observations</Page.Heading>
      <Page.Section>
        <Paginator />
      </Page.Section>
      <Page.Section>
        <div className="row">
          {observations.map((observation) => (
            <div className="col col-md-3 p-2 border" key={observation.id}>
              <dl>
                <dt>ID</dt>
                <dd>{observation.id}</dd>
                <dt>Type</dt>
                <dd>
                  {observation.get_sighting_type_display} {observation.number}
                </dd>
                <dt>Date/Time</dt>
                <dd>
                  {observation.date_sighted} {observation.time_sighted}
                </dd>
                <dt>Location</dt>
                <dd>
                  {observation.geocode} ({observation.region})
                </dd>
              </dl>
            </div>
          ))}
        </div>
      </Page.Section>
    </Page>
  );
}
