import { type Metadata } from "next";

import { getObservation } from "../actions";

import Page from "@/app/_components/layout/Page";
import { type PageWithIdProps } from "@/app/_components/api/schema";
import Breadcrumbs from "@/app/_components/layout/Breadcrumbs";
import Properties from "@/app/_components/layout/Properties";

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
    <Page.Section size="tiny">
      <h2>{name}</h2> <p className="whitespace-pre-line">{text}</p>
    </Page.Section>
  ) : null;
}

export default async function ObservationPage({
  params: { id },
}: PageWithIdProps) {
  const observation = await getObservation(id);

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
        <Properties>
          <Properties.Item name="When">
            {observation.date_sighted} {observation.time_sighted}
          </Properties.Item>
          <Properties.Item name="Where">
            {observation.geocode}, {observation.region}
          </Properties.Item>
          <Properties.Item name="Who">
            {observation.contributor}
          </Properties.Item>
          <Properties.Item name="What">
            {observation.get_sighting_type_display} {observation.number}{" "}
            {observation.number === 1 ? "bird" : "birds"}
          </Properties.Item>
          <Properties.Item name="Status">
            {observation.get_status_display}
          </Properties.Item>
        </Properties>
      </Page.Section>
      <OptionalTextBlock name="Comments" text={observation.comments} />
      <OptionalTextBlock
        name="Location Details"
        text={observation.location_details}
      />
      <OptionalTextBlock name="Behaviour" text={observation.behaviour} />
    </Page>
  );
}
