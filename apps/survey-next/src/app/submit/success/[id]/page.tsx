import { type Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { PageWithParams } from "shared/next/types";
import Error from "@/app/_components/ui/Error";
import { getSubmittedSurvey } from "../../actions";

export const metadata: Metadata = {
  title: "Survey Submitted | Kea Survey",
  description: "Your survey has been successfully submitted.",
};

export default async function SubmitSuccessPage({
  params,
}: PageWithParams<{ id: string }>) {
  const { id } = await params;
  const surveyId = parseInt(id, 10);

  if (isNaN(surveyId)) {
    notFound();
  }

  // Fetch submitted survey details
  const surveyFetch = await getSubmittedSurvey(surveyId);

  if (!surveyFetch.success) {
    if (surveyFetch.errorType === "NOT_FOUND") {
      return notFound();
    }
    return (
      <div className="container my-5">
        <Error message="Failed to load survey details." />
      </div>
    );
  }

  const survey = surveyFetch.data;

  return (
    <main className="page">
      {/* Header section */}
      <section className="bg-light py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-8 offset-md-2 text-center">
              <div className="mb-4">
                <i
                  className="fas fa-check-circle text-success"
                  style={{ fontSize: "4rem" }}
                ></i>
              </div>
              <h1>Survey Submitted Successfully!</h1>
              <p className="lead">
                Thank you for contributing to kea conservation research.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Details section */}
      <section className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-8 offset-md-2">
              <div className="card">
                <div className="card-body">
                  <h2 className="card-title h4">Submission Details</h2>
                  <dl className="row mb-0">
                    <dt className="col-sm-4">Survey ID:</dt>
                    <dd className="col-sm-8">
                      <strong>#{survey.id}</strong>
                    </dd>
                  </dl>
                  <p className="mt-3 mb-0">
                    Your survey has been recorded and will be reviewed by our
                    research team. The data you've provided helps us understand
                    kea populations and their movements across New Zealand.
                  </p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="mt-4 text-center">
                <Link href="/submit" className="btn btn-primary me-3">
                  <i className="fas fa-plus me-2"></i>
                  Submit Another Survey
                </Link>
                <Link href="/surveys" className="btn btn-outline-secondary">
                  <i className="fas fa-list me-2"></i>
                  View All Surveys
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
