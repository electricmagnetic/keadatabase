import { type Metadata } from "next";
import Link from "next/link";

import Page from "@/app/_components/ui/Page";
import Error from "@/app/_components/ui/Error";
import GridTileCards from "@/app/_components/grid/GridTileCards";
import { getUniqueGridTiles } from "@/app/_components/grid/helpers";

import { getSurveys, getSurveyHours } from "./actions";
import DateTime from "shared/ui/DateTime";

export const metadata: Metadata = {
  title: "Browse Surveys",
};

export default async function SurveysPage() {
  const [surveysFetch, surveyHoursFetch] = await Promise.all([
    getSurveys(),
    getSurveyHours(),
  ]);

  if (!surveysFetch.success) return <Error message="Error fetching surveys" />;

  const { results: surveys } = surveysFetch.data;

  // get unique grid tiles from recent survey hours
  const recentGridTiles = surveyHoursFetch.success
    ? getUniqueGridTiles(surveyHoursFetch.data.results).slice(0, 8)
    : [];

  return (
    <Page.Container>
      <Page.Heading>Browse Surveys</Page.Heading>
      <Page.Section>
        <h2>
          Recent Surveys <small>(last {surveys.length})</small>
        </h2>
        <div className="data-table data-table--surveys">
          {surveys.map((survey) => {
            const gridTileIds = getUniqueGridTiles(survey.hours);

            return (
              <div key={survey.id} className="data-table__row">
                <div className="field-id">
                  <Link href={`/surveys/${survey.id}`}>
                    <strong>#{survey.id}</strong>
                  </Link>
                </div>
                <div className="field-date">
                  <i className="fa-fw fas fa-calendar-alt"></i>
                  <DateTime dateTime={survey.date} format="date" />
                </div>
                <div className="field-observer">
                  <i className="fa-fw fas fa-user"></i>
                  {survey.observer}
                </div>
                <div className="field-gridTile">
                  <i className="fa-fw fas fa-map"></i>
                  {gridTileIds.slice(0, 3).map((gridTileId) => (
                    <Link href={`/grid/${gridTileId}`} key={gridTileId}>
                      {gridTileId}
                    </Link>
                  ))}
                  {gridTileIds.length > 3 && <span className="more">…</span>}
                </div>
                <div>
                  <i className="fa-fw fas fa-info-circle"></i>
                  <Link href={`/surveys/${survey.id}`}>View</Link>
                </div>
              </div>
            );
          })}
        </div>
      </Page.Section>
      <Page.Section>
        <h2>Recently Surveyed Tiles</h2>
        <GridTileCards gridTileIds={recentGridTiles} />
      </Page.Section>
    </Page.Container>
  );
}
