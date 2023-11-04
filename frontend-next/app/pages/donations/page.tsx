import { type Metadata } from "next";

import WordPressPage from "@/app/_components/content/WordPressPage";
import Page from "@/app/_components/layout/Page";

export const metadata: Metadata = {
  title: "Donations",
};

export default function Donations() {
  return (
    <Page>
      <Page.Section type="faded">
        <Page.Heading>Donations</Page.Heading>
      </Page.Section>
      <Page.Section>
        <WordPressPage id={221} />
      </Page.Section>
    </Page>
  );
}
