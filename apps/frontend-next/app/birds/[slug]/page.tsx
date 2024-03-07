import { type Metadata } from "next";

import { getBird } from "../actions";
import { MediaSchema } from "../schema";

import Page from "@/app/_components/layout/Page";
import Properties from "@/app/_components/layout/Properties";
import Breadcrumbs from "@/app/_components/layout/Breadcrumbs";

interface PageProps {
  params: { slug: unknown };
}

export async function generateMetadata({
  params: { slug },
}: PageProps): Promise<Metadata> {
  const bird = await getBird(slug);
  return {
    title: bird.name,
  };
}

export default async function BirdPage({ params: { slug } }: PageProps) {
  const { bird_extended, ...bird } = await getBird(slug);

  const checkMedia = MediaSchema.safeParse(bird_extended?.profile_picture);
  const media = checkMedia.success ? checkMedia.data : null;

  return (
    <Page>
      <Page.Section background="faded" size="tiny">
        <Breadcrumbs
          breadcrumbs={[{ name: "Birds", href: "/birds" }, { name: bird.name }]}
        />
      </Page.Section>
      <Page.Section background="dull" size="medium">
        <div className="row">
          <div className="col-md-6 col-lg-7 order-2 order-md-1">
            <h1>{bird.name}</h1>
            <Properties>
              <Properties.Item name="Key Details">
                {[
                  bird.get_life_stage
                    ? `${bird.status} (${bird.get_life_stage})`
                    : bird.status,
                  bird.sex,
                  bird.primary_band,
                ].join(", ")}
              </Properties.Item>
              <Properties.Item name="Area">{bird.study_area}</Properties.Item>
              <Properties.Item name="Band Combo">
                {bird.band_combo}
              </Properties.Item>
            </Properties>
          </div>
          <div className="col-md-6 col-lg-5 overhang-container order-1 order-md-2">
            {media ? (
              <figure className="figure overhang-image">
                <img
                  alt={`A ${bird.sex} kea`}
                  className="figure-img img-fluid rounded"
                  src={media.large}
                />
                {bird_extended?.profile_picture_attribution ? (
                  <figcaption className="figure-caption text-end">
                    Photo by {bird_extended.profile_picture_attribution}
                  </figcaption>
                ) : null}
              </figure>
            ) : null}
          </div>
        </div>
      </Page.Section>
      {bird_extended ? (
        <Page.Section>
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
        </Page.Section>
      ) : (
        <em>No additional information on this kea can be found.</em>
      )}
    </Page>
  );
}
