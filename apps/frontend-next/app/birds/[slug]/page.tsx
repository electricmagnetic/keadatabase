import { type Metadata } from "next";
import Image from "next/image";

import { getBird } from "../actions";
import { MediaSchema } from "../schema";
import { generateAltText, generateSummary } from "../helpers";

import Page from "@/app/_components/layout/Page";
import Properties from "@/app/_components/layout/Properties";
import Breadcrumbs from "@/app/_components/layout/Breadcrumbs";
import { type PageWithSlugProps } from "@/app/_components/api/schema";
import Figure from "@/app/_components/layout/Figure";

const IMAGE_HEIGHT = 500;
const IMAGE_WIDTH = 500;

export async function generateMetadata({
  params: { slug },
}: PageWithSlugProps): Promise<Metadata> {
  const bird = await getBird(slug);
  return {
    title: `${bird.name} (Bird)`,
  };
}

export default async function BirdPage({
  params: { slug },
}: PageWithSlugProps) {
  const { bird_extended, ...bird } = await getBird(slug);

  const media = MediaSchema.parse(bird_extended?.profile_picture);

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
    </Page>
  );
}
