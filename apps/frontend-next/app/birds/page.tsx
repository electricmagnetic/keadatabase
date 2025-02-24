import { type Metadata } from "next";

import { getBirds } from "./actions";
import { BirdAsBlock } from "./templates";

import { Paginator } from "@/app/_components/api/paginator";
import Page from "@/app/_components/layout/Page";
import Breadcrumbs from "@/app/_components/layout/Breadcrumbs";

export const metadata: Metadata = {
  title: "Search Birds",
};

export default async function BirdsPage(props: {
  searchParams: Promise<Record<string, unknown>>;
}) {
  const searchParams = await props.searchParams;
  const { results: birds, isMore, count, total } = await getBirds(searchParams);

  return (
    <Page>
      <Breadcrumbs breadcrumbs={[{ name: "Birds" }]} />
      <Page.Heading>Search Birds</Page.Heading>
      <Page.Section>
        <ul className="list-unstyled row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
          {birds.map((bird) => (
            <li className="col" key={bird.slug}>
              <BirdAsBlock bird={bird} />
            </li>
          ))}
        </ul>
      </Page.Section>
      <Page.Section size="small">
        <Paginator count={count} isMore={isMore} total={total} />
      </Page.Section>
    </Page>
  );
}
