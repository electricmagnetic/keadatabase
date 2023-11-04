import { type Metadata } from "next";

import WordPressPage from "@/app/_components/content/WordPressPage";
import Page from "@/app/_components/layout/Page";

export const metadata: Metadata = {
  title: "Licence/Copyright",
};

export default function Licence() {
  return (
    <Page>
      <Page.Section background="faded">
        <Page.Heading>Licence/Copyright</Page.Heading>
      </Page.Section>
      <Page.Section>
        <WordPressPage id={53} />
      </Page.Section>
    </Page>
  );
}
