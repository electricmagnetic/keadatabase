import Link from "next/link";
import { type Metadata } from "next";
import { type PropsWithChildren } from "react";

import { SITE_NAME } from "./layout";

import Page from "@/app/_components/layout/Page";
import WordPressPage from "@/app/_components/content/WordPressPage";
import WordPressPosts from "@/app/_components/content/WordPressPosts";
import SectionHero from "@/app/_components/layout/SectionHero";
import banner from "@/public/images/banner.jpg";

export const metadata: Metadata = {
  title: SITE_NAME,
};

function HomeLink({ children, href }: PropsWithChildren<{ href: string }>) {
  return (
    <div className="col d-grid">
      <Link className="btn btn-outline-light btn-lg" href={href}>
        {children}
      </Link>
    </div>
  );
}

export default function Home() {
  return (
    <Page>
      <SectionHero
        image={banner}
        imageAlt="A kea sitting on a wooden structure in a mountainous environment"
      >
        <h1 className="display-3">Help us, help kea.</h1>
      </SectionHero>
      <Page.Section type="secondary">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-2">
          <HomeLink href="/report">Report Observation</HomeLink>
          <HomeLink href="/birds">Search Birds</HomeLink>
          <HomeLink href="/observations">View Observations</HomeLink>
          <HomeLink href="/pages/donations">Make a Donation</HomeLink>
        </div>
      </Page.Section>
      <Page.Section>
        <div className="row">
          <div className="col-md">
            <WordPressPage id={24} showTitle />
          </div>
          <div className="col-md">
            <WordPressPage id={27} showTitle />
          </div>
        </div>
      </Page.Section>
      <Page.Section type="primary">
        <h2>Featured Birds</h2>
        {/*TODO*/}
      </Page.Section>
      <Page.Section>
        <div className="row">
          <div className="col-md-6">
            <h2>Recently observed</h2>
            {/*TODO*/}
          </div>
          <div className="col-md-6">
            <h2>Blog</h2>
            <WordPressPosts />
          </div>
        </div>
      </Page.Section>
      <Page.Section>
        <h2>Sponsors</h2>
        {/*TODO*/}
      </Page.Section>
    </Page>
  );
}
