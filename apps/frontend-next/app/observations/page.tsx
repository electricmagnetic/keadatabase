import { type Metadata } from "next";
import { GeoJSONLayer } from "geospatial/layers";
import { generateGeoJson } from "geospatial/helpers";

import { getObservations } from "./actions";

import Page from "@/app/_components/layout/Page";
import { Paginator } from "@/app/_components/api/paginator";
import BaseMap from "@/app/_components/geospatial/BaseMap";
import Split from "@/app/_components/layout/Split";
import { SplitToggler } from "@/app/_components/layout/SplitToggler";

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
    <Page.Container fullWidth>
      <Split>
        <Split.Scroll>
          <SplitToggler />
          <Page.Heading>Observations</Page.Heading>
          <Page.Section>
            <Paginator />
          </Page.Section>
          <Page.Section>
            <div className="row">
              {observations.map((observation) => (
                <div
                  className="col-12 col-md-6 col-xl-4 p-2 border"
                  key={observation.id}
                >
                  <dl>
                    <dt>ID</dt>
                    <dd>{observation.id}</dd>
                    <dt>Type</dt>
                    <dd>
                      {observation.get_sighting_type_display}{" "}
                      {observation.number}
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
        </Split.Scroll>
        <Split.Fixed>
          <BaseMap>
            <GeoJSONLayer geoJsonString={observationsAsGeoJson} zoomToLayer />
          </BaseMap>
        </Split.Fixed>
      </Split>
    </Page.Container>
  );
}
