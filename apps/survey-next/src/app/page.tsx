import { type Metadata } from "next";

import { WordPressPage } from "shared/cms/wordpress";
import RecentGridTiles from "@/app/_components/grid/RecentGridTiles";
import Page from "@/app/_components/ui/Page";

export const metadata: Metadata = {
  title: "Kea Survey Tool",
};

export default async function HomePage() {
  return (
    <Page.Container>
      <Page.Section>
        <div className="page__home grid grid--half">
          <WordPressPage
            baseUrl={process.env.NEXT_PUBLIC_WORDPRESS_BASE}
            id={480}
          />
          <div>
            <h2>Recent Grid Tiles</h2>
            <RecentGridTiles limit={8} />
          </div>
        </div>
      </Page.Section>
    </Page.Container>
  );
}
