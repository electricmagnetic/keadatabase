import { type Metadata } from "next";
import { notFound } from "next/navigation";
import DateTime from "shared/ui/DateTime";
import type { PageWithParams } from "shared/next/types";

import Page from "@/app/_components/ui/Page";
import Error from "@/app/_components/ui/Error";
import { SurveyIdSchema } from "@/app/_components/api/helpers";
import { SelectedGridTilesMap } from "@/app/_components/grid/SelectedGridTilesMap";
import GridTileCards from "@/app/_components/grid/GridTileCards";
import { getUniqueGridTiles } from "@/app/_components/grid/helpers";

import { SurveyHourItem } from "@/app/_components/SurveyHourItem";

import { getSurvey } from "../actions";
import { SurveyAnalysis } from "../_components/SurveyAnalysis";

import "@/app/css/components/survey.css";

export async function generateMetadata({
  params,
}: PageWithParams): Promise<Metadata> {
  const parsedParams = SurveyIdSchema.safeParse(await params);

  // invalid ids fall through to notFound() in the page itself
  if (!parsedParams.success) return {};

  const { id } = parsedParams.data;

  return {
    title: `#${id} (Survey) | Kea Survey`,
    description: `Details for survey #${id}`,
  };
}

export default async function SurveyDetailPage({ params }: PageWithParams) {
  const paramsData = await params;

  // validate the ID parameter
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
