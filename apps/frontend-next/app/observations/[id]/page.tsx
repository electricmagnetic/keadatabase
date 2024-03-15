import { type Metadata } from "next";
import { notFound } from "next/navigation";

import { getObservation } from "../actions";
import { ObservationsAsMap } from "../templates";

import Page from "@/app/_components/layout/Page";
import {
  type PageWithSearchParams,
  type PageWithIdProps,
} from "@/app/_components/api/schema";
import Breadcrumbs from "@/app/_components/layout/Breadcrumbs";
import Properties from "@/app/_components/layout/Properties";
import Figure from "@/app/_components/layout/Figure";
import { validateId } from "@/app/_components/api/actions";
import { getBirdObservations } from "@/app/birdObservations/actions";
import { BirdObservationAsBirdBlock } from "@/app/birdObservations/templates";
import { Paginator } from "@/app/_components/api/paginator";

export async function generateMetadata({
  params: { id: rawId },
}: PageWithIdProps): Promise<Metadata> {
  const id = validateId(rawId);
  if (!id) return {};
  const observation = await getObservation(id);
  return {
    title: `#${observation.id} (Observation)`,
  };
}

function TextBlock({ name, text }: { name: string; text: string }) {
  return (
    <div className="mb-3">
      <h3 className="h4 font-sans-serif">{name}</h3>
      <p className="whitespace-pre-line">{text ? text : <em>-</em>}</p>
    </div>
  );
}

export default async function ObservationPage({
  searchParams,
  params: { id: rawId },
}: PageWithIdProps & PageWithSearchParams) {
  const id = validateId(rawId);
  if (!id) notFound();

  const observation = await getObservation(id);

  const {
    results: birdObservations,
    isMore,
    count,
    total,
  } = await getBirdObservations({
    ...searchParams,
    sighting: id,
  });

  return (
    <Page>
      <Breadcrumbs
        breadcrumbs={[
          { name: "Observations", href: "/observations" },
          { name: `#${observation.id}` },
        ]}
      />
      <Page.Section background="contours" size="medium">
        <h1>Observation {`#${observation.id}`}</h1>
        <Properties className="row g-2 row-cols-1 row-cols-md-3">
          <Properties.Item iconName="calendar" name="When">
            {observation.date_sighted} {observation.time_sighted}
          </Properties.Item>
          <Properties.Item iconName="geo-alt" name="Where">
            {observation.geocode}, {observation.region}
          </Properties.Item>
          <Properties.Item iconName="feather" name="What">
            {observation.get_sighting_type_display} {observation.number}{" "}
            {observation.number === 1 ? "bird" : "birds"}
          </Properties.Item>
          <Properties.Item iconName="patch-check-fill" name="Status">
            {observation.get_status_display}
          </Properties.Item>
          <Properties.Item iconName="person" name="Who">
            {observation.contributor}
          </Properties.Item>
        </Properties>
      </Page.Section>
      <Page.Section>
        <h2>Details</h2>
        <TextBlock
          name="Location Details"
          text={observation.location_details}
        />
        <TextBlock name="Comments" text={observation.comments} />
        <TextBlock name="Behaviour" text={observation.behaviour} />
      </Page.Section>
      <Page.Section>
        <Figure caption={`Map around ${observation.geocode}`}>
          <ObservationsAsMap observations={[observation]} />
        </Figure>
      </Page.Section>
      <Page.Section>
        <h2>Birds</h2>
        {birdObservations.length > 0 ? (
          <>
            <ul className="list-unstyled row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
              {birdObservations.map((birdObservation) => (
                <li className="col" key={birdObservation.id}>
                  <BirdObservationAsBirdBlock
                    birdObservation={birdObservation}
                    key={birdObservation.id}
                  />
                </li>
              ))}
            </ul>
            <Paginator
              count={count}
              isMore={isMore}
              scroll={false}
              total={total}
            />
          </>
        ) : (
          <em>No specific birds were recorded with this observation.</em>
        )}
      </Page.Section>
    </Page>
  );
}
