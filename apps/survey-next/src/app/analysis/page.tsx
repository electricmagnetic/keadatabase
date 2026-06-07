import { type Metadata } from "next";

import Error from "@/app/_components/ui/Error";
import { getGridTileAnalyses } from "./actions";
import { AnalysisMapClient } from "./AnalysisMapClient";

export const metadata: Metadata = {
  title: "Analysis | Kea Survey",
  description:
    "Survey data analysis showing grid tiles surveyed with and without kea observations.",
};

export default async function AnalysisPage() {
  // Fetch grid tile analyses from API
  const analysesFetch = await getGridTileAnalyses();

  console.log("=== ANALYSIS PAGE SERVER DEBUG ===");
  console.log("analysesFetch:", JSON.stringify(analysesFetch, null, 2));
  console.log("success:", analysesFetch.success);

  // Handle errors
  if (!analysesFetch.success) {
    console.log("Fetch FAILED, errorType:", analysesFetch.errorType);
    if (analysesFetch.errorType === "NOT_FOUND") {
      return (
        <div className="container my-5">
          <Error message="Analysis data not found" />
        </div>
      );
    }
    return (
      <div className="container my-5">
        <Error message="Error fetching analysis data" />
      </div>
    );
  }

  const analyses = analysesFetch.data;
  console.log("analyses length:", analyses?.length);
  console.log("first analysis:", analyses?.[0]);

  return (
    <main className="page">
      {/* Header section */}
      <section className="d-print-none">
        <div className="bg-light py-5">
          <div className="container">
            <h1>Analysis</h1>
            <p className="mb-2">
              <strong className="text-danger">Orange tiles:</strong> surveyed,
              kea observed.{" "}
              <small className="text-muted">
                Darker orange denotes higher proportion of kea to hours
                surveyed.
              </small>
            </p>
            <p className="mb-2">
              <strong>Grey tiles:</strong> surveyed, kea not observed.{" "}
              <small className="text-muted">
                Darker grey denotes greater than ten hours surveyed.
              </small>
            </p>
            <p className="mb-0">
              <small className="text-muted">
                Showing {analyses.length} grid tiles with survey data
              </small>
            </p>
          </div>
        </div>
      </section>

      {/* Map section */}
      <section>
        {analyses.length > 0 ? (
          <AnalysisMapClient analyses={analyses} />
        ) : (
          <div className="container my-5">
            <div className="alert alert-info">
              <i className="fas fa-info-circle me-2"></i>
              No analysis data available yet.
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
