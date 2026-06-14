import { type Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { PageWithParams } from "shared/next/types";
import Page from "@/app/_components/ui/Page";
import { WordPressPage } from "@/app/_components/cms/wordpress";

export const metadata: Metadata = {
  title: "Survey Submitted | Kea Survey",
  description: "Your survey has been successfully submitted.",
};

export default async function SubmitSuccessPage({ params }: PageWithParams) {
  const paramsData = await params;
  const id = paramsData.id as string;
  const surveyId = parseInt(id, 10);

  if (isNaN(surveyId)) {
    notFound();
  }

  return (
    <>
      <Page.Heading
        subheading={
          <>
            <p>Your survey (#{surveyId}) has been successfully submitted.</p>
            <div className="success__actions">
              <Link href="/submit" className="btn btn--primary">
                Report Another
              </Link>
              <Link href={`/surveys/${surveyId}`} className="btn">
                View Survey
              </Link>
            </div>
          </>
        }
      >
        Thanks!
      </Page.Heading>

      <Page.Section>
        <WordPressPage id={556} />
      </Page.Section>
    </>
  );
}
