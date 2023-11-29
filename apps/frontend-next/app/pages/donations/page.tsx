import { type Metadata } from "next";

import { WordPressPage } from "@/app/_components/content/wordpress";
import Page from "@/app/_components/layout/Page";

export const metadata: Metadata = {
  title: "Donations",
};

export default function Donations() {
  return (
    <Page>
      <Page.Heading>Donations</Page.Heading>
      <Page.Section>
        <WordPressPage id={221} />
      </Page.Section>
    </Page>
  );
}
