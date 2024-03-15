import { type Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { getBird } from "../actions";
import { generateAltText, generateSummary } from "../helpers";

import Page from "@/app/_components/layout/Page";
import Properties from "@/app/_components/layout/Properties";
import Breadcrumbs from "@/app/_components/layout/Breadcrumbs";
import {
  type PageWithSearchParams,
  type PageWithSlugProps,
} from "@/app/_components/api/schema";
import Figure from "@/app/_components/layout/Figure";
import { validateSlug } from "@/app/_components/api/actions";
import { getMediaOrPlaceholder } from "@/app/_components/api/media";
import { getBirdObservations } from "@/app/birdObservations/actions";
import {
  BirdObservationAsObservationBlock,
  BirdObservationsAsMap,
} from "@/app/birdObservations/templates";
import { Paginator } from "@/app/_components/api/paginator";

const IMAGE_HEIGHT = 500;
const IMAGE_WIDTH = 500;

export async function generateMetadata({
  params: { slug: rawSlug },
}: PageWithSlugProps): Promise<Metadata> {
  const slug = validateSlug(rawSlug);
  if (!slug) return {};
  const bird = await getBird(slug);

  return {
    title: `${bird.name} (Bird)`,
  };
}

export default async function BirdPage({
  searchParams,
  params: { slug: rawSlug },
}: PageWithSlugProps & PageWithSearchParams) {
  const slug = validateSlug(rawSlug);
  if (!slug) notFound();

  const { bird_extended, ...bird } = await getBird(slug);

  const media = getMediaOrPlaceholder(bird_extended?.profile_picture);

  const {
    results: birdObservations,
    isMore,
    count,
    total,
  } = await getBirdObservations({
    ...searchParams,
    bird: slug,
  });

  return (
    <Page>
      <Breadcrumbs
        breadcrumbs={[{ name: "Birds", href: "/birds" }, { name: bird.name }]}
      />
      <Page.Section background="dull" size="medium">
        <div className="row">
          <div className="col-md-6 col-lg-7 order-2 order-md-1">
            <h1>{bird.name}</h1>
            <Properties>
              <Properties.Item name="Key Details">
                {generateSummary(bird)}
              </Properties.Item>
              <Properties.Item name="Area">{bird.study_area}</Properties.Item>
              <Properties.Item name="Band Combo">
                {bird.band_combo}
              </Properties.Item>
            </Properties>
          </div>
          <div className="col-md-6 col-lg-5 overhang-container order-1 order-md-2">
            <Figure
              caption={
                bird_extended?.profile_picture_attribution
                  ? `Photo by ${bird_extended.profile_picture_attribution}`
                  : undefined
              }
              className="overhang-image"
            >
              <Image
                alt={generateAltText(bird)}
                className="rounded img-fluid bg-body-secondary"
                height={IMAGE_HEIGHT}
                src={media.large}
                unoptimized
                width={IMAGE_WIDTH}
              />
            </Figure>
          </div>
        </div>
      </Page.Section>

      <Page.Section>
        {bird_extended ? (
          <div className="row">
            <div className="col-lg-6">
              <p className="whitespace-pre-line">{bird_extended.description}</p>
              {bird_extended.sponsor_name ? (
                <Properties>
                  <Properties.Item name="Sponsor">
                    {bird_extended.sponsor_website ? (
                      <a
                        href={bird_extended.sponsor_website}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {bird_extended.sponsor_name}
                      </a>
                    ) : (
                      bird_extended.sponsor_name
                    )}
                  </Properties.Item>
                </Properties>
              ) : null}
            </div>
          </div>
        ) : (
          <em>No additional information on this bird can be found.</em>
        )}
      </Page.Section>
      <Page.Section>
        <h2>Observations</h2>
        {birdObservations.length > 0 ? (
          <>
            <Figure caption={`Observations of ${bird.name}`}>
              <BirdObservationsAsMap birdObservations={birdObservations} />
            </Figure>
            <ul className="list-unstyled row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
              {birdObservations.map((birdObservation) => (
                <li className="col" key={birdObservation.id}>
                  <BirdObservationAsObservationBlock
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
          <em>No observations of this bird have been recorded.</em>
        )}
      </Page.Section>
    </Page>
  );
}
