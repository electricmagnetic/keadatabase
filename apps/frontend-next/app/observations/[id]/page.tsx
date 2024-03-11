import { type Metadata } from "next";
import { GeoJSONLayer } from "geospatial/layers";
import { generateGeoJson } from "geospatial/helpers";

import { getObservation } from "../actions";

import Page from "@/app/_components/layout/Page";
import { type PageWithIdProps } from "@/app/_components/api/schema";
import Breadcrumbs from "@/app/_components/layout/Breadcrumbs";
import Properties from "@/app/_components/layout/Properties";
import BaseMap from "@/app/_components/geospatial/BaseMap";
import Figure from "@/app/_components/layout/Figure";

export async function generateMetadata({
  params: { id },
}: PageWithIdProps): Promise<Metadata> {
  const observation = await getObservation(id);
  return {
    title: `#${observation.id} (Observation)`,
  };
}

function OptionalTextBlock({ name, text }: { name: string; text: string }) {
  return text ? (
    <>
      <h2>{name}</h2> <p className="whitespace-pre-line">{text}</p>
    </>
  ) : null;
}

export default async function ObservationPage({
  params: { id },
}: PageWithIdProps) {
  const observation = await getObservation(id);

  const observationAsGeoJson = JSON.stringify(
    generateGeoJson("id", "point_location", [observation]),
  );

  return (
    <Page>
      <Page.Section background="faded" size="tiny">
        <Breadcrumbs
          breadcrumbs={[
            { name: "Observations", href: "/observations" },
            { name: `#${observation.id}` },
          ]}
        />
      </Page.Section>
      <Page.Section background="dull" size="medium">
        <h1>Observation {`#${observation.id}`}</h1>
        <Properties className="row g-2">
          <Properties.Item className="col-md-4" iconName="calendar" name="When">
            {observation.date_sighted} {observation.time_sighted}
          </Properties.Item>
          <Properties.Item className="col-md-4" iconName="geo-alt" name="Where">
            {observation.geocode}, {observation.region}
          </Properties.Item>
          <Properties.Item className="col-md-4" iconName="feather" name="What">
            {observation.get_sighting_type_display} {observation.number}{" "}
            {observation.number === 1 ? "bird" : "birds"}
          </Properties.Item>
          <Properties.Item
            className="col-md-4"
            iconName="patch-check-fill"
            name="Status"
          >
            {observation.get_status_display}
          </Properties.Item>
          <Properties.Item className="col-md-4" iconName="person" name="Who">
            {observation.contributor}
          </Properties.Item>
        </Properties>
      </Page.Section>
      <Page.Section>
        <div className="row">
          <div className="col-md-6">
            <OptionalTextBlock name="Comments" text={observation.comments} />
            <OptionalTextBlock
              name="Location Details"
              text={observation.location_details}
            />
            <OptionalTextBlock name="Behaviour" text={observation.behaviour} />
          </div>
          <div className="col-md-6">
            <Figure caption={`Map around ${observation.geocode}`}>
              <div style={{ height: "720px" }}>
                <BaseMap interactive={false}>
                  <GeoJSONLayer
                    geoJsonString={observationAsGeoJson}
                    zoomToLayer
                  />
                </BaseMap>
              </div>
            </Figure>
          </div>
        </div>
      </Page.Section>
    </Page>
  );
}
