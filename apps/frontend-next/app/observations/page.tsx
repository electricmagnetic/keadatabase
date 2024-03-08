import { type Metadata } from "next";
import Link from "next/link";
import { GeoJSONLayer } from "geospatial/layers";
import { generateGeoJson } from "geospatial/helpers";

import { getObservations } from "./actions";

import Page from "@/app/_components/layout/Page";
import { Paginator } from "@/app/_components/api/paginator";
import BaseMap from "@/app/_components/geospatial/BaseMap";

export const metadata: Metadata = {
  title: "View Observations",
};

export default async function ObservationsPage({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const observations = await getObservations(searchParams);
  const observationsAsGeoJson = JSON.stringify(
    generateGeoJson("id", "point_location", observations),
  );

  return (
    <Page>
      <Page.Heading>Observations</Page.Heading>
      <Page.Section size="tiny">
        <Paginator />
      </Page.Section>
      <div style={{ height: "640px" }}>
        <BaseMap>
          <GeoJSONLayer geoJsonString={observationsAsGeoJson} zoomToLayer />
        </BaseMap>
      </div>
      <Page.Section>
        <div className="row">
          {observations.map((observation) => (
            <div className="col col-md-3 p-2 border" key={observation.id}>
              <dl>
                <dt>ID</dt>
                <dd>
                  <Link href={`/observations/${observation.id}`}>
                    {observation.id}
                  </Link>
                </dd>
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
