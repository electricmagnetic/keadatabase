import { type Metadata } from "next";
import Link from "next/link";

import Page from "@/app/_components/ui/Page";
import Error from "@/app/_components/ui/Error";

import { getSurveys } from "./actions";
import DateTime from "shared/ui/DateTime";

export const metadata: Metadata = {
  title: "Browse Surveys",
};

export default async function SurveysPage() {
  const surveysFetch = await getSurveys();

  if (!surveysFetch.success) return <Error message="Error fetching surveys" />; // TODO replace with error

  const { results: surveys } = surveysFetch.data;

  return (
    <Page.Container>
      <Page.Heading>Browse Surveys</Page.Heading>
      <Page.Section>
        <ul>
          {surveys.map((survey) => (
            <li key={survey.id}>
              <Link href={`/surveys/${survey.id}`}>#{survey.id}</Link>
              <dl>
                <dt>Date/Time</dt>
                <dd>
                  <DateTime dateTime={survey.date} format="date" />
                </dd>
                <dt>Observer</dt>
                <dd>{survey.observer}</dd>
              </dl>
            </li>
          ))}
        </ul>
      </Page.Section>
    </Page.Container>
  );
}
