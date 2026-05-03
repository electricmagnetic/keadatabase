import { notFound } from "next/navigation";
import DateTime from "shared/ui/DateTime";
import type { PageWithParams } from "shared/next/types";

import Page from "@/app/_components/ui/Page";
import Error from "@/app/_components/ui/Error";
import { SurveyIdSchema } from "@/app/_components/api/helpers";

import { getSurvey } from "../actions";

export default async function SurveyDetailPage({ params }: PageWithParams) {
  const { id } = SurveyIdSchema.parse(await params);

  const surveyFetch = await getSurvey(id);

  if (!surveyFetch.success) {
    if (surveyFetch.errorType === "NOT_FOUND") return notFound();

    return <Error message="Error fetching surveys" />;
  }

  const survey = surveyFetch.data;

  return (
    <Page.Container>
      <Page.Heading>Survey #{survey.id}</Page.Heading>
      <Page.Section>
        <dl>
          <dt>Date/Time</dt>
          <dd>
            <DateTime dateTime={survey.date} format="date" />
          </dd>
          <dt>Observer</dt>
          <dd>{survey.observer}</dd>
          {survey.max_flock_size ? (
            <>
              <dt>Max Kea Seen</dt>
              <dd>{survey.max_flock_size}</dd>
            </>
          ) : null}
          {survey.comments ? (
            <>
              <dt>Comments</dt>
              <dd>{survey.comments}</dd>
            </>
          ) : null}
        </dl>
      </Page.Section>
    </Page.Container>
  );
}
