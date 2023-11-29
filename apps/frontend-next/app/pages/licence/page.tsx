import { type Metadata } from "next";

import { WordPressPage } from "@/app/_components/content/wordpress";
import Page from "@/app/_components/layout/Page";

export const metadata: Metadata = {
  title: "Licence/Copyright",
};

export default function Licence() {
  return (
    <Page>
      <Page.Heading>Licence/Copyright</Page.Heading>
      <Page.Section>
        <WordPressPage id={53} />
      </Page.Section>
    </Page>
  );
}
