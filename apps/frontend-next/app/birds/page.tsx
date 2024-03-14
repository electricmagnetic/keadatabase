import { type Metadata } from "next";

import { getBirds } from "./actions";
import { BirdAsBlock } from "./templates";

import { Paginator } from "@/app/_components/api/paginator";
import Page from "@/app/_components/layout/Page";
import Breadcrumbs from "@/app/_components/layout/Breadcrumbs";

export const metadata: Metadata = {
  title: "Search Birds",
};

export default async function BirdsPage({
  searchParams,
}: {
  searchParams: Record<string, unknown>;
}) {
  const birds = await getBirds(searchParams);

  return (
    <Page>
      <Breadcrumbs breadcrumbs={[{ name: "Birds" }]} />
      <Page.Heading>Search Birds</Page.Heading>
      <Page.Section size="tiny">
        <Paginator />
      </Page.Section>
      <Page.Section>
        <ul className="list-unstyled row g-3">
          {birds.map((bird) => (
            <li className="col-sm-6 col-md-4 col-lg-3" key={bird.slug}>
              <BirdAsBlock bird={bird} />
            </li>
          ))}
        </ul>
      </Page.Section>
    </Page>
  );
}
