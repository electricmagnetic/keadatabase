import { type Metadata } from "next";

import WordPressPage from "@/app/_components/content/WordPressPage";
import Page from "@/app/_components/layout/Page";

export const metadata: Metadata = {
  title: "Help",
};

export default function Help() {
  return (
    <Page>
      <Page.Heading>Help</Page.Heading>
      <Page.Section>
        <WordPressPage id={286} />
      </Page.Section>
    </Page>
  );
}
