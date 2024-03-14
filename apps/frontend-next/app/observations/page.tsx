import { type Metadata } from "next";
import { GeoJSONLayer } from "geospatial/layers";
import { generateGeoJson } from "geospatial/helpers";

import { getObservations } from "./actions";
import { ObservationAsBlock } from "./templates";

import Icon from "@/app/_components/ui/Icon";
import Page from "@/app/_components/layout/Page";
import { Paginator } from "@/app/_components/api/paginator";
import BaseMap from "@/app/_components/geospatial/BaseMap";
import Split from "@/app/_components/layout/Split";
import Breadcrumbs from "@/app/_components/layout/Breadcrumbs";

export const metadata: Metadata = {
  title: "View Observations",
};

export default async function ObservationsPage({
  searchParams,
}: {
  searchParams: Record<string, unknown>;
}) {
  const {
    results: observations,
    isMore,
    count,
    total,
  } = await getObservations(searchParams);
  const observationsAsGeoJson = JSON.stringify(
    generateGeoJson("id", "point_location", observations),
  );

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
              <ul className="list-unstyled row g-3">
                {observations.map((observation) => (
                  <li className="col-sm-6 col-lg-4" key={observation.id}>
                    <ObservationAsBlock observation={observation} />
                  </li>
                ))}
              </ul>
            </Page.Section>
            <Page.Section size="small">
              <Paginator count={count} isMore={isMore} total={total} />
            </Page.Section>
          </Split.Scroll>
          <Split.Fixed>
            <BaseMap>
              <GeoJSONLayer geoJsonString={observationsAsGeoJson} zoomToLayer />
            </BaseMap>
          </Split.Fixed>
        </Split>
      </Page.Container>
    </Page>
  );
}
