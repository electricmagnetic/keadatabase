import { notFound } from "next/navigation";
import DateTime from "shared/ui/DateTime";
import type { PageWithParams } from "shared/next/types";

import Page from "@/app/_components/ui/Page";
import Error from "@/app/_components/ui/Error";
import { SurveyIdSchema } from "@/app/_components/api/helpers";
import { SelectedGridTilesMap } from "@/app/_components/grid/SelectedGridTilesMap";
import GridTileCards from "@/app/_components/grid/GridTileCards";

import { getSurvey } from "../actions";
import { SurveyHourItem } from "../_components/SurveyHourItem";
import { SurveyAnalysis } from "../_components/SurveyAnalysis";
import { getUniqueGridTiles } from "../_components/helpers";

import "@/app/css/components/survey.css";

export default async function SurveyDetailPage({ params }: PageWithParams) {
  const paramsData = await params;

  // Validate the ID parameter
  const parsedParams = SurveyIdSchema.safeParse(paramsData);

  if (!parsedParams.success) {
    return notFound();
  }

  const { id } = parsedParams.data;
  const surveyFetch = await getSurvey(id);

  if (!surveyFetch.success) {
    if (surveyFetch.errorType === "NOT_FOUND") return notFound();

    return <Error message="Error fetching surveys" />;
  }

  const survey = surveyFetch.data;
  const gridTileIds = getUniqueGridTiles(survey.hours);

  return (
    <Page.Container>
      <Page.Heading>Survey #{survey.id}</Page.Heading>

      <Page.Section>
        <h2>Details</h2>
        <dl className="survey-details">
          <div>
            <dt>Date</dt>
            <dd>
              <DateTime dateTime={survey.date} format="date" />
            </dd>
          </div>
          <div>
            <dt>Observer</dt>
            <dd>{survey.observer}</dd>
          </div>
          {survey.max_flock_size && (
            <div>
              <dt>Max Kea Seen</dt>
              <dd>{survey.max_flock_size}</dd>
            </div>
          )}
          {survey.comments && (
            <div>
              <dt>Comments</dt>
              <dd>{survey.comments}</dd>
            </div>
          )}
        </dl>
      </Page.Section>

      <Page.Section>
        <h2>Analysis</h2>
        <SurveyAnalysis id={survey.id} />
      </Page.Section>

      <Page.Section>
        <h2>Hours</h2>
        <div className="data-table data-table--survey">
          {survey.hours.map((surveyHour) => (
            <SurveyHourItem surveyHour={surveyHour} key={surveyHour.id} />
          ))}
        </div>
      </Page.Section>

      <Page.Section>
        <h2>Map</h2>
        <SelectedGridTilesMap gridTileIds={gridTileIds} height="500px" />
      </Page.Section>

      <Page.Section>
        <h2>Grid Tiles</h2>
        <GridTileCards gridTileIds={gridTileIds} />
      </Page.Section>
    </Page.Container>
  );
}
