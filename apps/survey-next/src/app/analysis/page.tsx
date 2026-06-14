import { type Metadata } from "next";

import Error from "@/app/_components/ui/Error";
import { getGridTileAnalyses } from "./actions";
import { AnalysisMapClient } from "./AnalysisMapClient";
import Page from "@/app/_components/ui/Page";

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
    <Page.Container>
      <Page.Heading
        className="sub-heading--sm"
        subheading={
          <>
            <p>
              Orange tiles: surveyed, kea observed. Darker orange denotes higher
              proportion of kea to hours surveyed.
              <br />
              Grey tiles: surveyed, kea not observed. Darker grey denotes
              greater than ten hours surveyed.
            </p>
          </>
        }
      >
        Analysis
      </Page.Heading>
      <section>
        {analyses.length > 0 ? (
          <AnalysisMapClient analyses={analyses} />
        ) : (
          <div>
            <div>No analysis data available yet.</div>
          </div>
        )}
      </section>
    </Page.Container>
  );
}
