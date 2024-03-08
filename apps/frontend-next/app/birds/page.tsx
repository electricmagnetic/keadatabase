import { type Metadata } from "next";
import Link from "next/link";

import { getBirds } from "./actions";

import { Paginator } from "@/app/_components/api/paginator";
import Page from "@/app/_components/layout/Page";

export const metadata: Metadata = {
  title: "Search Birds",
};

export default async function BirdsPage({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const birds = await getBirds(searchParams);

  return (
    <Page>
      <Page.Heading>Birds</Page.Heading>
      <Page.Section>
        <Paginator />
      </Page.Section>
      <Page.Section>
        <ul>
          {birds.map((bird) => (
            <li key={bird.slug}>
              <Link href={`/birds/${bird.slug}`}>{bird.name}</Link>
            </li>
          ))}
        </ul>
      </Page.Section>
    </Page>
  );
}
