import Link from "next/link";
import { type Metadata } from "next";
import { type PropsWithChildren } from "react";

import { SITE_NAME } from "./layout";
import { FeaturedBirds } from "./birds/partials/FeaturedBirds";

import Page from "@/app/_components/layout/Page";
import {
  WordPressPage,
  WordPressPosts,
} from "@/app/_components/content/wordpress";
import SectionHero from "@/app/_components/layout/SectionHero";
import banner from "@/public/images/banner.jpg";

export const metadata: Metadata = {
  title: SITE_NAME,
};

function HomeLink({ children, href }: PropsWithChildren<{ href: string }>) {
  return (
    <div className="col">
      <Link className="btn btn-home btn-lg w-100" href={href}>
        {children}
      </Link>
    </div>
  );
}

function SponsorLink({ name, href }: { name: string; href: string }) {
  return (
    <li>
      <a href={href} rel="noopener noreferrer" target="_blank">
        {name}
      </a>
    </li>
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
      <Page.Section background="secondary" size="small">
        <nav>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-2">
            <HomeLink href="/report">Report Observation</HomeLink>
            <HomeLink href="/birds">Search Birds</HomeLink>
            <HomeLink href="/observations">View Observations</HomeLink>
            <HomeLink href="/pages/donations">Make a Donation</HomeLink>
          </div>
        </nav>
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
      <Page.Section background="primary">
        <h2>Featured birds</h2>
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
      <Page.Section background="lightest">
        <div className="Sponsors">
          <h2 className="visually-hidden">Sponsors & Supporters</h2>
          <p>
            Thank you very much for the generous support of our sponsors. This
            project simply wouldn&apos;t have been possible without them!
          </p>
          <div className="row">
            <div className="col-sm-8">
              <h3>Sponsors</h3>
              <div className="row row-cols-sm-2">
                <div className="col">
                  <ul className="list-unstyled m-0">
                    <SponsorLink
                      href="http://activeadventures.com"
                      name="Active Adventures"
                    />
                    <SponsorLink
                      href="https://thebealeyhotel.com"
                      name="The Bealey Hotel"
                    />
                    <SponsorLink
                      href="http://catalyst.net.nz"
                      name="Catalyst"
                    />
                    <SponsorLink href="http://engco.co.nz" name="ENGCO" />
                    <SponsorLink href="http://hirepool.co.nz" name="Hirepool" />
                  </ul>
                </div>
                <div className="col">
                  <ul className="list-unstyled m-0">
                    <SponsorLink
                      href="https://builderscrack.co.nz/tradies/r9b36vw/jamie-ward-builder-limited"
                      name="Jamie Ward Builder"
                    />
                    <SponsorLink
                      href="http://kathmandu.co.nz"
                      name="Kathmandu"
                    />
                    <SponsorLink href="http://orillion.com" name="Orillion" />
                    <SponsorLink
                      href="http://placemakers.co.nz"
                      name="PlaceMakers Riccarton"
                    />
                    <SponsorLink
                      href="http://timezoneone.com"
                      name="TimeZoneOne"
                    />
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <h3>Supporters</h3>
              <ul className="list-unstyled m-0">
                <SponsorLink
                  href="http://doc.govt.nz"
                  name="Department of Conservation"
                />
                <SponsorLink
                  href="http://keaconservation.co.nz"
                  name="Kea Conservation Trust"
                />
                <SponsorLink
                  href="http://apwt.org.nz"
                  name="Arthur's Pass Wildlife Trust"
                />
              </ul>
            </div>
          </div>
        </div>
      </Page.Section>
    </Page>
  );
}
