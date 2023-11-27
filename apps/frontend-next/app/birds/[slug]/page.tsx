import { type Metadata } from "next";

import Page from "@/app/_components/layout/Page";

export const metadata: Metadata = {
  title: "View Bird",
};

export default function Bird({
  params: { slug },
}: {
  params: { slug: string };
}) {
  return (
    <Page>
      <Page.Heading>Bird: {slug}</Page.Heading>
    </Page>
  );
}
